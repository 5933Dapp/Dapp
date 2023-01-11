var Simple = artifacts.require("./Simple.sol");
 
module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Simple);
};