#include "menuInput.h"

void menuInputSetup()
{
  pinMode(ENCODER_SWITCH_PIN, INPUT);
}

void menuInputProcess(SystemData *systemData, RotaryEncoder *encoder)
{
  encoder->tick();

  static int lastEncoderPosition = 0;
  int encoderPosition = encoder->getPosition();
  if (encoderPosition == lastEncoderPosition)
    return;
  int positionDelta = encoderPosition - lastEncoderPosition;

  if (systemData->manualControlEnabled)
  {
    int rpm = encoder->getRPM();
    int delta = positionDelta;
    if (rpm >= 100 && rpm < 500)
      delta *= 10;
    else if (rpm >= 1000)
      delta *= 100;

    systemData->dacValue =
        systemData->dacValue + delta > DAC_MAX_VALUE
            ? DAC_MAX_VALUE
        : systemData->dacValue + delta < 0
            ? 0
            : systemData->dacValue + delta;
  }

  lastEncoderPosition = encoderPosition;
}