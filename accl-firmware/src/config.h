#define MAX_NUM_POINTS_FOR_ROUTINE 30
// Serial
#define SERIAL_BAUD_RATE 9600
#define SERIAL_INPUT_BUFFER_SIZE 100
#define SERIAL_OUTPUT_INTERVAL 500
// Pins
#define CURRENT_PIN A2
#define TENSION_PIN A1
#define ONEWIRE_PIN 2
#define ENCODER_SWITCH_PIN 6
#define ENCODER_DT_PIN 5
#define ENCODER_CLK_PIN 4
// Display
#define DISPLAY_INTERVAL 500
// #define I2C_DISPLAY
#ifdef I2C_DISPLAY
#define DISPLAY_I2C_ADDRESS 0x27
#else
#define DISPLAY_PIN_RS 12
#define DISPLAY_PIN_EN 11
#define DISPLAY_PIN_D4 10
#define DISPLAY_PIN_D5 9
#define DISPLAY_PIN_D6 8
#define DISPLAY_PIN_D7 7
#endif
#define DISPLAY_COLS 20
#define DISPLAY_ROWS 4
// Temperature
#define TEMPERATURE_READ_INTERVAL 10000
// DAC
#define DAC_ADDRESS 0x60
#define DAC_MAX_VALUE 4095
// Fan
#define FAN_PIN 3
#define FAN_UPDATE_INTERVAL 5000
// Circuit
#define CURRENT_RESISTOR_RESISTANCE 0.22
#define DAC_MAX_VCC 5

// Debug
// #define DEBUG_LOOP_DELAY 5000
// #define DEBUG_SHOW_RAM
// #define DEBUG_PRINT_ROUTINE
// #define DEBUG_DISABLE_METRICS
// #define DEBUG_VERBOSE_METRICS
// #define DEBUG_PRINT_POINT_ADDED
// #define DEBUG_UPDATE_DISPLAY_EVERY_FRAME
#define DEBUG_DISPLAY_DEBUG_INFO