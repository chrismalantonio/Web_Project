// prevents a misspelled variable from getting auto-declared.
"use strict";

function makeChampionList(listDivId, champClassName, messageId) {

    var championList = [];

    var champListDiv = document.getElementById(listDivId);
    var messageDiv = document.getElementById(messageId);

    championList.add = function (champName, champRole, champPlayRate) {

        var champion = {};
        var name = champName;
        var role = champRole;
        var playRate = champPlayRate;


        champion.setName = function (champName) {
            name = champName;
        };

        champion.getName = function () {
            return name;
        };

        champion.setRole = function (champRole) {
            role = champRole;
        };

        champion.getRole = function () {
            return role;
        };

        champion.setPlayRate = function (givenNumber) {
            playRate = Number(givenNumber);
        };

        champion.getPlayRate = function () {
            return playRate;
        };

        champion.show = function () {
            return (name + ", " + role + ", " + getPlayRate(playRate.toFixed(2)) + "%");
        };
        championList[championList.length] = champion;
        championList.showList();
    };

    championList.delete = function (whichChampion) {

        if (championList.length === 0) {
            return "Cannot delete - Employee list is empty";
        }

        if (whichChampion === undefined) {
            return "Must specify champion number";
        }

        whichChampion = Number(whichChampion);
        if (isNaN(whichChampion)) {
            return "Must specify numeric champion number";
        }

        if ((whichChampion < 0) || (whichChampion >= championList.length)) {
            return "Cannot delete - champion number " + whichChampion + " does not exist";
        }

        for (var i = whichChampion; i < championList.length - 1; i++) {
            console.log("Champion " + i + " set to " + championList[i + 1]);
            championList[i] = championList[i + 1];
        }
        championList.length = championList.length - 1;
        console.log("New length of champion list is " + championList.length);
        return "Champion " + whichChampion + " has been deleted.";
    };

    championList.showList = function () {
        champListDiv.innerHTML = "";  // blank out the div that holds the list

        // for each employee object that's in empList, add a child emp div to empListDiv
        for (var i = 0; i < championList.length; i++) {

            // emp div to hold the employee object, add it to empListDiv
            var newChamp = document.createElement("div");
            champListDiv.appendChild(newChamp);

            // in the employee div, add a top part (to hold the delete icon).
            // and append this top part to the employee div
            var champTop = document.createElement("div");
            newChamp.appendChild(champTop);

            // add the delete icon (image) to the top div of the employee 
            // object, style it, right justified. 
            var delIcon = document.createElement("img");
            delIcon.champIndex = i; // add custom property to delIcon (index of emp object)
            delIcon.style.padding = "5px"; // make click area bigger
            delIcon.style.width = "5%";
            delIcon.src = "icons/delete.png";
            champTop.style.textAlign = "right";
            champTop.appendChild(delIcon);

            // create a child div of employee div (bottom part) 
            // that will display the name and salary (and attach 
            // this bottom part to the employee div.
            var champBottom = document.createElement("div");
            champBottom.innerHTML = i + ".) " + championList[i].show();
            newChamp.appendChild(champBottom);
            newChamp.className = champClassName;

            // if anyone clicks a delete icon, it will invoke the delete method
            // (of empList) passing in the index of the employee to be deleted. 
            // This is not recursion -- showList (below) will only be called 
            // later, when/if a user clicks on the icon.
            delIcon.onclick = function () {
                // "this" means HTML element being clicked
                //alert("to delete employee " + this.index);
                messageDiv.innerHTML = championList.delete(Number(this.champIndex));
                championList.showList();
            };
        }
    };

    return championList;

    function getPlayRate(number) {
        return number.toLocaleString();
    }

}