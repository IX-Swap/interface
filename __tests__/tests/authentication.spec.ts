import { kyc } from "../lib/selectors/kyc-form";
import { baseCreds } from "../lib/helpers/creds";
import { test } from "../lib/fixtures/fixtures";
import { navigate, emailCreate, shouldExist } from "../lib/helpers/helpers";
let forEachEmail = emailCreate();
test.beforeEach(async ({ page, baseURL, auth }, testInfo) => {
  await navigate(baseCreds.URL, page);
});
test.afterEach(async ({ page, context }, testInfo) => {
  await page.close();
});

test("Check login", async ({ page, auth }) => {
  await auth.login(baseCreds.EMAIL, baseCreds.PASSWORD);
  await shouldExist(kyc.type.INDIVIDUAL, page);
});

test("Check Registration", async ({ page, auth }) => {
  await auth.submitRegistrationForm(forEachEmail);
  await auth.login(forEachEmail, baseCreds.PASSWORD);
  await shouldExist(kyc.type.INDIVIDUAL, page);
});
