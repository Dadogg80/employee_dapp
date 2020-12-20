import truffleAssert from 'truffle-assertions';
const Employees = artifacts.require("Employees");

const department = "0x1bE21d22f40de95150c80f0761C98d99a390298C";
const worker1 = "0x34f213A881b4D01cfBfEc9e8D55185E3A3fF92E3";
const worker2 = "0x17BCd7378a9d6025ffACd9C91286a71B6ae08209";

contract("Employees", async (accounts) => {
    it("should create a first new employee", async () => {
        let instance = await Employees.deployed();
        let employee = await instance.createEmployee("Ivo", "NORWAY", 10102020, "email@email.com", worker1, department, 10);
        assert(employee == 0);
    });
    it("should create a second new employee", async () => {
        let instance = await Employees.deployed();
        let employee = await instance.createEmployee("Sienna", "NORWAY", 10102020, "test@email.com", worker2, department, 20);
        assert(employee == 1);
    });

});


/* 
await truffleAssert.fails(instance.createWorker("Ivo", "NORWAY", 10102020, "email@email.com", worker1, department, 10, {}));

*/