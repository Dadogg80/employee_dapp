const Employees = artifacts.require("Employees");

module.exports = function (deployer) {
  deployer.deploy(Employees);
};
