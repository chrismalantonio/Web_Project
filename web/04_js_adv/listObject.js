// prevents a misspelled variable from getting auto-declared.
"use strict";

function makeChampionList() {
    var championList = [];

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
    };

    championList.showList = function () {
        var output = "";
        for (var i = 0; i < championList.length; i++) {
            output += championList[i].show() + "<br/>";
        }
        return output;
    };

    return championList;

    function getPlayRate(number) {
        return number.toLocaleString();
    }

}