#include "fan.h"

void fanSetup()
{
  pinMode(FAN_PIN, OUTPUT);
}

void fanProcess(SystemData *systemData)
{
  float percentage = systemData->current / 3.0;
  systemData->fanPercentage =
      percentage < 0
          ? 0
      : percentage > 1
          ? 100
          : (int)(percentage * 100.0);

  analogWrite(FAN_PIN, (int)(percentage * 255.0));
}