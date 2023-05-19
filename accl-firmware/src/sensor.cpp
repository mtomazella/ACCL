#include "sensor.h"

void sensorSetup(DallasTemperature *temperatureSensor)
{
  temperatureSensor->begin();
}

float readCurrent()
{
  return (float)analogRead(CURRENT_PIN) * 2.5 / 1024 / 0.22;
}

float readTension()
{
  return (float)analogRead(TENSION_PIN) * 30 / 1024;
}

void updateTemperature(DallasTemperature *temperatureSensor, SystemData *systemData)
{
  static unsigned long lastExecution = 0;
  static short int temperatureRequested = 0;
  if (millis() - lastExecution < TEMPERATURE_READ_INTERVAL / 2)
    return;

  if (temperatureRequested == 0)
  {
    temperatureSensor->requestTemperatures();
    temperatureRequested = 1;
  }
  else
  {
    systemData->temperature = (float)temperatureSensor->getTempC(0);
    temperatureRequested = 0;
  }
  lastExecution = millis();
}

void sensorProcess(SystemData *systemData, DallasTemperature *temperatureSensor)
{
  systemData->current = readCurrent();
  systemData->tension = readTension();
  updateTemperature(temperatureSensor, systemData);
}
