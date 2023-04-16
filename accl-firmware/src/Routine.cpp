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
  for (int i = 0; i < this->num_points; i++)
  {
    Serial.print("- t: ");
    Serial.print(this->points[i].time);
    Serial.print(" c: ");
    Serial.println(this->points[i].current);
  }
}

void Routine::addPoint(RoutinePoint point)
{
  this->points[this->num_points++] = point;

#ifdef DEBUG_PRINT_POINT_ADDED
  Serial.println("Point added:");
  Serial.print("t: ");
  Serial.print(this->points[this->num_points - 1].time);
  Serial.print(" c: ");
  Serial.println(this->points[this->num_points - 1].current);
#endif
}

void Routine::clearPoints()
{
  this->num_points = 0;
}