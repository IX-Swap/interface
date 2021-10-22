import { authForms } from "../selectors/auth";
import { baseCreds } from "../helpers/creds";
import { userRegistration } from "../helpers/api";

// import { userRegistration } from "../helpers/api-helpers";

import {
  click,
  typeText,
  getLinkToConfirmRegistration,
  navigate,
} from "../helpers/helpers";

class Authentication {
  page: any;
  constructor(page) {
    this.page = page;
  }

  login = async (email, password) => {
    await typeText(authForms.fields.EMAIL, email, this.page);
    await typeText(authForms.fields.PASSWORD, password, this.page);
    await click(authForms.buttons.LOGIN, this.page);
  };
  // logout = async () => {
  //   await click(authForms.buttons.LOGOUT, this.page);
  //   // await shouldExist(authForms.fields.EMAIL, this.page);
  // };

  async submitRegistrationForm(email) {
    const finishLoad = this.page.waitForNavigation();
    await click(authForms.buttons.REGISTRATION, this.page);
    await typeText(authForms.fields.NAME, "email", this.page);
    await typeText(authForms.fields.EMAIL, email, this.page);
    await typeText(authForms.fields.PASSWORD, baseCreds.PASSWORD, this.page);
    await click(authForms.buttons.AGREE, this.page);
    await click(authForms.buttons.SUBMIT, this.page);
    await finishLoad;
    const confirmLink = await getLinkToConfirmRegistration(email, this.page);
    await navigate(confirmLink, this.page);
  }

  async submitRegistrationFormByAPI(email) {
    await userRegistration(email);
    const confirmLink = await getLinkToConfirmRegistration(email, this.page);
    await navigate(confirmLink, this.page);
    await this.login(email, baseCreds.PASSWORD);
  }

  // async visitAndLogin(page = this.page, url, email, password) {
  //   await page.goto(url, { waitUntil: "networkidle" });
  //   try {
  //     await page.waitForSelector(this.EMAIL_FIELD);
  //   } catch {
  //     await page.reload();
  //   }
  //   await typeText(this.EMAIL_FIELD, email, page);
  //   await typeText(this.PASSWORD_FIELD, password, page);
  //   await page.click(this.SUBMIT_BUTTON);

  //   try {
  //     await page.waitForSelector(this.COOKIES_BUTTON, { timeout: 50000 });
  //     await click(this.COOKIES_BUTTON, page);
  //   } catch {
  //     throw new Error("Do not find cookies");
  //   }
  // }

  // async logOut(page = this.page) {
  //   await page.reload();
  //   await click(this.AVATAR_IMG, page);
  //   await click(this.LOGOUT_BUTTON, page);
  //   try {
  //     await page.waitForSelector(this.SUBMIT_BUTTON);
  //   } catch {
  //     throw new Error(`Login page not displayed`);
  //   }
  // }

  // async submitRegistrationFormWithOutLink(page = this.page, email, password) {
  //   const finishLoad = page.waitForNavigation();
  //   await click(this.REGISTRATION_BUTTON, page);
  //   await typeText(this.EMAIL_FIELD, email, page);
  //   await typeText(this.PASSWORD_FIELD, password, page);
  //   await typeText(this.CONFIRM_PASSWORD_FIELD, password, page);
  //   await click(this.SUBMIT_BUTTON, page);
  //   await finishLoad;
  //   try {
  //     await page.waitForSelector(this.COOKIES_BUTTON, { timeout: 50000 });
  //     await click(this.COOKIES_BUTTON, page);
  //   } catch {
  //     throw new Error("Do not find cookies");
  //   }
  // }

  // async forgotPasswordNegative(page = this.page, dashboard, email) {
  //   await page.goto(dashboard + text.forgotPass, {
  //     waitUntil: "networkidle",
  //   });
  //   await typeText(this.EMAIL_FIELD, email, page);
  //   await click(this.SUBMIT_BUTTON, page);
  // }

