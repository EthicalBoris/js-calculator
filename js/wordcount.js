var w;
var words = new Map();
var allWords = new Array();

function openFile(url) {
    /*
        Function:openFile.
    -Takes argument URL. which is a string.
    -Opens html file which url refers to in a new window.
    */
    w = window.open();
    w.location = url;
}

function wordCount() {
    /*
        Function:wordCount.
    -Calls count function to populate a map of each word in the page and their amount
    -Creates a table and populates it with the data from the map
    -Displays the table

        Result:
    Displays on the main page all words from the opened file in alphabetical order
    along with their number of occurences.
    */
    pre = document.getElementById("count");
    count(w.document.body);

    console.log(words);
    table = document.createElement("table");
    tr = document.createElement("tr");
    th = document.createElement("th");
    th.appendChild(document.createTextNode("Word"));
    tr.appendChild(th);

    th = document.createElement("th");
    th.appendChild(document.createTextNode("Count"));
    tr.appendChild(th);

    table.appendChild(tr);
    var oddEven = 0;
    for (var [key, value] of words) {
        tr = document.createElement("tr");
        td1 = document.createElement("td");
        td2 = document.createElement("td");

        td1.appendChild(document.createTextNode("'" + key + "'"));
        td2.appendChild(document.createTextNode("'" + value + "'"));

        if (oddEven % 2 == 0) {
            td1.className = "odd";
            td2.className = "odd"
        } else {
            td1.className = "even";
            td2.className = "even"
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);

        oddEven++;
    }

    pre.parentNode.insertBefore(table, pre);
    pre.textContent = "Done";
}

function count(node) {
    /*
        Function: count.
    -This function goes through all the nodes of the document and searches for text nodes.
    -When a node is found, it's text is put into the all words array and sorted
    (going through an intermediate line array for simplicity, allows not pushing as multidimentional array)
    -Stores words and their occurences from the all words array into a words map
    (words map is cleared every time all words is updated to keep alphabetical order)

        Result:
    After iterating through all text nodes, the words map is in alphabetical order and has the correct values.
    */

    if (node.nodeType == Node.ELEMENT_NODE) {
        for (var n = node.firstChild; n != null; n = n.nextSibling) {
            count(n);
        }
    }

    else if (node.nodeType == Node.TEXT_NODE && node.data.length < 200) {
        //length 200 stops a final invisible text node full of html from appearing in the results

        var found = false;
        var line = new Array();

        if (node.data.match(/[a-z]/i)) { //checking for characters, not accepting blank text nodes /i for case insensitivity
            //console.log(node.data);
            line = node.data.split(" "); //create array of all words in this text node

            //Below code for alphabetical order (
            for (var i = 0; i < line.length; i++) {
                allWords.push(line[i]);
            }

            allWords.sort(function (a, b) { //custom sort function to ignore lowercase and uppercase
                if (a.toLowerCase() > b.toLowerCase()) return 1;
                if (a.toLowerCase() < b.toLowerCase()) return -1;
                return 0;
            });
            words.clear();
            // ) end of alphabetical order code


            for (var i = 0; i < allWords.length; i++) { //for each word in text node

                found = false;

                for (var [key, value] of words) { //check if word in map
                    if (key == allWords[i].toLowerCase()) { //case insensitivity
                        //if word found, value up and break
                        words.set(key, value + 1);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    //if word not found, add to map
                    words.set(allWords[i].toLowerCase(), 1);
                }
            }

        }
    }
}