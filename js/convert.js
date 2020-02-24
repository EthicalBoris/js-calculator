function getInputs(Upper, Lower, Unit) {
    /*
    Checks inputs.
    if inputs correct it continues and displays table
    otherwise, it displays alert message and clears inputs    
    */

    if (Upper > Lower) {
        createTable(Upper, Lower, Unit);
    } else {
        alert("Upper bound is lower or equal to Lower bound. try again.");
    }
}

function createTable(Upper, Lower, Unit) {
    /*
        Function:createTable.
    Creates a table of temperature conversions using
    the Upper and Lower bounds.

    Matches with div tagID: convert
    */

    $("#converter").empty();
    //  $("#converter").append("<p>Celcius to Farenheit conversions:</p>");

    var converter;
    var convert;

    if (Unit == "Celcius") {
        //alert("Celcius");
        // $("#converter").append("<table> <tr><th>Celcius</th><th>Farenheit</th></tr>");
        $("#converter").append("<p>Celcius to Farenheit conversions:</p>");
        converter = "<table> <tr><th>Celcius</th><th>Farenheit</th></tr>";
        convert = C2F;

    } else if (Unit == "Farenheit") {
        //alert("Farenheit");
        // $("#converter").append("<table> <tr><th>Farenheit</th><th>Celcius</th></tr>");
        $("#converter").append("<p>Farenheit to Celcius conversions:</p>");
        converter = "<table> <tr><th>Farenheit</th><th>Celcius</th></tr>";
        convert = F2C;
    }

    if (Lower <= Upper) { // for ascending or descending order

        if (Lower == "") {
            Lower = 0;
        }


        for (i = Lower; i < +Upper + 1; i++) { //+Upper necessary to not concatenate strings
            //  $("#converter").append("<tr><td>"+i+"</td><td>"+convert(i)+"</td></tr>");
            if (i % 2 == 0) {
                converter += "<tr><td class='even'>" + i + "</td><td class='even'>" + convert(i) + "</td></tr>";
            } else {
                converter += "<tr><td class='odd'>" + i + "</td><td class='odd'>" + convert(i) + "</td></tr>";
            }
        }
    } else {

        if (Upper == "") {
            Upper = Lower - 10;
        }

        for (i = Lower; i > +Upper - 1; i--) {

            if (i % 2 == 0) {
                converter += "<tr><td class='even'>" + i + "</td><td class='even'>" + convert(i) + "</td></tr>";
            } else {
                converter += "<tr><td class='odd'>" + i + "</td><td class='odd'>" + convert(i) + "</td></tr>";
            }

        }
    }


    converter += "</table>";

    //$("#converter").append("</table>");
    $("#converter").append(converter);

}

function C2F(C) {
    /*
        Function:C2F.
    -converts celcius to farenheit

        Result:
    -returns farenheit value
    */
    F = C * 9 / 5 + 32;

    if (F % 1 == 0) { //checking if result is decimal
        return F;
    } else {
        return F.toFixed(1); //toFixed for single decimal point
    }
}

function F2C(F) {
    /*
        Function:F2C.
    -converts farenheit to celcius

        Result:
    -returns celcius value
    */
    C = (+F - 32) * (5 / 9);

    if (C % 1 == 0) { //checking if result is decimal
        return C;
    } else {
        return C.toFixed(1); //toFixed for single decimal point
    }
}