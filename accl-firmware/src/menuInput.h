#include <Arduino.h>
#include <RotaryEncoder.h>
#include "config.h"
#include "systemData.h"

void menuInputSetup();
void menuInputProcess(SystemData *systemData, RotaryEncoder *encoder);

struct encoderState
{
  long position;
  long positionDelta;
  unsigned long rpm;
  short int changed = 0;
};
typedef struct encoderState EncoderState;
EncoderState getEncoderState(RotaryEncoder *encoder);

struct buttonState
{
  unsigned int lastRelease = 0;
  unsigned int lastPress = 0;
  short int clicksToHandle = 0;
  short int holdsToHandle = 0;
};
typedef struct buttonState ButtonState;
void updateButtonState(ButtonState *buttonState);