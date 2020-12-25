var express = require('express');
var mysql = require('mysql');
var app = express();


var host = process.env.HOST;
var user = process.env.USER;
var password = process.env.PASSWORD;
var database = process.env.DATABASE;

var db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Routes
app.get('/',  (request, response) => {
    response.send("Communicating with server-side!");
});

app.get('/', (request, response) => {
    console.log('GET request received at /employees');
   
});

app.post($('#add_data_button'), (request, response) => {
    console.log('POST request received at /employees');
    db.connect(function (err) {
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
});