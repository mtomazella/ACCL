#include <Arduino.h>

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  Serial.print("{\"t\":12.2,\"tp\":36.8,\"tg\":2,\"c\":1.98,\"f\":30}");
  Serial.flush();
  delay(100);
}
