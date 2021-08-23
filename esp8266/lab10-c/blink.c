#include "espressif/esp_common.h"
#include "esp/uart.h"
#include "FreeRTOS.h"
#include "task.h"
#include "queue.h"
#include "esp8266.h"

const int button_gpio = 0;  /* gpio 0 (builtin flash button) */
const int status1 = 1;  /* Button status */
const int status2 = 1;  /* Button status */
const gpio_inttype_t int_type = GPIO_INTTYPE_EDGE_NEG;  /* Interrupt type */

void gpio_intr_handler(uint8_t gpio_num);
static QueueHandle_t tsqueue;
int button1 = 4; //D2
int button2 = 5; //D1

/* This task polls for the button status and prints when it occured
   It operate a debouncing by introducing a 200ms delay */
void buttonPollTask(void *pvParameters)
{
    printf("Button Polling on gpio %d...\r\n", button1);
    printf("Button Polling on gpio %d...\r\n", button2);
    
    while(1)
    {
        while(gpio_read(button1) != status1 && gpio_read(button2) != status2) taskYIELD();
        
        printf("Polled at %dms\r\n", xTaskGetTickCount() * portTICK_PERIOD_MS);
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}

/* GPIO interrupt configuration: the interrupt handler communicates
   the exact button press time to the task via a queue */
void buttonIntTask(void *pvParameters)
{
    printf("Button interrupt on gpio %d...\r\n", button1);
    printf("Button interrupt on gpio %d...\r\n", button2);
    QueueHandle_t *tsqueue = (QueueHandle_t *)pvParameters;
    gpio_set_interrupt(button1, int_type, gpio_intr_handler);
    gpio_set_interrupt(button2, int_type, gpio_intr_handler);
    
    uint32_t last = 0;
    while(1)
    {
        uint32_t button_ts1;
        
        xQueueReceive(*tsqueue, &button_ts1, portMAX_DELAY);

        button_ts1 *= portTICK_PERIOD_MS;
        if(last < button_ts1-200)
        {
            printf("Interrupt at %dms\r\n", button_ts1);
            last = button_ts1;
        }

    }


    while(1)
    {
	uint32_t button_ts2;
        
	xQueueReceive(*tsqueue, &button_ts2, portMAX_DELAY);

	button_ts2 *= portTICK_PERIOD_MS;
        if(last < button_ts2-200)
        {
            printf("Interrupt at %dms\r\n", button_ts2);
            last = button_ts2;
        }
    }
}

/* Interrupt Service Routine (ISR) */
void gpio_intr_handler(uint8_t gpio_num)
{
    uint32_t now = xTaskGetTickCountFromISR();
    xQueueSendToBackFromISR(tsqueue, &now, NULL);
}

void user_init(void)
{
    /* Sets serial port */
    uart_set_baud(0, 115200);
    
    /* Configurations button_gpio as input */
    gpio_enable(button1, GPIO_INPUT);
    gpio_enable(button2, GPIO_INPUT);
    
    /* Creates a new queue passing and returns a handle by which the queue can be referenced */
    tsqueue = xQueueCreate(2, sizeof(uint32_t));
    
    /* Create tasks by passing the queue handle (interrupt mode) or not (polling mode) */
    xTaskCreate(buttonIntTask, "buttonIntTask", 256, &tsqueue, 2, NULL);
    xTaskCreate(buttonPollTask, "buttonPollTask", 256, NULL, 1, NULL);
}
