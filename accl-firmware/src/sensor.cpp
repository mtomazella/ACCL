#include "sensor.h"

float readCurrent()
{
  return (float)analogRead(CURRENT_PIN) * 5 / 1024 / 0.22;
}

float readTension()
{
  return (float)analogRead(TENSION_PIN) * 30 / 1024;
}

void sensorProcess(SensorData *sensorData)
{
  sensorData->current = readCurrent();
  sensorData->tension = readTension();
}
