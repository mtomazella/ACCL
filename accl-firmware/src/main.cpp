#include <Arduino.h>

#include "Routine.cpp"
#include "serialInput.h"
// #include "serialOutput.cpp"

Routine *routine = new Routine();
char *buffer = "";

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  handleSerialInput(&buffer);
  // emitMetrics();
  delay(1000);
}
