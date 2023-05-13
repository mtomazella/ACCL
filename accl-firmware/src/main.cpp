#include "config.h"

#include <Arduino.h>
#include <Wire.h>

#include "Routine.h"
#include "serialInput.h"
#include "display.h"
#include "systemData.h"
#include "sensor.h"
#include "loadControl.h"

#ifndef DEBUG_DISABLE_METRICS
#include "serialOutput.h"
#endif

static Routine *routine = new Routine();
static char *buffer = (char *)malloc(sizeof(char) * SERIAL_INPUT_BUFFER_SIZE);
SystemData systemData;

#ifdef I2C_DISPLAY
LCD display(DISPLAY_I2C_ADDRESS, DISPLAY_COLS, DISPLAY_ROWS);
#else
LiquidCrystal display(DISPLAY_PIN_RS,
                      DISPLAY_PIN_EN,
                      DISPLAY_PIN_D4,
                      DISPLAY_PIN_D5,
                      DISPLAY_PIN_D6,
                      DISPLAY_PIN_D7);
#endif

#ifdef DEBUG_SHOW_RAM
int freeRam()
{
  extern int __heap_start, *__brkval;
  int v;
  return (int)&v - (__brkval == 0 ? (int)&__heap_start : (int)__brkval);
}

void display_freeram()
{
  Serial.print(F("- SRAM left: "));
  Serial.println(freeRam());
}
#endif

void setup()
{
  Wire.begin();
  Serial.begin(SERIAL_BAUD_RATE);
  buffer[0] = '\0';

  systemData.current = 0;
  systemData.tension = 0;

  displaySetup(&display, &systemData);
}

unsigned long last_serial_out_time = 0;
unsigned long last_display_time = 0;

void loop()
{
  unsigned long time_ms = millis();
  if (routine->loop == 1)
  {
    float routineMaxTime_s = routine->points[routine->num_points - 1].time;
    unsigned long routineMaxTime_ms = (unsigned long)routineMaxTime_s * (unsigned long)1000;
    unsigned long routineCycle = time_ms / routineMaxTime_ms;
    time_ms = time_ms - systemData.routineStartTime_ms - (routineCycle * routineMaxTime_ms);
  }
  else
    time_ms = time_ms - systemData.routineStartTime_ms;
  systemData.routineTime_ms = time_ms;

#ifdef DEBUG_LOOP_DELAY
#if DEBUG_LOOP_DELAY != 0
  delay(DEBUG_LOOP_DELAY);
#endif
#endif
#ifdef DEBUG_SHOW_RAM
  Serial.println();
  display_freeram();
  Serial.println();
#endif

  unsigned long time = millis();

  sensorProcess(&systemData);

  loadControlProcess(routine, &systemData);

  if (time - last_display_time >= DISPLAY_INTERVAL)
  {
    last_display_time = time;
    displayProcess(&display, &systemData);
  }

  serialInputProcess(&buffer, routine, &systemData);

#ifndef DEBUG_DISABLE_METRICS
  if (time - last_serial_out_time >= SERIAL_OUTPUT_INTERVAL)
  {
    last_serial_out_time = time;
    serialOutputProcess(routine, &systemData);
  }
#endif
}
