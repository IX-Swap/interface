import { authForms } from '../selectors/auth'
import { baseCreds } from '../helpers/creds'
import { userRegistration } from '../api/api'
import { text } from '../helpers/text'

import { click, typeText, getMessage, navigate, waitForText, shouldExist, emailCreate } from '../helpers/helpers'

class Authentication {
  page: any
  constructor(page) {
    this.page = page
  }
  confirmation = async email => {
    const re = /https:[\'"]?([^\'" >]+\d+\w+)/g
    const message = await getMessage(email)
    let confirmLink = message.htmlBody.match(re)[0]
    if (baseCreds.URL?.includes('otc')) {
      confirmLink = confirmLink.replace('dev', 'otc')
    }
    return confirmLink
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
    const confirmLink = await this.confirmation(email)
    await navigate(confirmLink, this.page)
  }

  submitRegistrationFormByAPI = async (login = true) => {
    let email = await emailCreate()
    const resp = await userRegistration(email)
    console.log(resp)
    const confirmLink = await this.confirmation(email)
    if (login === true) {
      await navigate(confirmLink, this.page)
      // await this.login(email, baseCreds.PASSWORD)
      await this.loginWithout2fa(email, baseCreds.PASSWORD)
    }
    return { resp, email }
  }

  resetPassword = async email => {
    const passwordForReset = emailCreate()
    await click(authForms.buttons.FORGOT, this.page)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await click(authForms.buttons.SUBMIT, this.page)
    const confirmLink = await this.confirmation(email)
    await navigate(confirmLink, this.page)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(authForms.fields.NEW_PASSWORD, passwordForReset, this.page)
    await click(authForms.buttons.SUBMIT, this.page)
    await waitForText(this.page, text.notification.resetPassword)
    return passwordForReset
  }

  signOut = async () => {
    await click(authForms.buttons.PROFILE_VIEW, this.page)
    await click(authForms.buttons.SIGN_OUT, this.page)
    await this.page.waitForURL(`${baseCreds.URL}auth/sign-in`)
  }
}
export { Authentication }
