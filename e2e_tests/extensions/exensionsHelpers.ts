import {downloadFile} from "../helpers/api/downloadFile";
const extract = require('extract-zip');

const metamaskLink = 'https://github.com/MetaMask/metamask-extension/releases/download/v10.15.0/metamask-chrome-10.15.0.zip';

export const downloadMetamask = async (pathToSaveMetamask: string) => {
  await downloadFile(metamaskLink, pathToSaveMetamask);
  await extract(pathToSaveMetamask, { dir: __dirname + '/metamask'});
};
