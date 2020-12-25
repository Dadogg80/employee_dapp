import mysql from 'mysql';
import "main.js";


var host = process.env.HOST;
var user = process.env.USER;
var password = process.env.PASSWORD;
var database = process.env.DATABASE;
/*
var first = $("#first_input").val();
var last = $("#last_input").val();
var located = $("#location_input").val();
var startDate = $("#startDate_input").val();
var email = $("#email_input").val();
var account = $("#account_input").val();
var department = $("#department_input").val();
var salary = $("#salary_input").val();
*/
var count = NULL;
var employeeID = NULL;
var endDate = NULL;
var role = NULL;

function writeDb() {
    let con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    
    con.connect(function (err) {
        if (err) throw err;
        console.warn("Connected to mySQL database!");

        let sql = "INSERT INTO `employees` ( `count`, `employee id`, `first`, `last`, `email`, `location`, `image`, `start date`, `end date`, `account`, `salary`, `role`, `department`, `text field`) VALUES ("`${count}`;", "`${employeeID}`;", "`${first}`;", "`${last}`;", "`${email}`;", "`${located}`;", "`${image}`;", "`${startDate}`;", "`${endDate}`;", "`${account}`;", "`${salary}`;", "`${role}`;", "`${department}`;", "`${textField}`;" ) ";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.warn(`${count}`, `${employeeID}`, `${first}`, `${last}`, `${email}`, `${located}`,`${image}`, `${startDate}`, `${endDate}`, `${account}`, `${salary}`, `${role}`, `${department}`, `${textField}`);
            console.log(`Employee ${employeeID} is added to the mySQL database!`);
            console.log(result);
          });
    });

}