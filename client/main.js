
var web3 = new Web3(Web3.givenProvider);
var instance;
var admin; 
var smartContract = "0x1F52736f0F58B395a8Ef21F4Eb9AECDbBc17e07a";


$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
        console.log('Inside window.ethereum');
        console.log(web3);

        //web3.eth.getAccounts(console.log);
        
      
        instance = new web3.eth.Contract( abi, smartContract, {
          from: accounts[0], 
          gasPrice: '20000000000'
        });
        admin = accounts[0];
        console.log(instance);
        console.log(`Owner account is ${admin}`)
       
        instance.events.allEvents().on('data', function(event){
            console.log(event);

            let employeeId = event.returnValues.id;
            let name = event.returnValues.name;
            let location = event.returnValues.location;
            let startDate = event.returnValues.startDate;
            let email = event.returnValues.email;
            let workerAddress = event.returnValues.workerAddress;
            let department = event.returnValues.department;
            let salary = event.returnValues.salary;
            $("#workerCreation").css("display", "block");
            $("#workerCreation").text(`EmployeeId : ${employeeId}. Name : ${name}.\n
            Located : ${location}. Start date : ${startDate}. Email : ${email}.\n
            Salary : ${salary}. Worker Address : ${workerAddress}.\n
            Department : ${department}. `);
        })
        .on('error', console.error);
        
    });
   

    $("#add_data_button").click(inputData);
    $("#get_data_button").click(fetchAndDisplay);

    console.log('Application is ready for testing!');
    alert('Web3 is loaded.');
});



function inputData() {
    var _name = $("#name_input").val();
    var _located = $("#located_input").val();
    var _startDate = $("#startDate_input").val();
    var _email = $("#email_input").val();
    var _workerAddress = $("#workerAddress_input").val();
    var _departmentAddress = $("#departmentAddress_input").val();
    var _salary = $("#salary_input").val();
    
    console.log(_name, _located, _startDate, _email, _salary, _workerAddress, _departmentAddress)

    instance.methods.createEmployee(_name, _located, _startDate, _email, _workerAddress, _departmentAddress, _salary).send({}, function(error, txHash){
        if(error){
            console.warn(error);
        }
        else{
            console.log(txHash);
            console.log(`New Worker: ${_workerAddress} is connected to department address ${_departmentAddress}.`);
            console.log(`Transaction Hash is: \ntxHash: ${txHash} .`);
        }
    })
    .on("transactionHash", function(hash) {
        console.log(hash);
    })
    .on("confirmation", function(confirmationNr) {
        console.log(confirmationNr);
    })
    .on("receipt", function(receipt) {
        console.log(receipt)
        alert("Done.");
    });
}

function fetchAndDisplay(){
    var _id = $("#getWorkerId_input").val();
    console.log(_id);

    instance.methods.getEmployee(_id).call().then( function(res) {
        console.log('Button Pushed!');
        console.log(res);    
        let id = res[0];
        let name = res[1];
        let startDate = res[2];
        let email = res[3];
        let account = res[4];
        let departmentAddress = res[5];
        let salary = res[6];
        let location = res[7];

        $("#id_output").val(id);
        $("#name_output").val(name);
        $("#location_output").val(location);
        $("#startDate_output").val(startDate);
        $("#email_output").val(email);
        $("#workerAddress_output").val(account);
        $("#departmentAddress_output").val(departmentAddress);
        $("#salary_output").val(salary);
    }); 
}
