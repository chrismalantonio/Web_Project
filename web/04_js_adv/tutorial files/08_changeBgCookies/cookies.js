/* 
 * Functions related to reading and writing cookies.
 * You can just use these!
 */

/*
 * This function writes a name/value pair into the cookie, if the name
 * is not already in the cookie. Otherwise, it replaces the value
 * of the name (that was already in the cookie). A cookie is just a
 * text file (of name/value pairs) that is stored on the User's PC.
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.log("setCookie called with name "+cname+" and value "+cvalue);
    //console.log("setCookie: document.cookie is "+document.cookie);
    var s = document.cookie;
    if (s.length == 0) {
        alert ("Chrome does not support cookies from local web pages. "+
                "\nUse Firefox or upload to server if you want to use Chrome.");
    }
}

/* 
 * This function reads the cookie, looks for a name/value pair 
 * that matches the name you passed in. If it finds one, it returns
 * the founc value. Otherwise, it returns null. (Calling code needs
 * to check for null.)
 */
function getCookie(cname) {
    var cookieVal = "";
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            cookieVal = c.substring(name.length, c.length);
    }
    console.log("getCookie:  Cookie value for name " + name + " is " + cookieVal);
    return cookieVal;
}

/*
 * This function just writes to the given name/value pair and
 * gives it a negative one day to live -- effectively erasing
 * the name/value pair from the cookie.
 */

function eraseCookie(name) {
    setCookie(name, "", -1);
}
