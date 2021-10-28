import { test as base } from '@playwright/test'
import { Browser } from 'playwright'
import { Authentication } from '../page-objects/authentication'
import { UserForms } from '../page-objects/identity-forms'
import { Dso } from '../page-objects/issuance'

import { kyc } from '../selectors/kyc-form'
import { issuance } from '../selectors/issuance'

export const test = base.extend<{
  dso: Dso
  auth: Authentication
  kycForms: UserForms
  kycSelectors: any
  issuanceSelectors: any
}>({
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

  kycSelectors: async ({ page }, use) => {
    await use(kyc)
  },

  issuanceSelectors: async ({ page }, use) => {
    await use(issuance)
  }
})
