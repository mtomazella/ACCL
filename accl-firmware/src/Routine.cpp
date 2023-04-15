#include "Routine.h"

CurveType stringToCurveType(char *str)
{
  if (strcmp(str, "Linear") == 0)
    return CurveType::Linear;
  if (strcmp(str, "StepAfter") == 0)
    return CurveType::StepAfter;
  if (strcmp(str, "Monotone") == 0)
    return CurveType::Monotone;
  return CurveType::NOT_A_CURVE_TYPE;
}