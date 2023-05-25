#include <Arduino.h>
#include <DallasTemperature.h>
#include <Adafruit_ADS1X15.h>
#include "config.h"
#include "systemData.h"

void sensorSetup(DallasTemperature *temperatureSensor, Adafruit_ADS1115 *adc);
void sensorProcess(SystemData *systemData, DallasTemperature *temperatureSensor, Adafruit_ADS1115 *adc);
