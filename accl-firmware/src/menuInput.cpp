#include "menuInput.h"

void menuInputSetup()
{
  pinMode(ENCODER_SWITCH_PIN, INPUT_PULLUP);
}

void menuInputProcess(SystemData *systemData, RotaryEncoder *encoder)
{
  encoder->tick();
  EncoderState encoderState = getEncoderState(encoder);
  static ButtonState buttonState;
  updateButtonState(&buttonState);

  if (!encoderState.changed && buttonState.clicksToHandle == 0 && buttonState.holdsToHandle == 0)
    return;

  if (systemData->manualControlEnabled)
  {
    if (buttonState.clicksToHandle % 2 != 0)
    {
      systemData->manualControlEnabled = 0;
      systemData->routineStartTime_ms = millis();
      buttonState.clicksToHandle = 0;
      buttonState.holdsToHandle = 0;
      return;
    }

    int delta = encoderState.positionDelta;
    int rpm = encoderState.rpm;

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
  else if (buttonState.clicksToHandle % 2 != 0)
    systemData->manualControlEnabled = 1;

  buttonState.clicksToHandle = 0;
  buttonState.holdsToHandle = 0;
}

EncoderState getEncoderState(RotaryEncoder *encoder)
{
  static EncoderState encoderState;

  int encoderPosition = encoder->getPosition();
  if (encoderPosition == encoderState.position)
  {
    encoderState.changed = 0;
    return encoderState;
  }
  int positionDelta = encoderPosition - encoderState.position;

  encoderState.changed = 1;
  encoderState.position = encoderPosition;
  encoderState.positionDelta = positionDelta;
  encoderState.rpm = encoder->getRPM();

  return encoderState;
}

void updateButtonState(ButtonState *buttonState)
{
  short int circuitPressed = digitalRead(ENCODER_SWITCH_PIN) == LOW;
  unsigned int time = millis();

  if (circuitPressed && buttonState->lastRelease >= buttonState->lastPress && time - buttonState->lastRelease >= 100)
    buttonState->lastPress = time;

  else if (!circuitPressed && buttonState->lastPress > buttonState->lastRelease)
  {
    buttonState->lastRelease = time;
    if (time - buttonState->lastPress > 1000)
      buttonState->holdsToHandle += 1;
    else
      buttonState->clicksToHandle += 1;
  }
}