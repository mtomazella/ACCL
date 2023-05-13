#include "display.h"

void displaySetup(LCD *display, SystemData *systemData)
{
#ifdef I2C_DISPLAY
  display->init();
  display->setBacklight(true);
#endif
  display->begin(DISPLAY_COLS, DISPLAY_ROWS);
  display->clear();

  displayProcess(display, systemData);
}

void dataTab(LCD *display, SystemData *systemData)
{
  char lineBuffer[DISPLAY_COLS + 1];

  snprintf(lineBuffer, DISPLAY_COLS + 1, "%.2fV %.1f'C %d%%    ", systemData->tension, systemData->temperature, systemData->fanPercentage);
  display->setCursor(0, 0);
  display->print(lineBuffer);

  snprintf(lineBuffer, DISPLAY_COLS + 1, "%.2fA %.2fA          ", systemData->current, systemData->targetCurrent);
  display->setCursor(0, 1);
  display->print(lineBuffer);

#ifdef DEBUG_DISPLAY_DEBUG_INFO
  snprintf(lineBuffer, DISPLAY_COLS + 1, "%ds                  ", systemData->routineStartTime_ms / 1000);
  display->setCursor(0, 2);
  display->print(lineBuffer);
#endif
}

int replaceDifferentSystemData(SystemData *newData, SystemData *storedData)
{
  int changed = 0;
  if (storedData->current != newData->current)
  {
    storedData->current = newData->current;
    changed = 1;
  }
  if (storedData->tension != newData->tension)
  {
    storedData->tension = newData->tension;
    changed = 1;
  }
  if (storedData->fanPercentage != newData->fanPercentage)
  {
    storedData->fanPercentage = newData->fanPercentage;
    changed = 1;
  }
  if (storedData->targetCurrent != newData->targetCurrent)
  {
    storedData->targetCurrent = newData->targetCurrent;
    changed = 1;
  }
  if (storedData->temperature != newData->temperature)
  {
    storedData->temperature = newData->temperature;
    changed = 1;
  }
  return changed;
}

void displayProcess(LCD *display, SystemData *systemData)
{
#ifndef DEBUG_UPDATE_DISPLAY_EVERY_FRAME
  static SystemData oldSystemData;
  if (replaceDifferentSystemData(systemData, &oldSystemData) == 0)
    return;
#endif

  dataTab(display, systemData);
}