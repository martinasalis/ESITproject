#include "espressif/esp_common.h"
#include "esp/uart.h"
#include "FreeRTOS.h"
#include "task.h"
#include "queue.h"
#include "esp8266.h"
#include "mqtt_tls/mqtt_tls.h"

const int button_gpio1 = 4;	/* gpio 4 (external button) */
const int button_gpio2 = 5; /* gpio 5 (external button) */
const int status = 1;	/* Button status */
const gpio_inttype_t int_type = GPIO_INTTYPE_EDGE_NEG;	/* Interrupt type */

void gpio_intr_handler(uint8_t gpio_num);
static QueueHandle_t tsqueue;

/* AWS MQTT */
MQTTContext_t mqttContext = { 0 };
NetworkContext_t networkContext = { 0 };
OpensslParams_t opensslParams = { 0 };
bool clientSessionPresent = false, brokerSessionPresent = false;
struct timespec tp;


/* This task polls for the button status and prints when it occured
   It operate a debouncing by introducing a 200ms delay */
void buttonPollTask(void *pvParameters)
{
    printf("Button Polling on gpio %d...\r\n", button_gpio1);
    printf("Button Polling on gpio %d...\r\n", button_gpio2);

    while(1)
    {
        while((gpio_read(button_gpio1) != status) && (gpio_read(button_gpio2) != status)) taskYIELD();

        printf("Polled at %dms\r\n", xTaskGetTickCount() * portTICK_PERIOD_MS);
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}

/* GPIO interrupt configuration: the interrupt handler communicates
   the exact button press time to the task via a queue */
void buttonIntTask(void *pvParameters)
{
    printf("Button interrupt on gpio %d...\r\n", button_gpio1);
    printf("Button interrupt on gpio %d...\r\n", button_gpio2);
    QueueHandle_t *tsqueue = (QueueHandle_t *)pvParameters;
    gpio_set_interrupt(button_gpio1, int_type, gpio_intr_handler);
    gpio_set_interrupt(button_gpio2, int_type, gpio_intr_handler);

    uint32_t last = 0;
    while(1)
    {
        uint32_t button_ts;

        xQueueReceive(*tsqueue, &button_ts, portMAX_DELAY);

        button_ts *= portTICK_PERIOD_MS;
        if(last < button_ts-200)
        {
            printf("Interrupt at %dms\r\n", button_ts);
            last = button_ts;
        }
    }
}

/* Interrupt Service Routine (ISR) */
void gpio_intr_handler(uint8_t gpio_num)
{
    uint32_t now = xTaskGetTickCountFromISR();
    xQueueSendToBackFromISR(tsqueue, &now, NULL);
}

/* MQTT Settings */
int mqtt_settings(void)
{

	int returnStatus = EXIT_SUCCESS;

    /* Set the pParams member of the network context with desired transport. */
    networkContext.pParams = &opensslParams;

    /* Initialize MQTT library. Initialization of the MQTT library needs to be
     * done only once in this demo. */
    returnStatus = initializeMqtt( &mqttContext, &networkContext );

    if( returnStatus == EXIT_SUCCESS )
    {
        for( ; ; )
        {
            /* Attempt to connect to the MQTT broker. If connection fails, retry after
             * a timeout. Timeout value will be exponentially increased till the maximum
             * attempts are reached or maximum timeout value is reached. The function
             * returns EXIT_FAILURE if the TCP connection cannot be established to
             * broker after configured number of attempts. */
            returnStatus = connectToServerWithBackoffRetries( &networkContext, &mqttContext, &clientSessionPresent, &brokerSessionPresent );

            if( returnStatus == EXIT_FAILURE )
            {
                /* Log error to indicate connection failure after all
                 * reconnect attempts are over. */
                LogError( ( "Failed to connect to MQTT broker %.*s.",
                            AWS_IOT_ENDPOINT_LENGTH,
                            AWS_IOT_ENDPOINT ) );
            }
            else
            {
                /* Update the flag to indicate that an MQTT client session is saved.
                 * Once this flag is set, MQTT connect in the following iterations of
                 * this demo will be attempted without requesting for a clean session. */
                clientSessionPresent = true;

                /* Check if session is present and if there are any outgoing publishes
                 * that need to resend. This is only valid if the broker is
                 * re-establishing a session which was already present. */
                if( brokerSessionPresent == true )
                {
                    LogInfo( ( "An MQTT session with broker is re-established. "
                               "Resending unacked publishes." ) );

                    /* Handle all the resend of publish messages. */
                    returnStatus = handlePublishResend( &mqttContext );
                }
                else
                {
                    LogInfo( ( "A clean MQTT connection is established."
                               " Cleaning up all the stored outgoing publishes.\n\n" ) );

                    /* Clean up the outgoing publishes waiting for ack as this new
                     * connection doesn't re-establish an existing session. */
                    cleanupOutgoingPublishes();
                }

                /* If TLS session is established, execute Subscribe/Publish loop. */
                returnStatus = subscribePublishLoop( &mqttContext );
            }

            if( returnStatus == EXIT_SUCCESS )
            {
                /* Log message indicating an iteration completed successfully. */
                LogInfo( ( "Demo completed successfully." ) );
            }

            /* End TLS session, then close TCP connection. */
            ( void ) Openssl_Disconnect( &networkContext );

            LogInfo( ( "Short delay before starting the next iteration....\n" ) );
            sleep( MQTT_SUBPUB_LOOP_DELAY_SECONDS );
        }
    }

    return returnStatus;
}

void user_init(void)
{
	
	int status = mqtt_setting();

	if(status == EXIT_SUCCESS)
	{
		/* Sets serial port */
		uart_set_baud(0, 115200);

		/* Configurations button_gpio as input */
		gpio_enable(button_gpio1, GPIO_INPUT);
		gpio_enable(button_gpio2, GPIO_INPUT);

		/* Creates a new queue passing and returns a handle by which the queue can be referenced */
		tsqueue = xQueueCreate(2, sizeof(uint32_t));

		/* Create tasks by passing the queue handle (interrupt mode) or not (polling mode) */
		xTaskCreate(buttonIntTask, "buttonIntTask", 256, &tsqueue, 2, NULL);
		xTaskCreate(buttonPollTask, "buttonPollTask", 256, NULL, 1, NULL);
	}

}

