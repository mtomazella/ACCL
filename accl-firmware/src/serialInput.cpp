#include "serialInput.h"

char *readSerial()
{
  if (Serial.available() == 0)
    return NULL;

  static char inputBuffer[65];
  String input = Serial.readString();

  inputBuffer[0] = '\0';
  strcpy(inputBuffer, input.c_str());
  return inputBuffer;
}

void removeCharacter(char *str, char c = '"')
{
  int readIndex = 0, writeIndex = 0;
  while (str[readIndex])
  {
    if (str[readIndex] != c)
      str[writeIndex++] = str[readIndex];
    readIndex++;
  }
  str[writeIndex] = '\0';
}

void extractData(char *buffer, Routine *result)
{
  if (buffer == NULL || strlen(buffer) == 0)
    return;

  int length = strlen(buffer);
  char *colonPtr = strstr(buffer, ",");
  if (colonPtr == NULL && buffer[length - 1] != '}' && !(buffer[length - 1] == '"' && strstr(buffer, ":") != NULL))
  {
#ifdef DEBUG_PRINT_ROUTINE
    Serial.println("Waiting for new data to complete buffer");
#endif
    return;
  }

  if (buffer[0] != '{' && !(buffer[0] == '"' && buffer[1] != ':'))
    strcpy(buffer, colonPtr + 1);

  if (buffer[0] == '{')
    strcpy(buffer, buffer + 1);

  char *keyValue = strdup(strtok(buffer, ","));
  char *newBuffer = strtok(NULL, "\0");
  strcpy(buffer, newBuffer);

  removeCharacter(keyValue, '"');
  removeCharacter(keyValue, '{');
  removeCharacter(keyValue, '}');
  removeCharacter(keyValue, '[');
  removeCharacter(keyValue, ']');

  char *key = strtok(keyValue, ":");
  char *value = strtok(NULL, "\0");

  static RoutinePoint pointInProgress = RoutinePoint{time : -1, current : -1};

#ifdef DEBUG_PRINT_ROUTINE
  Serial.println(" ");
  Serial.print("Key: ");
  Serial.println(key);
  Serial.print("Value: ");
  Serial.println(value);
  Serial.println(" ");

  Serial.print("Point In Progress - Time: ");
  Serial.print(pointInProgress.time);
  Serial.print(" Current: ");
  Serial.println(pointInProgress.current);
#endif

  if (strcmp(key, "name") == 0)
    strcpy(result->name, value);
  else if (strcmp(key, "curve_type") == 0)
    result->curveType = (CurveType)stringToCurveType(value);
  else if (strcmp(key, "loops") == 0)
    result->loop = strcmp(value, "true") == 0;
  else if (strcmp(key, "points") == 0)
  {
    result->clearPoints();
    strtok(value, ":");
    char *time = strtok(NULL, "\0");
    pointInProgress.time = atof(time);
  }
  else if (strcmp(key, "time") == 0)
    pointInProgress.time = atof(value);
  else if (strcmp(key, "current") == 0)
    pointInProgress.current = atof(value);

  if (pointInProgress.current != -1 && pointInProgress.time != -1)
  {
    result->addPoint(pointInProgress);
    pointInProgress.time = -1;
    pointInProgress.current = -1;
  }

  free(keyValue);

  return extractData(buffer, result);
}

void handleSerialInput(char **buffer, Routine *routine)
{
  char *input = readSerial();

#ifdef DEBUG_PRINT_ROUTINE
  Serial.print("Input: ");
  Serial.println(input);
#endif

  byte waiting_for_read_confirmation = 0;
  if (input != NULL)
  {
    strcat(*buffer, input);
    waiting_for_read_confirmation = 1;
  }

#ifdef DEBUG_PRINT_ROUTINE
  Serial.print("Buffer: ");
  Serial.println(*buffer);
#endif

  extractData(*buffer, routine);

  if (waiting_for_read_confirmation)
  {
    Serial.print("READ_COMPLETE");
    waiting_for_read_confirmation = 0;
  }

#ifdef DEBUG_PRINT_ROUTINE
  Serial.println(" ");
  routine->print();
#endif
}