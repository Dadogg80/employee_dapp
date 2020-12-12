var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0x7Cb601f335ad48EAd8DAc4c636b13D251f5e7fA9", {from: accounts[0]});
      console.log(contractInstance);
    });
    $("#add_data_button").click(inputData)
    $("#get_data_button").click(fetchAndDisplay)
});

function inputData() {
    var name = $("#name_input").val();
    var age = $("#age_input").val();
    var height = $("#height_input").val();

    var config = {
        value: web3.utils.toWei("1", "ether")
    }

    contractInstance.methods.createPerson(name, age, height).send(config)
    .on("transactionHash", function(hash) {
        console.log(hash);
    })
    .on("confirmation", function(confirmationNr) {
        console.log(confirmationNr);
    })
    .on("receipt", function(receipt) {
        console.log(receipt)
        alert("Done.");
    })
}

function fetchAndDisplay(){
    contractInstance.methods.getPerson().call().then(function(res) {
        console.log(res);
        $("#name_output").text(res.name);
        $("#age_output").text(res.age);
        $("#height_output").text(res.height);
    })
}
