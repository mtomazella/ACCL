#include <Arduino.h>

#include "Routine.h"
#include "serialInput.h"
// #include "serialOutput.cpp"

Routine *routine = new Routine();
char *buffer = (char *)malloc(sizeof(char) * 100);

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

void setup()
{
  Serial.begin(9600);
  buffer[0] = '\0';
}

void loop()
{
  delay(2000);

  Serial.println();
  display_freeram();
  Serial.println();

  handleSerialInput(&buffer, routine);
  // emitMetrics();
}
