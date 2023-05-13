#include "sensor.h"

float readCurrent()
{
  return (float)analogRead(CURRENT_PIN) * 5 / 1024 / 0.22;
}

float readTension()
{
  return (float)analogRead(TENSION_PIN) * 30 / 1024;
}

float readTemperature(DallasTemperature *temperatureSensor)
{
  temperatureSensor->requestTemperatures();
  return temperatureSensor->getTempCByIndex(0);
}

void sensorProcess(SystemData *systemData, DallasTemperature *temperatureSensor)
{
  systemData->current = readCurrent();
  systemData->tension = readTension();
  systemData->temperature = readTemperature(temperatureSensor);
}
