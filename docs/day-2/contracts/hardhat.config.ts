import { task, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";

const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY as `0x${string}`;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      evmVersion: "shanghai",
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  networks: {
    // ✅ LOCAL HARDHAT NODE (TANPA PRIVATE KEY)
    localhost: {
      url: "http://127.0.0.1:8545",
    },

    // ✅ AVALANCHE FUJI TESTNET (PAKAI PRIVATE KEY)
    avalancheFuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: USER_PRIVATE_KEY ? [USER_PRIVATE_KEY] : [],
    },
  },

  sourcify: {
    enabled: true,
  },
};

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.viem.getWalletClients();
  for (const account of accounts) {
    console.log(account.account.address);
  }
});

export default config;
