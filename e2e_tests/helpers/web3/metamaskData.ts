import * as process from "process";

export const metamaskWallet = {
  ethAddress: process.env.METAMASK_ETH_ADDRESS,
  privateKey: process.env.METAMASK_PRIVATE_KEY
};
