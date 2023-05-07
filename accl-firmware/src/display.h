#include "config.h"
#include "sensorData.h"
#include "printf.h"

#ifdef I2C_DISPLAY
#include "LiquidCrystal_I2C.h"
#define LCD LiquidCrystal_I2C
#else
#include "LiquidCrystal.h"
#define LCD LiquidCrystal
#endif

void displaySetup(LCD *display, SensorData *sensorData);
void displayProcess(LCD *display, SensorData *sensorData);
void drawInterface(LCD *display);
void updateData(LCD *display, SensorData *sensorData);
int replaceDifferentSensorData(SensorData *newData, SensorData *storedData);
