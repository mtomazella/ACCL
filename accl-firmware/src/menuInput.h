#include <Arduino.h>
#include <RotaryEncoder.h>
#include "config.h"
#include "systemData.h"

void menuInputSetup();
void menuInputProcess(SystemData *systemData, RotaryEncoder *encoder);