// prevents a misspelled variable from getting auto-declared.
"use strict";

function makeEmpList(listDivId, empClassName, messageId) {

    var empList = [];

    var empListDiv = document.getElementById(listDivId);
    var messageDiv = document.getElementById(messageId);

    empList.add = function (newName, newSalary) {

        var emp = {}; // declare an empty object

        // these are PRIVATE properties
        var name = newName;
        var salary = newSalary;

        // these are public methods
        emp.changeSalary = function (pctToChange) {
            pctToChange = Number(pctToChange) / 100;
            salary = salary * (1 + pctToChange);
        };

        emp.setName = function (newName) {
            name = newName;
        };

        emp.show = function () {
            return ("Employee name: " + name + "<br/>Salary: " + formatCurrency(salary));
        };

        empList[empList.length] = emp;
        empList.showList();

    };

    empList.delete = function (whichEmployee) {

        if (empList.length === 0) {
            return "Cannot delete - Employee list is empty";
        }

        if (whichEmployee === undefined) {
            return "Must specify employee number";
        }

        whichEmployee = Number(whichEmployee);
        if (isNaN(whichEmployee)) {
            return "Must specify numeric employee number";
        }

        if ((whichEmployee < 0) || (whichEmployee >= empList.length)) {
            return "Cannot delete - employee number " + whichEmployee + " does not exist";
        }

        for (var i = whichEmployee; i < empList.length - 1; i++) {
            console.log("Employee " + i + " set to " + empList[i + 1]);
            empList[i] = empList[i + 1];
        }
        empList.length = empList.length - 1;
        console.log("New length of employee list is " + empList.length);
        return "Employee " + whichEmployee + " has been deleted.";
    };

    empList.showList = function () {
        empListDiv.innerHTML = "";  // blank out the div that holds the list

        // for each employee object that's in empList, add a child emp div to empListDiv
        for (var i = 0; i < empList.length; i++) {

            // emp div to hold the employee object, add it to empListDiv
            var newEmp = document.createElement("div");
            empListDiv.appendChild(newEmp);

            // in the employee div, add a top part (to hold the delete icon).
            // and append this top part to the employee div
            var empTop = document.createElement("div");
            newEmp.appendChild(empTop);

            // add the delete icon (image) to the top div of the employee 
            // object, style it, right justified. 
            var delIcon = document.createElement("img");
            delIcon.empIndex = i; // add custom property to delIcon (index of emp object)
            delIcon.style.padding = "5px"; // make click area bigger
            delIcon.src = "icons/delete.png";
            empTop.style.textAlign = "right";
            empTop.appendChild(delIcon);

            // create a child div of employee div (bottom part) 
            // that will display the name and salary (and attach 
            // this bottom part to the employee div.
            var empBottom = document.createElement("div");
            empBottom.innerHTML = i + ".) " + empList[i].show();
            newEmp.appendChild(empBottom);
            newEmp.className = empClassName;

            // if anyone clicks a delete icon, it will invoke the delete method
            // (of empList) passing in the index of the employee to be deleted. 
            // This is not recursion -- showList (below) will only be called 
            // later, when/if a user clicks on the icon.
            delIcon.onclick = function () {
                // "this" means HTML element being clicked
                //alert("to delete employee " + this.index);
                messageDiv.innerHTML = empList.delete(Number(this.empIndex));
                empList.showList();
            };
        }
    };

    return empList;

// a PRIVATE function (method) moved from employee object to empList object.
// It could have stayed in the employee object too for this specific code example.
// Moving it (from MakeEmp) to MakeEmpList means it can be used by more functions - 
// it can be used by any function in MakeEmpList.
    function formatCurrency(num) {
        return num.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }
}