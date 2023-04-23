#include "serialOutput.h"

void emitMetrics(Routine *routine)
{
  char message[100];

  float tension = 12.2;
  float temperature = 36.8;
  float targetCurrent = 2.0;
  float current = 1.98;
  int fanPercentage = 30;

#ifdef DEBUG_VERBOSE_METRICS
  sprintf(
      message,
      "{\"t\":%.2f,\"tp\":%.2f,\"tg\":%.2f,\"c\":%.2f,\"f\":%.2d,\"r_n\":%s,\"r_c\":%d,\"r_l\":%d,\"r_p\":%d}",
      tension,
      temperature,
      targetCurrent,
      current,
      fanPercentage,
      routine->name,
      routine->curveType,
      routine->loop,
      routine->num_points);
#else
  sprintf(
      message,
      "{\"t\":%.2f,\"tp\":%.2f,\"tg\":%.2f,\"c\":%.2f,\"f\":%.2d}",
      tension,
      temperature,
      targetCurrent,
      current,
      fanPercentage);
#endif

  Serial.print(message);
  Serial.flush();
}