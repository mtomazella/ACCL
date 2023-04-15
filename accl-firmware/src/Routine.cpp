#pragma once
#include <Arduino.h>

enum class CurveType
{
  Linear,
  StepUp,
  Monotone
};

class Routine
{
public:
  char name[30] = "NO_NAME";
  int loop = 0;
  CurveType curveType = CurveType::Linear;

  Routine()
  {
  }
};

enum RoutineField
{
  NAME,
  CURVE_TYPE,
  NOT_A_FIELD
};