  // async checkError(page, expect, sum) {
  //   const errors = await getCount(page, this.ERROR_NOTIFICATION);
  //   expect(errors).to.be.equal(sum);
  // }

  // async submitLoginNegativeForm(page = this.page, dashboard, email, password) {
  //   await page.goto(dashboard, { waitUntil: "networkidle" });
  //   await typeText(this.EMAIL_FIELD, email, page);
  //   await typeText(this.PASSWORD_FIELD, password, page);
  //   await page.click(this.SUBMIT_BUTTON, {
  //     force: true,
  //     waitUntil: "domcontentloaded",
  //   });
  // }

  // async submitRegistrationNegativeForm(
  //   page = this.page,
  //   email,
  //   password,
  //   conf_password
  // ) {
  //   await page.reload();
  //   await typeText(this.EMAIL_FIELD, email, page);
  //   await typeText(this.PASSWORD_FIELD, password, page);
  //   await typeText(this.CONFIRM_PASSWORD_FIELD, conf_password, page);
  //   await page.click(this.SUBMIT_BUTTON, {
  //     force: true,
  //     waitUntil: "domcontentloaded",
  //   });
  // }

  // async resetPassword(page = this.page, email) {
  //   const link = await getLinkToConfirmRegistration(email, "reset", page);
  //   await page.goto(link, { waitUntil: "networkidle" });
  //   await typeText(this.PASSWORD_FIELD, `${text.password}1`, page);
  //   await typeText(this.CONFIRM_PASSWORD_FIELD, `${text.password}1`, page);
  //   await click(this.SUBMIT_BUTTON, page);
  //   await this.submitLoginForm(page, email, `${text.password}1`);
  //   await page.waitForSelector(this.MY_PROFILE_TITLE);
  // }

  // async invalidEmailNotification(page = this.page) {
  //   assert(await page.$(this.INVALID_EMAIL_NOTIFICATION));
  // }

  // async dontMathNotification(page = this.page) {
  //   assert(await page.$(this.DONT_MATCH_NOTIFICATION));
  // }

  // async passwordIncorrectNotification(page = this.page) {
  //   assert(await page.$(this.PASSWORD_INCORRECT_NOTIFICATION));
  // }

  // async checkLogin(page = this.page) {
  //   await page.waitForSelector(this.AVATAR_IMG, { state: "attached" });
  // }

  // async addPasswordToProfile(page = this.page, password, email) {
  //   await page.waitForSelector(`[value="${email}"]`);
  //   const passwordField = await page.waitForSelector(this.PASSWORD_FIELD, {
  //     state: "attached",
  //   });
  //   await passwordField.type(password);
  //   await typeText(this.CONFIRM_PASSWORD_FIELD, password, page);
  //   await click(this.SUBMIT_BUTTON, page);
  //   await waitForText(page, "Activation link was sent to your email.");
  //   const emailField = await page.waitForSelector(this.EMAIL_FIELD, {
  //     state: "attached",
  //   });
  //   await emailField.type(email);
  //   await page.fill(this.PASSWORD_FIELD, password);
  //   await click(this.SUBMIT_BUTTON, page);
  //   await waitForText(
  //     page,
  //     "Your identity must be confirmed first. Check your email for activation link."
  //   );
  // }

  // async checkProgramsPageVisibility(page = this.page) {
  //   if ((await page.$('//*[@href="/programs" and "hiden"]')) === null)
  //     throw new Error(`Programs page displayed`);
  // }

  // async addPassword(password, email, page = this.page) {
  //   await page.waitForSelector(`[value="${email}"]`);
  //   await typeText(this.PASSWORD_FIELD, password, page);
  //   await typeText(this.CONFIRM_PASSWORD_FIELD, password, page);
  //   await click(this.SUBMIT_BUTTON, page);
  //   await this.checkLogin(page);
  // }
}
export { Authentication };
