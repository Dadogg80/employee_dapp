var express = require('express');
var app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Routes
app.get('/',  (request, response) => {
    response.send("Communicating with server-side!");
});

app.get('/employees', (request, response) => {
    console.log('GET request received at /employees');
});

app.post('/employees', (request, response) => {
    console.log('POST request received at /employees');
});