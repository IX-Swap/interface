import fetch from 'node-fetch';
import {promisify} from "util";
import {pipeline} from "stream";
import {createWriteStream} from "fs";

export const downloadFile = async (link, pathToSave) => {
  const streamPipeline = promisify(pipeline);
  const response = await fetch(link);

  if (!response.ok) throw new Error(`Downloading of file failed - ${response.status} ${response.statusText}`);

  await streamPipeline(response.body, createWriteStream(pathToSave))
};
