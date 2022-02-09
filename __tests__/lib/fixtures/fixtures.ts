import { test as base, expect } from '@playwright/test'
import { Authentication } from '../page-objects/authentication'
import { Admin } from '../page-objects/admin'
import { BankAccounts } from '../page-objects/accounts'
import { Authorizer } from '../page-objects/authorizer'
import { UserForms } from '../page-objects/identity-forms'
import { Dso, Listing } from '../page-objects/issuance'
import { kyc } from '../selectors/kyc-form'
import { issuance } from '../selectors/issuance'
import { invest } from '../selectors/invest'
import { Invest } from '../page-objects/investments'

import { text } from '../helpers/text'
export const test = base.extend<{
  admin: Admin
  investment: Invest
  textHelper: any
  dso: Dso
  auth: Authentication
  listing: Listing
  kycForms: UserForms
  kycSelectors: any
  issuance: any
  invest: any
  bankAccount: BankAccounts
  authorizer: Authorizer
  page2: any
}>({
  admin: async ({ page }, use) => {
    const adminObj = new Admin(page)
    await use(adminObj)
  },

  authorizer: async ({ page }, use) => {
    const authorizer = new Authorizer(page)
    await use(authorizer)
  },

  bankAccount: async ({ page }, use) => {
    const bankAccount = new BankAccounts(page)
    await use(bankAccount)
  },
  investment: async ({ page }, use) => {
    const investment = new Invest(page)
    await use(investment)
  },

  auth: async ({ page }, use) => {
    const auth = new Authentication(page)
    await use(auth)
  },

  kycForms: async ({ page }, use) => {
    const kyc = new UserForms(page)
    await use(kyc)
  },

  dso: async ({ page }, use) => {
    const dso = new Dso(page)
    await use(dso)
  },

  listing: async ({ page }, use) => {
    const listing = new Listing(page)
    await use(listing)
  },

  kycSelectors: async ({ page }, use) => {
    await use(kyc)
  },

  issuance: async ({ page }, use) => {
    await use(issuance)
  },
  textHelper: async ({ page }, use) => {
    await use(text)
  },
  invest: async ({ page }, use) => {
    await use(invest)
  },
  page2: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page2 = await context.newPage()
    await use(page2)
  }
})
export { expect }
