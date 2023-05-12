#pragma once

struct SystemData
{
  // Sensor
  float tension = 0.0;
  float current = 0.0;
  float temperature = 0.0;
  // Control
  float targetCurrent = 0.0;
  int fanPercentage = 0;
  unsigned long routineStartTime_ms = 0;
  unsigned long routineTime_ms = 0;
};