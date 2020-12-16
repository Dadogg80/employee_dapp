
var web3 = new Web3(Web3.givenProvider);
var instance;
var admin; 
var smartContract = "0xc612E4ED037DEFef6746a5DF3a9F1a763C284FB9";


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
    /*
    var config = {
        value: web3.utils.toWei("1", "ether")
    }
    */
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
        
        $("#id_output").text(res[0]);
        $("#name_output").text(res[1]);
       //$("#gender_output").text(res[]);
        $("#dateOfBirth_output").text(res[2]);
        $("#email_output").text(res[3]);
        $("#workerAddress_output").text(res[4]);
       // $("#departmentAddress_output").text(res.data.departmentAddress);
       // $("#salary_output").text(res.data.salary);
    })
}
