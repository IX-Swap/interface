import { authForms } from '../selectors/auth'
import { baseCreds } from '../helpers/creds'
import { userRegistration } from '../helpers/api'
import { text } from '../helpers/text'

import {
  click,
  typeText,
  getMessage,
  navigate,
  waitForText,
  shouldExist
} from '../helpers/helpers'

class Authentication {
  page: any
  constructor(page) {
    this.page = page
  }
  confirmation = async email => {
    const re = /https:[\'"]?([^\'" >]+\d+\w+)/g
    const message = await getMessage(email, this.page)
    const confirmLink = message.htmlBody.match(re)[0]
    await navigate(confirmLink, this.page)
  }

  loginWithout2fa = async (email, password, page = this.page) => {
    await typeText(authForms.fields.EMAIL, email, page)
    await typeText(authForms.fields.PASSWORD, password, page)
    await click(authForms.buttons.LOGIN, page)
    await shouldExist(authForms.buttons.PROFILE_VIEW, page)
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
    await this.confirmation(email)
  }

  submitRegistrationFormByAPI = async email => {
    const resp = await userRegistration(email)
    await this.confirmation(email)
    await this.login(email, baseCreds.PASSWORD)
    return resp
  }

  resetPassword = async email => {
    await click(authForms.buttons.FORGOT, this.page)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await click(authForms.buttons.SUBMIT, this.page)
    await this.confirmation(email)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(
      authForms.fields.NEW_PASSWORD,
      baseCreds.PASSWORD_RESET,
      this.page
    )
    await click(authForms.buttons.SUBMIT, this.page)
    await waitForText(this.page, text.notification.resetPassword)
  }

  signOut = async () => {
    await click(authForms.buttons.PROFILE_VIEW, this.page)
    await click(authForms.buttons.SIGN_OUT, this.page)
    await this.page.waitForURL(`${baseCreds.URL}auth/sign-in`)
  }
}
export { Authentication }
