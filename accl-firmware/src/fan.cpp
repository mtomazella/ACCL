#include "fan.h"

void fanSetup()
{
  pinMode(FAN_PIN, OUTPUT);
}

void fanProcess(SystemData *systemData)
{
  float percentage = systemData->current / 50.0;
#ifndef DEBUG_DISABLE_FAN
  analogWrite(FAN_PIN, (int)(percentage * 255.0));
#endif
}