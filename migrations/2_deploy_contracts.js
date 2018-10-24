var Toolkit = artifacts.require("./Toolkit.sol");

module.exports = function(deployer) {
  deployer.deploy(Toolkit).then(() => {
    console.log(`==== Toolkit deployed at address: ${Toolkit.address} ====`)
  })
};
