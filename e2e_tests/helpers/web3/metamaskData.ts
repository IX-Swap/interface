import * as process from "process";

require('dotenv').config();

module.exports = {
  ethAddress: process.env.METAMASK_ETH_ADDRESS,
  privateKey: process.env.METAMASK_PRIVATE_KEY
};
