import {downloadMetamask} from "../extensions/exensionsHelpers";
import * as fs from "fs";
require('dotenv').config();

const pathToDownloadMetamask = './extensions/metamask.zip';
const pathToExtractedMetamask = './extensions/metamask';

async function globalSetup() {
  console.log(process.env);

  const metamaskExists = await fs.existsSync(pathToExtractedMetamask);

  if (!metamaskExists) {
    await downloadMetamask(pathToDownloadMetamask);
  }
}

export default globalSetup;

