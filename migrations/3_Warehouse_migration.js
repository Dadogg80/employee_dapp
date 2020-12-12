const Warehouse = artifacts.require("Warehouse");

module.exports = function (deployer) {
  deployer.deploy(Warehouse);
};
