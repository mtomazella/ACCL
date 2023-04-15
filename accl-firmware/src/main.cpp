#include <Arduino.h>

#include "Routine.h"
#include "serialInput.h"
// #include "serialOutput.cpp"

Routine *routine = new Routine();
char *buffer = (char *)malloc(sizeof(char) * 200);

void setup()
{
  Serial.begin(9600);
  buffer[0] = '\0';
}

void loop()
{
  delay(2000);
  handleSerialInput(&buffer, routine);
  // emitMetrics();
}
