import {expect} from "@playwright/test";

const gmail = require("gmail-tester");
const path = require("path");
const moment = require('moment');

export const getEmailMessage = async (options) => {
  return await gmail.check_inbox(
    path.resolve(__dirname, "credentials.json"),
    path.resolve(__dirname, "token.json"),
    options
  );
};

export const exampleOfLetter = async (email, name) => {
  await getEmailMessage({
    subject: "Greetings",
    from: 'test@email.com',
    to: email,
    wait_time_sec: 2,
    max_wait_time_sec: 30,
    include_body: true,
    after: moment().subtract(30, 'seconds')
  }).then(registrationLetter => {
    expect(registrationLetter[0]).not.toBeNull();
    expect(registrationLetter[0].body.html.toString()).toMatch(`Hello ${name}`);
  });
};
