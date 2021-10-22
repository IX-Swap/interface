import { includes } from 'lodash/includes'
import { authForms } from '../selectors/auth'
import { baseCreds } from '../helpers/creds'
import { userRegistration } from '../helpers/api'

// import { userRegistration } from "../helpers/api-helpers";

import {
  click,
  typeText,
  getLinkToConfirmRegistration,
  navigate
} from '../helpers/helpers'

class Authentication {
  page: any
  constructor(page) {
    this.page = page
  }

  login = async (email, password) => {
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(authForms.fields.PASSWORD, password, this.page)
    await click(authForms.buttons.LOGIN, this.page)
    if ([1, 2, 3, 0].includes(0)) {
      console.log('yes')
    }
    // this.page.on('request', request => {
    //   if (request.url().includes('.mozork.com/auth/profiles/'))
    //   console.log(request.url())

    // });
  }

  async submitRegistrationForm(email) {
    const finishLoad = this.page.waitForNavigation()
    await click(authForms.buttons.REGISTRATION, this.page)
    await typeText(authForms.fields.NAME, 'email', this.page)
    await typeText(authForms.fields.EMAIL, email, this.page)
    await typeText(authForms.fields.PASSWORD, baseCreds.PASSWORD, this.page)
    await click(authForms.buttons.AGREE, this.page)
    await click(authForms.buttons.SUBMIT, this.page)
    await finishLoad
    const confirmLink = await getLinkToConfirmRegistration(email, this.page)
    await navigate(confirmLink, this.page)
  }

  async submitRegistrationFormByAPI(email) {
    console.log(email)
    await userRegistration(email)
    const confirmLink = await getLinkToConfirmRegistration(email, this.page)
    await navigate(confirmLink, this.page)
    await this.login(email, baseCreds.PASSWORD)
  }
}
export { Authentication }
