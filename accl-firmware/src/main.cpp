#include "debugConfig.h"

#include <Arduino.h>

#include "Routine.h"
#include "serialInput.h"

#ifndef DEBUG_DISABLE_METRICS
#include "serialOutput.h"
#endif

static Routine *routine = new Routine();
static char *buffer = (char *)malloc(sizeof(char) * SERIAL_INPUT_BUFFER_SIZE);

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
  Serial.begin(9600);
  buffer[0] = '\0';
}

unsigned long last_metrics_time = 0;

void loop()
{
#ifdef DEBUG_LOOP_DELAY
#if DEBUG_LOOP_DELAY != 0
  delay(DEBUG_LOOP_DELAY);
#endif
#endif

  unsigned long time = millis();

#ifdef DEBUG_SHOW_RAM
  Serial.println();
  display_freeram();
  Serial.println();
#endif

  handleSerialInput(&buffer, routine);

#ifndef DEBUG_DISABLE_METRICS
  if (time - last_metrics_time >= METRICS_INTERVAL)
  {
    last_metrics_time = time;
    emitMetrics(routine);
  }
#endif
}
