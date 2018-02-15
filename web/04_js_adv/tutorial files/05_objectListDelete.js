// prevents a misspelled variable from getting auto-declared.
"use strict";

function makeEmpList() {

    var empList = [];

    empList.add = function (newName, newSalary) {

        var emp = {}; // declare an empty object

        // these are two PRIVATE properties
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
            return ("Employee name: " + name + ", salary: " + formatCurrency(salary));
        };

        empList[empList.length] = emp;

    };
    
    empList.delete = function (whichEmployee) {
        
        if (empList.length == 0) {
            return "Cannot delete - Employee list is empty";
        }
        
        if (!whichEmployee || isNaN(whichEmployee) || (whichEmployee < 0) || (whichEmployee >= empList.length)) {
            return "cannot delete - employee number " + whichEmployee + " does not exist";
        }
        whichEmployee=Number(whichEmployee);
        for (var i = whichEmployee; i < empList.length-1; i++) {
            console.log("Employee "+i+" set to "+empList[i+1]);
            empList[i] = empList[i+1];
        }
        empList.length=empList.length-1;
        console.log("New length of employee list is "+empList.length);
        return "Employee " + whichEmployee + " has been deleted.";
    };

    empList.showList = function () {
        var output = "";
        for (var i = 0; i < empList.length; i++) {
            output += i + ") " + empList[i].show() + "<br/>";
        }
        return output;
    };

    return empList;

    // a PRIVATE function (method) moved from employee object to empList object.
    // It could have stayed in the employee object too for this specific code example.
    function formatCurrency(num) {
        return num.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }
}