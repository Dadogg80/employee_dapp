const Employees = artifact.require("Employees");

contract("Employees", async accounts => {
    it("should deploy the contract", async () => {
        let instance = await Employees.deployed();
        
    })
})