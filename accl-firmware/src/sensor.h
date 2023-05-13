#include <Arduino.h>
#include <DallasTemperature.h>
#include "config.h"
#include "systemData.h"

void sensorProcess(SystemData *systemData, DallasTemperature *temperatureSensor);
