import { kyc } from "../lib/selectors/kyc-form";
import { baseCreds } from "../lib/helpers/creds";
import { test } from "../lib/fixtures/fixtures";
import {
  emailCreate,
  click,screenshotMatching,waitForResponseInclude
} from "../lib/helpers/helpers";


test.afterEach(async ({ page, context }, testInfo) => {
  await page.close();
});


test.describe('Create Identity', () => {
  let forEachEmail = emailCreate();
  test.beforeEach(async ({ page, baseURL, auth }, testInfo) => {
    await auth.submitRegistrationFormByAPI(forEachEmail);
  });

test("Check individual identity", async ({ page, kycForms },testInfo) => {
  await test.step('Personal Information ', async () => {
    await click(kyc.type.INDIVIDUAL, page);
    await kycForms.fillPersonalInformationForm();
    await kycForms.fillAddressForm();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Financial Information', async () => {
    await kycForms.fillFinancialInformation();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Tax Declaration', async () => {
    await kycForms.fillTaxDeclaration();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Investor Status Declaration', async () => {
    await kycForms.investorStatusDeclaration();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Upload Documents', async () => {
    await kycForms.uploadDocuments();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Check full profile view', async () => {
    await page.waitForSelector(kyc.USER_PHOTO)
    const elementHandle = await page.$('//form');
    await screenshotMatching("profile view" ,elementHandle);
  });
});


test("Check Corporate identity", async ({ page, kycForms },testInfo) => {
  await test.step('fill Personal Information Form', async () => {
    await click(kyc.type.CORPORATE, page);
    await kycForms.fillCorporateInformation();
    await kycForms.fillCorporateAddressForm();
    await kycForms.fillCompanyAuthorizedPersonnel()
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Directors and Beneficial Owner Details', async () => {
    await kycForms.fillPeopleWithExecutiveAuthorityForm()
    await kycForms.fillCorporateDirectorAddressForm();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('fill Tax declaration form', async () => {
    await kycForms.fillTaxDeclarationForm();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Investor Status Declaration', async () => {
    await kycForms.investorStatusDeclaration();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Upload Documents', async () => {
    await kycForms.uploadCorporateDocuments();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Check full profile view', async () => {
    await page.waitForSelector(kyc.USER_PHOTO)
    const elementHandle = await page.$('//form');
    await screenshotMatching("corporate profile view" ,elementHandle);
  });
});
test("Check Issuer identity", async ({ page, kycForms },testInfo) => {
  await test.step('fill Personal Information Form', async () => {
    await click(kyc.type.ISSUER, page);
    await kycForms.fillIssuerDetails();
    await kycForms.fillCorporateAddressForm();
    await kycForms.fillCompanyAuthorizedPersonnel()
    await click(kyc.buttons.SUBMIT, page);
  });
  await test.step('Directors and Beneficial Owner Details', async () => {
    await kycForms.fillPeopleWithExecutiveAuthorityForm()
    await kycForms.fillCorporateDirectorAddressForm();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('fill Tax declaration form', async () => {
    await kycForms.fillTaxDeclarationForm();
    await click(kyc.buttons.SUBMIT, page);
  });

  await test.step('Upload Documents', async () => {
    await kycForms.uploadCorporateDocuments();
    await click(kyc.buttons.SUBMIT, page);
  });
  await page.waitForTimeout(10000)

});

});
