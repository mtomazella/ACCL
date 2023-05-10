#include <Arduino.h>
#include "config.h"
#include "systemData.h"
#include "printf.h"

#ifdef I2C_DISPLAY
#include "LiquidCrystal_I2C.h"
#define LCD LiquidCrystal_I2C
#else
#include "LiquidCrystal.h"
#define LCD LiquidCrystal
#endif

void displaySetup(LCD *display, SystemData *systemData);
void displayProcess(LCD *display, SystemData *systemData);
void drawInterface(LCD *display);
void updateData(LCD *display, SystemData *systemData);
int replaceDifferentSystemData(SystemData *newData, SystemData *storedData);
