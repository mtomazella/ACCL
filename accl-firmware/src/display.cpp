#include "display.h"

void drawInterface(LCD *display)
{
  display->clear();
  display->home();
  display->print("Volts: ");
  display->setCursor(0, 1);
  display->print("Amps: ");
}

void displaySetup(LCD *display, SystemData *systemData)
{
  // display->init();
  // display->setBacklight(true);
  display->begin(DISPLAY_COLS, DISPLAY_ROWS);

  // drawInterface(display);
  updateData(display, systemData);
}

void updateData(LCD *display, SystemData *systemData)
{
  display->setCursor(0, 0);
  char tensionText[9];
  snprintf(tensionText, 8, "%.2fV    ", systemData->tension);
  display->print(tensionText);

  display->setCursor(8, 0);
  char currentText[9];
  snprintf(currentText, 8, "%.2fA    ", systemData->current);
  display->print(currentText);

  display->setCursor(0, 1);
  char timeText[9];
  snprintf(timeText, 8, "%d         ", systemData->routineTime_ms / 1000);
  display->print(timeText);

  display->setCursor(8, 1);
  char targetText[9];
  snprintf(targetText, 8, "%.2fA     ", systemData->targetCurrent);
  display->print(targetText);
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
  return changed;
}

void displayProcess(LCD *display, SystemData *systemData)
{
  static SystemData oldSystemData;
  if (replaceDifferentSystemData(systemData, &oldSystemData) == 0)
    return;
  updateData(display, systemData);
}