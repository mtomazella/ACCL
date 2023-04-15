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

void Routine::print()
{
  Serial.println("Routine");
  Serial.print("Name: ");
  Serial.println(this->name);
  Serial.print("CurveType: ");
  Serial.println(this->curveType);
  Serial.print("Loops: ");
  Serial.println(this->loop);
  Serial.print("Points:\n");
}