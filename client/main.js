
var web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
var instance;

/*const givenProvider = 'wss://eth-kovan.ws.alchemyapi.io/v2/ClLuoVQfud0kjTEcmSREUloGeHxmVRx2'; 

const ganache = "HTTP://127.0.0.1:7545";
*/

const smartContract = "0x95C7d76285a8DC24354149Dd59D68fd42e07ffd3";

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
      let instance = new web3.eth.Contract( abi, smartContract, {
          from: accounts[0], 
          gasPrice: '20000000000'
        });
      
        console.log('This is the instance :', instance);
        web3.eth.getAccounts(console.log);
        myContract.events.allEvents();
        
        instance.events.employeeCreated().on('data', function(event){
            console.log(`this is ${events}`);

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
    console.log(`My contract: ${instance}`);
    alert('Stage 1 is ready.');
});



function inputData() {
    var _name = $("#name_input").val();
    var _gender = $("#gender_input").val();
    var _dateOfBirth = $("#dateOfBirth_input").val();
    var _email = $("#email_input_input").val();
    var _workerAddress = $("#workerAddress_input").val();
    var _departmentAddress = $("#departmentAddress_input").val();
    var _salary = $("#salary_input").val();
    /*
    var config = {
        value: web3.utils.toWei("1", "ether")
    }
    */
    console.log(_name, _gender, _dateOfBirth, _salary)

    instance.methods.createWorker(_name, _gender, _dateOfBirth, _email, _workerAddress, _departmentAddress, _salary).send({}, function(error, txHash){
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

    instance.methods.getWorker(_workerAddress).call().then( function(res) {
        console.log('Button Pushed!');
        console.log(res);
        $("#name_output").text(res.employeeId);
        $("#name_output").text(res.name);
        $("#gender_output").text(res.gender);
        $("#dateOfBirth_output").text(res.dateOfBirth);
        $("#email_output").text(res.email);
        $("#workerAddress_output").text(res.workerAddress);
        $("#departmentAddress_output").text(res.departmentAddress);
        $("#salary_output").text(res.salary);
    })
}
