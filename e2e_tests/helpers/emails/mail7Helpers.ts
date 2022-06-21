import fetch from 'node-fetch';
import {delay} from "../utils";

const baseUrl = 'https://api.mail7.io';

const keys = {
  apikey: process.env.MAIL7_API_KEY,
  apisecret: process.env.MAIL7_API_SECRET
};

const requestOptions = {
  headers: {
    Accept: 'application/json',
  },
};

export type Email = {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

// Retrieve the first email from inbox and delete it right away
export const getLatestEmail = async (email: string, subject: string): Promise<Email> => {
  const queryParams = new URLSearchParams({ ...keys, to: email.split('@')[0], domain: email.split('@')[1]}).toString();
  const url = `${baseUrl}/inbox?${queryParams}`;
  let triesLeft = 20;

  do {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const body = await response.json();
      if (body.data.length > 0) {
        let letter = body.data.find(o => o.mail_source.subject === subject);
        const mesId = letter._id;
        const rawEmail = letter.mail_source;
        await deleteEmail(mesId);
        return {
          from: rawEmail.from.value[0].address,
          to: rawEmail.to.value[0].address,
          subject: rawEmail.subject,
          text: rawEmail.text,
          html: rawEmail.html,
        }
      }
      await delay(1000)
    } else {
      throw new Error(`[API] could not read emails: ${response.status} ${response.statusText}`)
    }
    triesLeft--
  } while (triesLeft);
  throw new Error(`[API] inbox is empty for ${email}`)
};

export const deleteEmail = async (id: string) => {
  const queryParams = new URLSearchParams({ ...keys, mesid: id }).toString();
  const url = `${baseUrl}/delete?${queryParams}`;
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`[API] could not delete email: ${response.status} ${response.statusText}`)
  }
};

export const deleteAllEmails = async (email: string) => {
  const queryParams = new URLSearchParams({ ...keys, to: email.split('@')[0], domain: email.split('@')[1]}).toString();
  const url = `${baseUrl}/inbox?${queryParams}`;
  const response = await fetch(url, requestOptions);

  if (response.ok) {
    const body = response.data;
    const lettersCount = Object.keys(body.data).length;
    for (let i = 0; i < lettersCount; i++) {
      await deleteEmail(body.data[i]._id);
    }
  }
  else {
    throw new Error(`[API] could not read emails: ${response.status} ${response.statusText}`)
  }
};
