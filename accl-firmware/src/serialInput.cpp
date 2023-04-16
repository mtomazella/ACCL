#include "serialInput.h"

static int readIndex = 0;

char *readSerial()
{
  // String input = Serial.readString();
  // String input = "{\"name\":\"NO_NAME\",\"curve_type\":\"Linear\",\"loops\":false,\"points\":[{\"time\":0.0,\"current\":0.0},{\"time\":1.0,\"current\":432.0},{\"time\":3.0,\"current\":416.0},{\"time\":4.0,\"current\":4124.0},{\"time\":6.0,\"current\":432.0},{\"time\":13.0,\"current\":543.0},{\"time\":31.0,\"current\":3.0},{\"time\":43.0,\"current\":45.0},{\"time\":45.0,\"current\":4215.0},{\"time\":53.0,\"current\":645.0},{\"time\":54.0,\"current\":7.0},{\"time\":67.0,\"current\":8.0},{\"time\":74.0,\"current\":643.0},{\"time\":89.0,\"current\":8765.0},{\"time\":345.0,\"current\":67.0},{\"time\":425.0,\"current\":1425.0},{\"time\":435.0,\"current\":1.0},{\"time\":456.0,\"current\":7.0},{\"time\":467.0,\"current\":653.0},{\"time\":514.0,\"current\":51.0},{\"time\":527.0,\"current\":468.0},{\"time\":643.0,\"current\":6.0},{\"time\":653.0,\"current\":65.0},{\"time\":654.0,\"current\":32.0},{\"time\":4215.0,\"current\":32.0},{\"time\":4316.0,\"current\":346.0},{\"time\":5421.0,\"current\":5.0},{\"time\":5678.0,\"current\":765.0},{\"time\":7645.0,\"current\":75.0},{\"time\":43215.0,\"current\":43.0}]}";
  // char *input = "{\"name\":\"NO_NAME\",\"curve_type\":\"Linear\",\"loops\":false,\"points\":[{\"time\":0.0,\"current\":0.0},{\"time\":1.0,\"current\":432.0}]}";
  char *input[] = {"{\"name\":\"test name\",\"curve_type\":\"Monotone\",\"loop",
                   "s\":\"true\"", "\"points\":[{\"time\":\"0.0\",\"current\":\"0.", "\"0\"},{\"time\":\"1.0\",\"current\":\"432.0\"}]}"};

  if (readIndex < 2)
    return input[readIndex++];
  return NULL;
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
  // static int complete = 1;
  static int expectingPoints = 0;

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
  removeCharacter(keyValue);
  char *key = strtok(keyValue, ":");
  char *value = strtok(NULL, "\0");

  if (strcmp(key, "name") == 0)
    strcpy(result->name, value);
  else if (strcmp(key, "curve_type") == 0)
    result->curveType = (CurveType)stringToCurveType(value);
  else if (strcmp(key, "loops") == 0)
    result->loop = strcmp(value, "true") == 0;

  return extractData(buffer, result);
}

void handleSerialInput(char **buffer, Routine *routine)
{
  char *input = readSerial();

#ifdef DEBUG_PRINT_ROUTINE
  Serial.print("Input: ");
  Serial.println(input);
#endif

  if (input != NULL)
    strcat(*buffer, input);

#ifdef DEBUG_PRINT_ROUTINE
  Serial.print("Buffer: ");
  Serial.println(*buffer);
#endif

  extractData(*buffer, routine);

#ifdef DEBUG_PRINT_ROUTINE
  Serial.println(" ");
  routine->print();
#endif
}