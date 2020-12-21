const Employees = artifacts.require("Employees");
const truffleAssert = require("truffle-assertions");

const department = "0x1bE21d22f40de95150c80f0761C98d99a390298C";
const worker1 = "0x34f213A881b4D01cfBfEc9e8D55185E3A3fF92E3";
const worker2 = "0x17BCd7378a9d6025ffACd9C91286a71B6ae08209";

contract("Employees", async () => {
    it("should create a first new employee", async () => {
        let instance = await Employees.deployed();
        await instance.createEmployee("Ivo", "Norway", "10102020", "email@email.com", worker1, department, 10);
        let employee = await instance.getEmployee(0);
        assert(employee.id == 0);
    });
    it("should create a second new employee", async () => {
        let instance = await Employees.deployed();
        await instance.createEmployee("Sienna", "Norway", "10102020", "Sienna@email.com", worker2, department, 20);
        
        let employee = await instance.getEmployee(1);
        assert(employee.id == 1);
    });
    it("shouldn't let the worker address and department address be the same address", async () => {
        let instance = await Employees.deployed();
        await truffleAssert.fails(instance.createEmployee("Samuel", "Norway", "21.12.2020", "Samuel@email.com", department, department, 20), truffleAssert.ErrorType.REVERT);
    });
});


/* 
await truffleAssert.fails(instance.createWorker("Ivo", "NORWAY", 10102020, "email@email.com", worker1, department, 10, {}));

*/