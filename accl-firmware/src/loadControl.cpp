#include "loadControl.h"

void loadControlProcess(Routine *routine, SystemData *systemData)
{
  systemData->targetCurrent = getTargetCurrent(routine, systemData->routineTime_ms / 1000);
}

float getTargetCurrent(Routine *routine, unsigned long time)
{
  if (routine->curveType == CurveType::Linear)
    return getTargetCurrentForLinear(routine, time);
  if (routine->curveType == CurveType::StepAfter)
    return getTargetCurrentForStepAfter(routine, time);
  if (routine->curveType == CurveType::Monotone)
    return getTargetCurrentForMonotone(routine, time);

  return 0.0;
}

float getTargetCurrentForLinear(Routine *routine, unsigned long time)
{
  if (routine->num_points <= 0)
    return 0.0;

  if (routine->num_points <= 1 || routine->points[routine->num_points - 1].time <= time)
    return routine->points[routine->num_points - 1].current;

  for (int i = 0; i < routine->num_points - 1; i++)
    if (routine->points[i].time <= time && routine->points[i + 1].time > time)
    {
      float a0 = routine->points[i].current;
      float a = routine->points[i + 1].current;
      float t0 = routine->points[i].time;
      float t = routine->points[i + 1].time;
      if (t == t0)
        return a0;
      return (a - a0) / (t - t0) * (time - t0) + a0;
    }

  return 0.0;
}

float getTargetCurrentForStepAfter(Routine *routine, unsigned long time)
{
  if (routine->num_points <= 0)
    return 0.0;

  if (routine->num_points <= 1 || routine->points[routine->num_points - 1].time <= time)
    return routine->points[routine->num_points - 1].current;

  for (int i = 0; i < routine->num_points - 1; i++)
    if (routine->points[i].time <= time && routine->points[i + 1].time > time)
    {
      return routine->points[i].current;
    }

  return 0.0;
}

float getTargetCurrentForMonotone(Routine *routine, unsigned long time)
{
  return 0.0;
}