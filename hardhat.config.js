require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

 module.exports = {
  
  solidity: "0.8.10",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/ec728920c04c4ad0a9aa987595f7425a",
      accounts: [`122a0caab7d77e0540a66eefe1371bb7482bc11ce608726f78e3e6a879f0db66`],
  }
  }
}
























// /** @type import('hardhat/config').HardhatUserConfig */
// require("@nomiclabs/hardhat-Waffle");
// require("@nomiclabs/hardhat-etherscan");
// const dotenv = require('dotenv');
// dotenv.config();

// module.exports = {
//   solidity: {
//     compilers: [
//       {
//         version: '0.8.9',
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 1000,
//           },
//         }
//       },
//     ]
//   },
//   networks: {
//     rinkeby: {
//       url: process.env.RPC_URL,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API,
//   }
// };
