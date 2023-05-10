#include "Routine.h"
#include "systemData.h"

void loadControlProcess(Routine *routine, SystemData *systemData);
float getTargetCurrent(Routine *routine, unsigned long time);
float getTargetCurrentForLinear(Routine *routine, unsigned long time);
float getTargetCurrentForStepAfter(Routine *routine, unsigned long time);
float getTargetCurrentForMonotone(Routine *routine, unsigned long time);