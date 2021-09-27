#include <pgmspace.h>

const char ssid[] = "<your_ssid>";
const char pass[] = "<your_password>";

int8_t TIME_ZONE = +1; //ITALY +1 UTC
#define USE_SUMMER_TIME_DST

const char MQTT_HOST[] = "<your_MQTT_host>";

// Copy contents from AWS CA certificate here
static const char cacert[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
)EOF";

static const char client_cert[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
)KEY";

static const char privkey[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----
)KEY";
