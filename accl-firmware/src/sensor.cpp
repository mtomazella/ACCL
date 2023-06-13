#include "sensor.h"

void sensorSetup(DallasTemperature *temperatureSensor, Adafruit_ADS1115 *adc)
{
  temperatureSensor->begin();
  adc->begin();
}

float readCurrent(Adafruit_ADS1115 *adc)
{
  return (float)adc->readADC_SingleEnded(ADC_CURRENT_CHANNEL) * 5 / 65536.0;
}

float readTension(Adafruit_ADS1115 *adc)
{
  return (float)adc->readADC_SingleEnded(ADC_TENSION_CHANNEL) * 74.0 / 65536.0;
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
    systemData->temperature = (float)temperatureSensor->getTempCByIndex(0);
    temperatureRequested = 0;
  }
  lastExecution = millis();
}

void sensorProcess(SystemData *systemData, DallasTemperature *temperatureSensor, Adafruit_ADS1115 *adc)
{
  systemData->current = readCurrent(adc);
  systemData->tension = readTension(adc);
  updateTemperature(temperatureSensor, systemData);
}
