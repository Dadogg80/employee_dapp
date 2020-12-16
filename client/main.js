
var web3 = new Web3(Web3.givenProvider);
var instance;
var admin; 
var smartContract = "0xdEaA6F35065B712a86E89ED4B026771eb35ecf72";


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

            let employeeId = event.returnValues.employeeId;
            let name = event.returnValues.name;
            let gender = event.returnValues.gender;
            let dateOfBirth = event.returnValues.dateOfBirth;
            let email = event.returnValues.email;
            let workerAddress = event.returnValues.workerAddress;
            let departmentAddress = event.returnValues.departmentAddress;
            let salary = event.returnValues.salary;
            $("#workerCreation").css("display", "block");
            $("#workerCreation").text(`EmployeeId : ${employeeId}. Name : ${name}.\n
            Gender : ${gender}. Date Of Birth : ${dateOfBirth}. Email : ${email}.\n
            Salary : ${salary}. Worker Address : ${workerAddress}.\n
            Department Address : ${departmentAddress}. `);
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
    var _gender = $("#gender_input").val();
    var _dateOfBirth = $("#dateOfBirth_input").val();
    var _email = $("#email_input").val();
    var _workerAddress = $("#workerAddress_input").val();
    var _departmentAddress = $("#departmentAddress_input").val();
    var _salary = $("#salary_input").val();
    
    console.log(_name, _gender, _dateOfBirth, _email, _salary, _workerAddress, _departmentAddress)

    instance.methods.createWorker(_name, _gender, _dateOfBirth, _email, _workerAddress, _salary, _departmentAddress).send({}, function(error, txHash){
        if(error){
            console.warn(error);
        }
        else{
            console.log(txHash);
            console.log(`New worker ${_workerAddress} is connected to department address ${_departmentAddress}.`);
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
    var _workerAddress = $("#getWorkerAddress_input").val();
    console.log(_workerAddress);

    instance.methods.getEmployee(_workerAddress).call().then( function(res) {
        console.log('Button Pushed!');
        console.log(res);    
        let id = res[0];
        let name = res[1];
        let dateOfBirth = res[2];
        let email = res[3];
        let workerAddress = res[4];
        /*
        let departmentAddress = res[5];
        let salary = res[6];
        let gender = res[7];
        */

        $("#id_output").val(id);
        $("#name_output").val(name);
        $("#dateOfBirth_output").val(dateOfBirth);
        $("#email_output").val(email);
        $("#workerAddress_output").val(workerAddress);
        /*
        $("#gender_output").val(gender);
        $("#departmentAddress_output").val(departmentAddress);
        $("#salary_output").val(salary);
        */
    }); 
}
