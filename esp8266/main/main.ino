#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <MQTT.h>
#include <ArduinoJson.h>
#include <time.h>
#include <StackArray.h>
#define emptyString String()

// Error handling functions
#include "errors.h"

//Configuration data
#include "configuration.h"

// Define board MAC address
String mac;
String THINGNAME;

//Define MQTT port
const int MQTT_PORT = 8883;

//Define subscription and publicaton topics (on thing shadow)
const char MQTT_SUB_TOPIC[] = "$aws/things/" THINGNAME "/shadow/notice";
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
MQTTClient client(180);

unsigned long lastMs = 0;
time_t now;
time_t nowish = 1510592825;

// Sensor pin definition
uint8_t Button1 = D1;
uint8_t Button2 = D2;
uint8_t BUZZER_PIN = D3;

struct STACKITEM {
  uint8_t id;
  unsigned long sec;
};

StackArray <STACKITEM> stack_sensor_1;
StackArray <STACKITEM> stack_sensor_2;

void ICACHE_RAM_ATTR IntCallback1(){
  STACKITEM item = {1, millis()};
  stack_sensor_1.push(item); 
}

void ICACHE_RAM_ATTR IntCallback2(){
  STACKITEM item = {2, millis()};
  stack_sensor_2.push(item);
}

long data_1 = 0;
float data_2 = 0;

// Simulate a pulse sensor
void pulse()
{  
  if(stack_sensor_1.count() >= 2)
  {
    // More then one button pres
    unsigned long sensor_time = 0;

    STACKITEM first_item = stack_sensor_1.pop();
    
    while(!stack_sensor_1.isEmpty())
    {
      STACKITEM second_item = stack_sensor_1.pop();
      
      sensor_time = (first_item.sec - second_item.sec) + sensor_time;

      first_item = second_item;
    }

    if(sensor_time < 2000)
    {
      data_1 = random(100, 120);
    }
    else
    {      
      data_1 = random(90, 100);
    }
  }
  else if(stack_sensor_1.count() == 1)
  {
    // Single button pres
    stack_sensor_1.pop();
    
    data_1 = random(90, 100);
  }
  else
  {
    // No button pres
    data_1 = random(60, 90);
  }
}

// Simulate temperature sensor
void temperature()
{
  if(stack_sensor_2.count() >= 2)
  {
    unsigned long sensor_time = 0;

    STACKITEM first_item = stack_sensor_2.pop();
    
    while(!stack_sensor_2.isEmpty())
    {
      STACKITEM second_item = stack_sensor_2.pop();
      
      sensor_time = (first_item.sec - second_item.sec) + sensor_time;

      first_item = second_item;
    }

    if(sensor_time < 2000)
    {
      data_2 = (float)random(380, 400) / 10.00;
    }
    else
    {      
      data_2 = (float)random(370, 380) / 10.00;
    }
  }
  else if(stack_sensor_2.count() == 1)
  {
    stack_sensor_2.pop();
    
    data_2 = (float)random(370, 380) / 10.00;
  }
  else
  {
    data_2 = (float)random(360, 370) / 10.00;
  }
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

  if(topic == MQTT_SUB_TOPIC){
    digitalWrite(BUZZER_PIN, HIGH); 
    delay(5000);
    digitalWrite(BUZZER_PIN, LOW);
  }
    
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
  client.subscribe(MQTT_SUB_TOPIC);
}

unsigned long previousMillis = 0;
const long interval = 5000;

// MQTT management of outgoing messages
void sendData(void)
{
  DynamicJsonDocument jsonBuffer(JSON_OBJECT_SIZE(9) + JSON_ARRAY_SIZE(4) + 100);
  JsonObject root = jsonBuffer.to<JsonObject>();
  JsonObject state = root.createNestedObject("state");
  JsonObject state_reported = state.createNestedObject("reported");

  state_reported["board"] = mac;
  JsonArray state_reported_data = state_reported.createNestedArray("data");

  pulse();
    
  JsonObject state_reported_data_sensor_1 = state_reported_data.createNestedObject();
  state_reported_data_sensor_1["sensor"] = 1;    
  state_reported_data_sensor_1["data"] = data_1;

  temperature();
  
  JsonObject state_reported_data_sensor_2 = state_reported_data.createNestedObject();
  state_reported_data_sensor_2["sensor"] = 2;   
  state_reported_data_sensor_2["data"] = data_2;
  
  Serial.printf("Sending [%s]: ", MQTT_PUB_TOPIC);
  serializeJson(root, Serial);
  Serial.println();
  char shadow[measureJson(root) + 1];
  serializeJson(root, shadow, sizeof(shadow));
    
  if(!client.publish(MQTT_PUB_TOPIC, shadow, false, 0)){
    lwMQTTErr(client.lastError());
  }
}

void setup(){

  mac = WiFi.macAddress();
  THINGNAME = "obj-" + mac;
  
  Serial.begin(115200);
  delay(5000);
  Serial.println();
  Serial.println();
  WiFi.hostname(THINGNAME);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  connectToWiFi(String("Trying to connect with SSID: ") + String(ssid));
  
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW); 

  randomSeed(analogRead(0));

  NTPConnect();

  net.setTrustAnchors(&cert);
  net.setClientRSACert(&client_crt, &key);

  client.begin(MQTT_HOST, MQTT_PORT, net);
  client.onMessage(messageReceived);

  connectToMqtt();

  attachInterrupt(digitalPinToInterrupt(Button1), IntCallback1, RISING);
  attachInterrupt(digitalPinToInterrupt(Button2), IntCallback2, RISING);

  stack_sensor_1.setPrinter(Serial);
  stack_sensor_2.setPrinter(Serial);

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
