const contractName = "adv1.liv1.testnet";
//'dev-1635425543381-88447653838944';

module.exports = function getConfig() {
  let config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    // walletUrl: 'http://localhost:1234',
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    contractName,
  };

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      explorerUrl: "https://explorer.testnet.near.org",
      ...config,
      GAS: "200000000000000",
      DEFAULT_NEW_ACCOUNT_AMOUNT: "5",
      DEFAULT_NEW_CONTRACT_AMOUNT: "5",
      GUESTS_ACCOUNT_SECRET:
        "7UVfzoKZL4WZGF98C3Ue7tmmA6QamHCiB1Wd5pkxVPAc7j6jf3HXz5Y9cR93Y68BfGDtMLQ9Q29Njw5ZtzGhPxv",
      contractMethods: {
        changeMethods: [],
        viewMethods: ["all_banner"],
      },
      marketDeposit: "100000000000000000000000",
      //"market." +
      marketId: contractName,
    };
  }

  if (process.env.REACT_APP_ENV === "prod") {
    config = {
      ...config,
      networkId: "mainnet",
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      contractName: "near",
    };
  }

  return config;
};
