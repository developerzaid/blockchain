require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  // networks: {
  //   polygon_mumbai: {
  //     chainId: 80001,
  //     url: "https://polygon-mumbai.g.alchemy.com/v2/0awa485pp03Dww2fTjrSCg7yHlZECw-K",
  //     // url: process.env.POLYGON_MUMBAI,
  //     accounts: [
  //       `0x${"YOUR ADDRESS"}`,
  //     ],
  //   },
  // },
  module.exports = {
    // Other configurations...
    
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network ID
      },
      // Other network configurations...
    },
    
    // Other configurations...
    module.exports = {
      // Other configurations...
      
      networks: {
        development: {
          host: "127.0.0.1",
          port: 8545,
          network_id: "*" // Match any network ID
        },
        // Other network configurations...
      },
      
      // Other configurations...
    };
    const MyContract = artifacts.require("MyContract");

    contract("MyContract", (accounts) => {
      let myContractInstance;
    
      before(async () => {
        myContractInstance = await MyContract.deployed();
      });
    
      describe("MyContract Unit Tests", () => {
        it("should not equal", async () => {
          const result = await myContractInstance.getValue();
          assert.notEqual(result, 0, "Value should not be zero");
        });
    
        it("should equal", async () => {
          const result = await myContractInstance.getValue();
          assert.equal(result, 100, "Value should be 100");
        });
      });
    });
// Relevant portion of code showing event and emit functions

        
};
