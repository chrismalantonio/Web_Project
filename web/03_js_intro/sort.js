// array is the array you want to sort
// key is the name of the property by which you want to sort (in quotes)

function sortByKey(array, key) {

    /* .sort is a built-in array method provided by javaScript.
     * 
     * .sort expects you to provide a function (such as the unnamed function below)
     * that takes two elements of the array (a and b in the code below) and returns either 
     *    1 (if the first element is larger than the second) or 
     *   -1 if the second element is larger that the first, or 
     *    0 if both elements are equal.   */

    return array.sort(function (a, b) {
        // a and b are two elements of the array to be compared

        /* These two lines of code extract the key property from the objects 
         * to be compared. 
         * 
         * These two lines of code use JavaScript's associative array notation. For example,
         * 
         * var person = {name:"sally", age:20};
         * console.log(person["name"]);         // would print sally
         * console.log(person{"age"]);          // would print 20            */
        if (key === "name") {
            var akey = a.getName();
            var bkey = b.getName();
        } else if (key === "role") {
            var akey = a.getRole();
            var bkey = b.getRole();
        } else {
            var akey = a.getPlayRate();
            var bkey = b.getPlayRate();
        }

        // If the values to be compared are character, convert to lower case
        // so that it sorts characters as you would expect: "a" not larger than "A".
        if (typeof akey === "string") {
            akey = akey.toLowerCase();
        }
        if (typeof bkey === "string") {
            bkey = bkey.toLowerCase();
        }

        // If the values to be compared are numeric, make sure to compare them numerically
        // not treating the digits like characters.
        if (!isNaN(akey)) {
            akey = Number(akey);
        }
        if (!isNaN(bkey)) {
            bkey = Number(bkey);
        }

        // The meat of the function is to return -1 if the first element is < the second
        // or 1 if first element is > second element (or 0 if they are equal) - based on the 
        // key field by which you are comparing 
        var returnVal = 0;
        if (akey < bkey) {
            returnVal = -1;
        } else if (akey > bkey) {
            returnVal = 1;
        }

        // This is the badly documented code I replaced...
        //var returnVal = ((x < y) ? -1 : ((x > y) ? 1 : 0));
        console.log("comparing " + akey + " to " + bkey + " yields " + returnVal);
        return returnVal;
    });

}