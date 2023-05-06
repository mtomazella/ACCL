#include "config.h"

#include <Arduino.h>

#include "Routine.h"
#include "serialInput.h"
#include "display.h"
#include "displayData.h"
#include "load.h"

#ifndef DEBUG_DISABLE_METRICS
#include "serialOutput.h"
#endif

static Routine *routine = new Routine();
static char *buffer = (char *)malloc(sizeof(char) * SERIAL_INPUT_BUFFER_SIZE);

LiquidCrystal display(DISPLAY_PIN_RS,
                      DISPLAY_PIN_EN,
                      DISPLAY_PIN_D4,
                      DISPLAY_PIN_D5,
                      DISPLAY_PIN_D6,
                      DISPLAY_PIN_D7);

DisplayData displayData;

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
  Serial.begin(SERIAL_BAUD_RATE);
  buffer[0] = '\0';

  displaySetup(&display);
}

unsigned long last_serial_out_time = 0;
unsigned long last_display_time = 0;

void loop()
{
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

  loadProcess(&displayData);

  serialInputProcess(&buffer, routine);

  if (time - last_display_time >= DISPLAY_INTERVAL)
  {
    last_display_time = time;
    displayProcess(&display, &displayData);
  }

#ifndef DEBUG_DISABLE_METRICS
  if (time - last_serial_out_time >= SERIAL_OUTPUT_INTERVAL)
  {
    last_serial_out_time = time;
    serialOutputProcess(routine);
  }
#endif
}
