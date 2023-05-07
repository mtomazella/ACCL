#include "display.h"

void drawInterface(LCD *display)
{
  display->clear();
  display->home();
  display->print("Volts: ");
  display->setCursor(0, 1);
  display->print("Amps: ");
}

void displaySetup(LCD *display)
{
  display->init();
  display->setBacklight(true);
  display->begin(16, 2);
  // drawInterface(display);
}

void updateData(LCD *display, SensorData *sensorData)
{
  short int tensionInterfaceLength = 0;
  display->setCursor(tensionInterfaceLength, 0);
  char tensionText[DISPLAY_COLS - tensionInterfaceLength + 1];
  snprintf(tensionText, DISPLAY_COLS - tensionInterfaceLength, "%.2fV       ", sensorData->tension);
  display->print(tensionText);

  short int currentInterfaceLength = 0;
  display->setCursor(currentInterfaceLength, 1);
  char currentText[DISPLAY_COLS - currentInterfaceLength + 1];
  snprintf(currentText, DISPLAY_COLS - currentInterfaceLength, "%.2fA       ", sensorData->current);
  display->print(currentText);
}

int replaceDifferentSensorData(SensorData *newData, SensorData *storedData)
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

void displayProcess(LCD *display, SensorData *sensorData)
{
  static SensorData oldSensorData;
  if (replaceDifferentSensorData(sensorData, &oldSensorData) == 0)
    return;
  updateData(display, sensorData);
}