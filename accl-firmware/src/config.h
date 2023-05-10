#define MAX_NUM_POINTS_FOR_ROUTINE 30
// Serial
#define SERIAL_BAUD_RATE 9600
#define SERIAL_INPUT_BUFFER_SIZE 100
#define SERIAL_OUTPUT_INTERVAL 500
// Pins
#define CURRENT_PIN A0
#define TENSION_PIN A1
// Display
#define DISPLAY_INTERVAL 500
#define I2C_DISPLAY
#ifdef I2C_DISPLAY
#define DISPLAY_I2C_ADDRESS 0x27
#else
#define DISPLAY_PIN_RS 7
#define DISPLAY_PIN_EN 8
#define DISPLAY_PIN_D4 9
#define DISPLAY_PIN_D5 10
#define DISPLAY_PIN_D6 11
#define DISPLAY_PIN_D7 12
#endif
#define DISPLAY_COLS 16
#define DISPLAY_ROWS 2

// Debug
// #define DEBUG_LOOP_DELAY 5000
// #define DEBUG_SHOW_RAM
// #define DEBUG_PRINT_ROUTINE
// #define DEBUG_DISABLE_METRICS
// #define DEBUG_VERBOSE_METRICS
// #define DEBUG_PRINT_POINT_ADDED