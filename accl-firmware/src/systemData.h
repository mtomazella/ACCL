#pragma once

struct SystemData
{
  unsigned long routine_start_time = 0;
  // Sensor
  float tension = 0.0;
  float current = 0.0;
  float temperature = 0.0;
  // Control
  float targetCurrent = 0.0;
  int fanPercentage = 0;
};