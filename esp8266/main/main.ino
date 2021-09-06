#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <MQTT.h>
#include <ArduinoJson.h>
#include <time.h>
#include <StackArray.h>
#define emptyString String()

//NomeMCU sensor pin definition
#define LIGHTSENSOR1 A0

// Error handling functions
#include "errors.h"

//Configuration data
#include "configuration.h"

//Define MQTT port
const int MQTT_PORT = 8883;

//Define subscription and publicaton topics (on thing shadow)
const char MQTT_SUB_TOPIC[] = "$aws/things/" THINGNAME "/shadow/update";
const char MQTT_PUB_TOPIC[] = "$aws/things/" THINGNAME "/shadow/update";

//Enable or disable summer-time
#ifdef USE_SUMMER_TIME-time
uin8_t DST = 1;
#else
uint8 DST = 0;
#endif

//Create Transport Layer Security (TLS) connection
WiFiClientSecure net;

//Load certicates
BearSSL::X509List cert(cacert);
BearSSL::X509List client_crt(client_cert);
BearSSL::PrivateKey key(privkey);

//Initialize MQTT client
MQTTClient client;

unsigned long lastMs = 0;
time_t now;
time_t nowish = 1510592825;

uint8_t Button1 = D1;
uint8_t Button2 = D2;

struct STACKITEM{
  uint8_t id;
  unsigned long sec;
};

StackArray <STACKITEM> stack;

void ICACHE_RAM_ATTR IntCallback1(){
  STACKITEM item = {1, millis()};
  stack.push(item); 
  //Serial.print("Stack: ");
  //Serial.println();
}

void ICACHE_RAM_ATTR IntCallback2(){
  STACKITEM item = {2, millis()};
  stack.push(item);
  //Serial.print("Stack: ");
  //Serial.println();
}

//Get time through Simple Network Time Protocol
void NTPConnect(void){

    Serial.print("Setting time using SNTP");
    configTime(TIME_ZONE * 3600, DST * 3600, "pool.ntp.org", "time.nist.gov");
    now = time(nullptr);
    while (now < nowish){
      
      delay(500);
      Serial.print(".");
      now = time(nullptr);  
    }
    Serial.println("done!");
    struct tm timeinfo;
    gmtime_r(&now, &timeinfo);
    Serial.println("Current time: ");
    Serial.println(asctime(&timeinfo));

}

// MQTT management of incoming messages
void messageReceived(String &topic, String &payload){
  
  Serial.println("Received [" + topic + "]: " + payload);
}

// MQTT Broker connection
void connectToMqtt(bool nonBlocking = false){

  Serial.print("MQTT connectiong ");
  while (!client.connected()){
    if (client.connect(THINGNAME)){
      Serial.println("connected!");
      
      if(!client.subscribe(MQTT_SUB_TOPIC)){
        lwMQTTErr(client.lastError());
      }
    }
    else{
      Serial.print("SSL Error Code: ");
      Serial.println(net.getLastSSLError());
      Serial.print("failed, reason -> ");
      lwMQTTErrConnection(client.returnCode());
      
      if(!nonBlocking){
        Serial.println(" < try again in 5 secons");
        delay(5000);
      }
      else{ Serial.println(" <");}
    }
    if(nonBlocking) break;
  }
}

//Wi-Fi connction
void connectToWiFi(String init_str){
  if (init_str != emptyString){
    Serial.print(init_str);
  }

  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(1000);
  }
  
  if (init_str != emptyString){
    Serial.println("ok!");
  }
}

void verifyWiFiAndMQTT(void){

  connectToWiFi("Checking WiFi");
  connectToMqtt();
}

unsigned long previousMillis = 0;
const long interval = 5000;

// MQTT management of outgoing messages
void sendData(void)
{
  if(!stack.isEmpty()){
  
    DynamicJsonDocument jsonBuffer(JSON_OBJECT_SIZE(3) + 100);
    JsonObject root = jsonBuffer.to<JsonObject>();
    JsonObject state = root.createNestedObject("state");
    JsonObject state_reported = state.createNestedObject("reported");
  
    STACKITEM item = stack.pop();
    
    state_reported["id"] = item.id;
    state_reported["sec"] = item.sec;
  
    Serial.printf("Sending [%s]: ", MQTT_PUB_TOPIC);
    serializeJson(root, Serial);
    Serial.println();
    char shadow[measureJson(root) + 1];
    serializeJson(root, shadow, sizeof(shadow));
    
    if(!client.publish(MQTT_PUB_TOPIC, shadow, false, 0)){
      lwMQTTErr(client.lastError());
    }
  }
}

void setup(){
  
  Serial.begin(115200);
  delay(5000);
  Serial.println();
  Serial.println();
  WiFi.hostname(THINGNAME);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  connectToWiFi(String("Trying to connect with SSID: ") + String(ssid));

  NTPConnect();

  net.setTrustAnchors(&cert);
  net.setClientRSACert(&client_crt, &key);

  client.begin(MQTT_HOST, MQTT_PORT, net);
  client.onMessage(messageReceived);

  connectToMqtt();

  attachInterrupt(digitalPinToInterrupt(Button1), IntCallback1, RISING);
  attachInterrupt(digitalPinToInterrupt(Button2), IntCallback2, RISING);

  stack.setPrinter(Serial);
}

void loop(){
  
  now = time(nullptr);
  
  if(!client.connected()){
    verifyWiFiAndMQTT();
  }
  else{
    client.loop();
    
    if(millis() - lastMs > 5000){
      lastMs = millis();
      sendData();
    }
  }
}
