#include "serialOutput.h"

void serialOutputProcess(Routine *routine, SystemData *systemData)
{
  char message[100];

  float tension = systemData->tension;
  float temperature = systemData->temperature;
  float targetCurrent = systemData->targetCurrent;
  float current = systemData->current;
  int fanPercentage = systemData->fanPercentage;
  unsigned long time = systemData->manualControlEnabled ? 0 : systemData->routineTime_ms;

#ifdef DEBUG_VERBOSE_METRICS
  sprintf(
      message,
      "{\"t\":%.2f,\"tp\":%.2f,\"tg\":%.2f,\"c\":%.2f,\"f\":%d,\"clk\":%lu,\"r_n\":%s,\"r_c\":%d,\"r_l\":%d,\"r_p\":%d}",
      tension,
      temperature,
      targetCurrent,
      current,
      fanPercentage,
      time,
      routine->name,
      routine->curveType,
      routine->loop,
      routine->num_points);
#else
  sprintf(
      message,
      "{\"t\":%.3f,\"tp\":%.1f,\"tg\":%.3f,\"c\":%.3f,\"f\":%d,\"clk\":%lu}",
      tension,
      temperature,
      targetCurrent,
      current,
      fanPercentage,
      time);
#endif

  Serial.print(message);
}