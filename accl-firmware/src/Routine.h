#pragma once

#include "debugConfig.h"

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

struct routinePoint
{
  float time;
  float current;
};
typedef struct routinePoint RoutinePoint;

class Routine
{
private:
  int num_points = 0;

public:
  char name[30] = "NO_NAME";
  CurveType curveType = CurveType::Linear;
  int loop = 0;
  RoutinePoint points[MAX_NUM_POINTS_FOR_ROUTINE];

  void print();
  void addPoint(RoutinePoint point);
  void clearPoints();
};

CurveType stringToCurveType(char *str);