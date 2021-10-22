import { test as base } from "@playwright/test";
import { Browser } from "playwright";
import { Authentication } from "../page-objects/authentication";
import { UserForms } from "../page-objects/forms";
import { kyc } from "../selectors/kyc-form";

export const test = base.extend<{
  auth: Authentication;
  kycForms: UserForms;
  kycSelectors: any;
}>({
  auth: async ({ page }, use) => {
    const auth = new Authentication(page);
    await use(auth);
  },

  kycForms: async ({ page }, use) => {
    const kyc = new UserForms(page);
    await use(kyc);
  },
  kycSelectors: async ({ page }, use) => {
    await use(kyc);
  },
});
