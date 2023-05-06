#include "display.h"

void displaySetup(LiquidCrystal *display)
{
  display->begin(16, 2);
}

void displayProcess(LiquidCrystal *display, DisplayData *displayData)
{
  display->clear();
  display->print("Teste");
}