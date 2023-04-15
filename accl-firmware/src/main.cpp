#include "debugConfig.h"

#include <Arduino.h>

#include "Routine.h"
#include "serialInput.h"

#ifndef DEBUG_DISABLE_METRICS
#include "serialOutput.h"
#endif

Routine *routine = new Routine();
char *buffer = (char *)malloc(sizeof(char) * 100);

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

void loop()
{
  delay(2000);

#ifdef DEBUG_SHOW_RAM
  Serial.println();
  display_freeram();
  Serial.println();
#endif

  handleSerialInput(&buffer, routine);

#ifndef DEBUG_DISABLE_METRICS
  emitMetrics();
#endif
}
