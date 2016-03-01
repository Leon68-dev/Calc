var CS_FIRST = 0;
var CS_VALID = 1;
var CS_ERROR = 2;

var DISPLAY_DIGITS = 15;       // NumberDisplay of digits in calc. display
var Operator;
var NumberDisplay = "";
var Negative = false;
var Operand = 0;
var clcStatus = CS_FIRST;