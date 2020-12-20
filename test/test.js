const Employees = artifacts.require("Employees");

contract("Employees", async (accounts) => {
    it("should create a new employee", async () => {
        let instance = await Employees.deployed();
        let employee = await instance.createEmployee("Ivo", "NORWAY", 10102020, "email@email.com", "0x34f213A881b4D01cfBfEc9e8D55185E3A3fF92E3", "0x1bE21d22f40de95150c80f0761C98d99a390298C", 10);
        let result = await instance.getEmployee(0);
        assert(employee == 0);
    });
    it("should create a new employee", async () => {
        let instance = await Employees.deployed();
        let employee = await instance.createEmployee("Sienna", "NORWAY", 10102020, "test@email.com", "0x17BCd7378a9d6025ffACd9C91286a71B6ae08209", "0x1bE21d22f40de95150c80f0761C98d99a390298C", 20);
        let result = await instance.getEmployee(1);
        assert(employee == 1);
    });

});