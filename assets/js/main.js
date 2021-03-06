
var web3 = new Web3(Web3.givenProvider);
var instance;
var admin;
/* Insert your smartcontract address below */
var smartContract = "0x545B8A77ECbB3b2F36A07095c6aEe5CB71CaC422";

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
        instance = new web3.eth.Contract( abi, smartContract, {
          from: accounts[0], 
          gasPrice: '20000000000'
        });
        admin = accounts[0];
        console.log(instance);
        console.log(`Owner account is ${admin}`)
       
        instance.events.allEvents().on('data', (event) => {
            console.log(event);

            let employeeId = event.returnValues.id;
            let name = event.returnValues.name;
            let location = event.returnValues.location;
            let startDate = event.returnValues.startDate;
            let email = event.returnValues.email;
            let account = event.returnValues.account;
            let department = event.returnValues.department;
            let salary = event.returnValues.salary;
            
            $("#employeeEvent").html(
                $(`
                <div class="card card-profile">
                <div class="card-body">
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4>SUCCESS</h4>
                    <p>
                    <ol>
                    <li><strong>EmployeeId :</strong> ${employeeId}.</li>
                    <li><strong>Name :</strong> ${name}.</li>
                    <li><strong>Located :</strong> ${location}.</li>
                    <li><strong>Start date :</strong> ${startDate}.</li>
                    <li><strong>Email :</strong> ${email}.</li>
                    <li><strong>Salary :</strong> ${salary}.</li> 
                    <li><strong>Worker Address :</strong> ${account}.</li>
                    <li><strong>Department :</strong> ${department}.</li> 
                    </ol>
                    </p>
                  </div>
                </div>
              </div>
            `));
        })
        .on('error', console.error); 
    }).then( () => {

    var index;        

        for (index = 0; index <= 10; index++) {
            instance.methods.getEmployee(index).call().then(function(res) {      
                console.log("getEmployee is called");    
                console.log(res);

                let id = res[0];
                let name = res[1];
                let salary = res[6];
                let location = res[7];
                
                console.log(id, name, salary, location);

                $("#table_output").append(
                    $(`<tr></tr>`).html(`
                    <td>${id}</td>
                    <td>${name}</td>
                    <td class="text-primary">$${salary}</td>
                    <td>${location}</td>
                    `)      
                );
        
            });
        }

    });
   

    $("#add_data_button").on("click", inputData);
    $("#get_data_button").on("click", fetchAndDisplay);

});


function inputData() {

    var first = $("#first_input").val();
    var last = $("#last_input").val();
    var name = (`${first} ${last}`);
    var located = $("#location_input").val();
    var startDate = $("#startDate_input").val();
    var email = $("#email_input").val();
    var workerAddress = $("#account_input").val();
    var departmentAddress = $("#department_input").val();
    var salary = $("#salary_input").val();
    
    console.log(name, located, startDate, email, salary, workerAddress, departmentAddress)

    instance.methods.createEmployee(name, located, startDate, email, workerAddress, departmentAddress, salary).send({}, function(error, txHash){
        if(error){
            console.warn(error);
        }
        else{
            console.log(txHash);
            console.log(`New Worker: ${workerAddress} is connected to department address ${departmentAddress}.`);
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
        $("#account_output").val(account);
        $("#departmentAddress_output").val(departmentAddress);
        $("#salary_output").val(salary);
        
    }); 

}
