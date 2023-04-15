
#pragma once
#include <Arduino.h>
#include <string.h>

enum CurveType
{
  NOT_A_CURVE_TYPE,
  Linear,
  StepAfter,
  Monotone,
};

enum RoutineField
{
  NAME,
  CURVE_TYPE,
  NOT_A_FIELD
};

class Routine
{
public:
  char name[30] = "NO_NAME";
  CurveType curveType = CurveType::Linear;
  int loop = 0;

  void print();
};

CurveType stringToCurveType(char *str);