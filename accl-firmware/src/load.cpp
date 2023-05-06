#include "load.h"

float readCurrent()
{
  return (float)analogRead(CURRENT_PIN) * 5 / 1024 / 0.22;
}

float readTension()
{
  return (float)analogRead(TENSION_PIN) * 30 / 1024;
}

void loadProcess(DisplayData *displayData)
{
  float current = readCurrent();
  float tension = readTension();

  displayData->current = current;
  displayData->tension = tension;
}
