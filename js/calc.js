var acc = null;
var disp = 0;
var operator = null;

function number(num) {
    /*
        Function:number.
    -Function to be called whenever a number key is pressed
    -

    (input is sanitized so that users can not type more than display size)

        Result:
    -Append number to the display if there is no overflow an
    */

    if (acc == "Overflow") {
        C();
        return;
    }

    if (disp.toString().length + 1 == 18) {
        //prevent user from being able to input more than 18 chars
        return;
    }

    if (disp == "0") {
        disp = num;
    } else {
        disp = disp + "" + num;
    }
    $(".box").text(disp);
}

function C() {
    /*
        Function:C.
    -Function to be called when the C button is pressed
    -Is a reset function which takes the calculator back to it's
    original state

        Result:
    -display is set to 0
    -acc is set to null
    -operator is no longer stored
    */

    disp = 0;
    acc = null;
    operator = null;
    $(".box").text(disp);
}

function dot() {
    /*
        Function:dot.
    -Function to be called whenever the dot button is pressed
    -Makes the current number decimal, allowing for floating point
    operations

        Result:
    -if the current display number is not already decimal, append
    a '.' to the display.
    */

    if (acc == "Overflow") {
        C();
        return;
    }

    if (disp.toString().includes(".") /*|| acc == disp*/ ) {
        return;
    } else {
        disp = disp + ".";
        $(".box").text(disp);
    }
}

function operation(op) {
    /*
        Function:operation.
    -Function to be called when an operator button is called (+,-,*,/)
    -Function will call the reset method C() if acc has been overflown

        Result:
    -calls equals method if operator is already stored
    -stores operator
    -display is stored into acc
    -display becomes 0 but on screen still shows old value
    */

    if (acc == "Overflow") {
        C();
        return;
    }

    if (operator != null) {
        equals();
    }
    operator = op;
    acc = disp;
    disp = 0;


    //$(".box").text(disp);
}

function equals() {
    /*
        Function: equals.
    -To be called when the equals key is pressed or when an operator is 
    pressed after an operator is already stored

        Result:
    -acc becomes result of operation to be done
    -display becomes acc
    -operator is cleared
    */

    if (ready()) {

        /*
        if (operator == '+') {
            acc = parseFloat(acc) + parseFloat(disp);
        } else if (operator == '-') {
            acc = parseFloat(acc) - parseFloat(disp);
        } else if (operator == '*') {
            acc = parseFloat(acc) * parseFloat(disp);
        } else if (operator == '/') {
            acc = parseFloat(acc) / parseFloat(disp);
        }*/

        switch (operator.toString()) {
            case ('+'):
                acc = parseFloat(acc) + parseFloat(disp);
                break;
            case ('-'):
                acc = parseFloat(acc) - parseFloat(disp);
                break;

            case ('*'):
                acc = parseFloat(acc) * parseFloat(disp);
                break;

            case ('/'):
                acc = parseFloat(acc) / parseFloat(disp);
                break;
        }

        if (acc.toString().length > 18) { //This is if the number goes out of the display screen
            acc = acc.toExponential();
            if (acc.toString().length >= 18) { //if still somehow too big, becomes overflow value
                acc = "Overflow";
            }
        }

        disp = acc;
        operator = null;
        $(".box").text(disp);

    } else {
        return;
    }
}

function ready() {
    /*
        Function: ready.
    -Mini boolean function which is to be used to know wether or not the calculator
    is prepared to execute a calculation

        Result:
    -returns true if acc and operator are  not null
    -returns false if either acc or operator are empty
    */
    return (!(acc == null || operator == null));
}