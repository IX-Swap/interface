import { authForms } from '../selectors/auth'
import { baseCreds } from '../helpers/creds'
import { userRegistration } from '../helpers/api'
import { text } from '../helpers/text'

// import { userRegistration } from "../helpers/api-helpers";

import {
  click,
  typeText,
  getLinkToConfirmRegistration,
  navigate,
  waitForText
} from '../helpers/helpers'

class Authentication {
  page: any
  constructor(page) {
    this.page = page
  }

  loginWithout2fa = async (email, password) => {
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(authForms.fields.PASSWORD, password, this.page)
    await click(authForms.buttons.LOGIN, this.page)
  }

  login = async (email, password) => {
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(authForms.fields.PASSWORD, password, this.page)
    await click(authForms.buttons.LOGIN, this.page)
    //2FA
    await click(authForms.buttons.TWO_FA, this.page)
    for (let _ of [1, 2, 3]) {
      await click(authForms.buttons.NEXT, this.page)
    }
    const code = await this.page.$$('input')
    for (const digit of code) {
      await digit.fill('1')
    }
    await click(authForms.buttons.ENABLE, this.page)
  }

  submitRegistrationForm = async email => {
    const finishLoad = this.page.waitForNavigation()
    await click(authForms.buttons.REGISTRATION, this.page)
    await typeText(authForms.fields.NAME, 'testName', this.page)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(authForms.fields.PASSWORD, baseCreds.PASSWORD, this.page)
    await click(authForms.buttons.AGREE, this.page)
    await click(authForms.buttons.SUBMIT, this.page)
    await finishLoad
    const confirmLink = await getLinkToConfirmRegistration(email, this.page)
    await navigate(confirmLink, this.page)
  }

  submitRegistrationFormByAPI = async email => {
    await userRegistration(email)
    const confirmLink = await getLinkToConfirmRegistration(email, this.page)
    await navigate(confirmLink, this.page)
    await this.login(email, baseCreds.PASSWORD)
  }

  resetPassword = async email => {
    await click(authForms.buttons.FORGOT, this.page)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await click(authForms.buttons.SUBMIT, this.page)
    const link = await getLinkToConfirmRegistration(email, this.page)
    await navigate(link, this.page)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(
      authForms.fields.NEW_PASSWORD,
      baseCreds.PASSWORD_RESET,
      this.page
    )
    await click(authForms.buttons.SUBMIT, this.page)
    await waitForText(this.page, text.notification.resetPassword)
  }
}
export { Authentication }
