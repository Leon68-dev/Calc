function UpdateDisplay() {
    //document.getElementById("txt_result").value = NumberDisplay;
    document.getElementById("txt_result2").value = NumberDisplay;


}

function Clear() {
    clcStatus = CS_FIRST;
    NumberDisplay = "0";
    Negative = false;
    Operator = '=';
}

function Error() {
    clcStatus = CS_ERROR;
    NumberDisplay = "Error";
    Negative = false;
}

function SetDisplay(dbl) {
    NumberDisplay = "" + dbl;
}

function GetDisplay() {
    var res = 0;

    try {
        res = 1 * NumberDisplay;
    } catch (e) {
        alert('Error');
    }

    return res;
}

function CheckFirst() {
    if (clcStatus == CS_FIRST) {
        clcStatus = CS_VALID;
        NumberDisplay = "0";
        Negative = false;
    }
}

function InsertKey(key) {
    var l = NumberDisplay.length;

    if (l < DISPLAY_DIGITS) {
        NumberDisplay += ("" + key);
    }
}

function CalcKey(key) {
    if (clcStatus == CS_ERROR && key != 'C')
        key = ' ';

    if (key >= '0' && key <= '9') {
        CheckFirst();

        if (NumberDisplay == "0")
            NumberDisplay = "";

        InsertKey(key);
    }
    else if (key == '+' || key == '-' || key == '*' || key == '/' || key == '='
        || key == '%' || key == 0x0D || key == 'q' || key == 'x'
        || key == 'sin' || key == 'cos' || key == 'tan'
        || key == 'dec2bin' || key == 'dec2hex' || key == 'hex2bin' || key == 'hex2dec' || key == 'bin2hex' || key == 'bin2dec' ) {
        var r = 0;

        if (clcStatus == CS_VALID) {
            clcStatus = CS_FIRST;
            r = GetDisplay();

            if (key == '%') {
                switch (Operator) {
                    case '+':
                    case '-':
                        r = Operand * r / 100;
                        break;
                    case '*':
                    case '/':
                        r /= 100;
                        break;
                }
            }

            switch (Operator) {
                case '+':
                    SetDisplay(Operand + r);
                    break;
                case '-':
                    SetDisplay(Operand - r);
                    break;
                case '*':
                    SetDisplay(Operand * r);
                    break;
                case '/':
                    if (r == 0)
                        Error();
                    else
                        SetDisplay(Operand / r);
                    break;
            }
        }

        Operator = key;

        if (Operator == 'q') {
            r = GetDisplay();
            if (r > 0)
                SetDisplay(Math.sqrt(r));
            else
                Error();
            Operator = '=';
        } else if (Operator == 'x') {
            SetDisplay(1 / r);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'sin') {
            var res = Math.sin(grad2rad(r));
            SetDisplay(res.toFixed(4));
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'cos') {
            var res = Math.cos(grad2rad(r));
            SetDisplay(res);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'tan') {
            var res = Math.tan(grad2rad(r));
            SetDisplay(res);
            Operator = '=';
        } else if (Operator == 'dec2bin') {
            var res = convertBase.dec2bin(r);
            SetDisplay(res);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'dec2hex') {
            var res = convertBase.dec2hex(r);
            SetDisplay(res);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'hex2bin') {
            var res = convertBase.hex2bin(r);
            SetDisplay(res);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'hex2dec') {
            var res = convertBase.hex2dec(r);
            SetDisplay(res);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'bin2hex') {
            var res = convertBase.bin2hex(r);
            SetDisplay(res);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        } else if (Operator == 'bin2dec') {
            var res = convertBase.bin2dec(r);
            SetDisplay(res);
            Operator = '=';
            if (clcStatus == CS_FIRST) {
                clcStatus = CS_VALID;
            }
        }
        Operand = GetDisplay();
    } else {
        switch (key) {
            case '.':
                CheckFirst();
                if (NumberDisplay.indexOf('.') < 0)
                    InsertKey(key);
                break;
            case 'B':       //Backspace
                CheckFirst();
                if (NumberDisplay.length == 1)
                    NumberDisplay = "0";
                else {
                    NumberDisplay = NumberDisplay.substring(0, NumberDisplay.length - 1);
                }
                break;
            case 'H':     //case '/-/':
                Negative = !Negative;
                var tmp = -1 * NumberDisplay;
                NumberDisplay = "" + tmp;
                break;
            case 'C':
                Clear();
                break;
            case 'Pi':
                NumberDisplay = Math.PI;
                if (clcStatus == CS_FIRST) {
                    clcStatus = CS_VALID;
                }
                break;
        }
    }
    UpdateDisplay();
}

function message(str) {
    alert(str);
}

function grad2rad(grad) {
    var res = 0;
    res = grad * Math.PI / 180;
    return res;
}

var convertBase = function () {
    function convertBase(baseFrom, baseTo) {
        return function (num) {
            return parseInt(num, baseFrom).toString(baseTo);
        };
    }
    // binary to decimal
    convertBase.bin2dec = convertBase(2, 10);
    // binary to hexadecimal
    convertBase.bin2hex = convertBase(2, 16);
    // decimal to binary
    convertBase.dec2bin = convertBase(10, 2);
    // decimal to hexadecimal
    convertBase.dec2hex = convertBase(10, 16);
    // hexadecimal to binary
    convertBase.hex2bin = convertBase(16, 2);
    // hexadecimal to decimal
    convertBase.hex2dec = convertBase(16, 10);
    return convertBase;
}();