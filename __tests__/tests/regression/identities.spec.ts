import { kyc } from '../../lib/selectors/kyc-form'
import { text } from '../../lib/helpers/text'
import { test, expect } from '../../lib/fixtures/fixtures'
import { baseCreds } from '../../lib/helpers/creds'
import { authForms } from '../../lib/selectors/auth'
import { createIdentity, approveIdentity, createCorporateIdentity } from '../../lib/api/create-identities'
import * as individualBody from '../../lib/api/individual-identity'
import * as corporateBody from '../../lib/api/corporate-identity'

import { click, waitForText, navigate, shouldExist, emailCreate, screenshotMatching } from '../../lib/helpers/helpers'
import { accountsTab } from '../../lib/selectors/accounts'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe.parallel('Check identities form', () => {
  test.beforeEach(async ({ auth }) => {
    await auth.submitRegistrationFormByAPI()
  })

  test('Test the ability to Create Individual Identity (IXPRIME-7)', async ({ page, kycForms }) => {
    await test.step('Personal Information ', async () => {
      await click(kyc.type.INDIVIDUAL, page)
      await kycForms.fillPersonalInformationForm()
      await kycForms.fillAddressForm()
      await kycForms.fillFinancialInformation()

      await kycForms.fillTaxDeclaration()

      await click(authForms.buttons.NEXT, page)
    })

    await test.step('Investor Status Declaration', async () => {
      await kycForms.investorStatusDeclaration('individual')
    })

    await test.step('Upload Documents', async () => {
      await kycForms.uploadDocument(kyc.field.corporate.DOCS_INDIVIDUAL)
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Check full profile view', async () => {
      await click(kyc.buttons.SUBMIT_TEXT, page)
      await waitForText(page, text.notification.submitIdentity)
    })
  })
  test('Check the ability to Create Corporate Investor Identity (IXPRIME-336)', async ({ page, kycForms }) => {
    test.setTimeout(220000)
    await test.step('fill Personal Information Form', async () => {
      await click(kyc.type.CORPORATE, page)
      await kycForms.fillCorporateInformation()
      await kycForms.fillCorporateAddressForm()
      await kycForms.fillCompanyAuthorizedPersonnel()
      await kycForms.fillPeopleWithExecutiveAuthorityForm()
      await kycForms.fillCorporateDirectorAddressForm()
      await kycForms.fillTaxDeclarationForm()
    })

    await test.step('Investor Status Declaration', async () => {
      await kycForms.investorStatusDeclaration()
    })

    await test.step('Upload Documents', async () => {
      await kycForms.uploadDocument([kyc.field.EVIDENCE_ACCREDITATION, ...kyc.field.corporate.DOCS_ISSUER])
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Check the form submit', async () => {
      await waitForText(page, text.docs.docBenefitsAddressName)
      await click(kyc.buttons.SUBMIT_TEXT, page)
      await waitForText(page, text.notification.submitIdentity)
    })
  })

  test('Test the ability to extend the Tax Declaration form (IXPRIME-325)', async ({ page, kycForms }) => {
    await test.step('fill Personal Information Form', async () => {
      await click(kyc.type.CORPORATE, page)
      await kycForms.fillCorporateInformation()
      await kycForms.fillCorporateAddressForm()
      await kycForms.fillCompanyAuthorizedPersonnel()
      await kycForms.fillPeopleWithExecutiveAuthorityForm()
      await kycForms.fillCorporateDirectorAddressForm()
    })
    const taxForm = page.locator(kyc.IF_TIN_AVALIABLE)

    await test.step('Addition fields should be added', async () => {
      await click('text="Add more"', page)
      await expect(taxForm).toHaveCount(2)
    })

    await test.step('Addition fields should be deleted', async () => {
      await click('[data-testid="DeleteOutlinedIcon"]', page)
      await expect(taxForm).toHaveCount(1)
    })
  })
  test('Check the "Create identity" notification IXPRIME-151', async ({ page }, testInfo) => {
    await click(accountsTab.ACCOUNTS_SECTION, page)
    await click(accountsTab.BANK_ACCOUNTS, page)
    const dialog = await page.waitForSelector(kyc.DIALOG_VIEW)
    await screenshotMatching(testInfo.title, dialog, page)
  })

  test('Issuer(skip step) IXPRIME-359', async ({ page, kycForms }) => {
    await test.step('fill Personal Information Form', async () => {
      await click(kyc.type.ISSUER, page)
      await kycForms.skipFirstForm()
      await kycForms.fillCorporateInformation()
      await kycForms.fillCorporateAddressForm()
      await kycForms.fillCompanyAuthorizedPersonnel()
      await kycForms.fillPeopleWithExecutiveAuthorityForm()
      await kycForms.fillCorporateDirectorAddressForm()
      await kycForms.fillTaxDeclarationForm()
    })

    await test.step('Upload Documents', async () => {
      await kycForms.uploadDocument(kyc.field.corporate.DOCS_ISSUER)
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Check full profile view', async () => {
      // await kycForms.checkAllViewUsingSnapshot(testInfo.title)
      await click(kyc.buttons.SUBMIT_TEXT, page)
      await waitForText(page, text.notification.submitIdentity)
    })
  })

  test('Issuer (full)', async ({ page, kycForms }, testInfo) => {
    await test.step('fill Personal Information Form', async () => {
      await click(kyc.type.ISSUER, page)
      await kycForms.fillIssuerFirstForm()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Upload Documents', async () => {
      await shouldExist(kyc.form.DOCUMENTS, page)
      await kycForms.uploadDocument([kyc.field.FILES])
      await click(kyc.buttons.SUBMIT, page)
      await kycForms.checkIssuerView(testInfo)
    })
  })

  test('Check FATCA information', async ({ page, kycForms }, testInfo) => {
    await click(kyc.type.INDIVIDUAL, page)
    await click(kyc.buttons.OKAY, page)
    await kycForms.fillPersonalInformationForm()
    await kycForms.fillAddressForm()
    await kycForms.fillFinancialInformation()
    await kycForms.fillTaxDeclaration()
    await click(kyc.buttons.FATCA, page)
    const dialog = await page.waitForSelector(kyc.DIALOG_VIEW)
    await screenshotMatching(testInfo.title, dialog, page)
  })
})

test.describe.parallel('Edit identities form', () => {
  let forEachEmail: any

  test.beforeEach(async ({}) => {
    forEachEmail = emailCreate()
  })

  const corporatesType = 'corporates'

  test('The "Corporate" KYC should be editable (IXPRIME-389)', async ({ kycForms, auth, page }) => {
    const identityResponce = await createCorporateIdentity(forEachEmail, corporatesType, corporateBody)
    await approveIdentity(identityResponce.submitId, corporatesType)
    await navigate(baseCreds.URL, page)
    await auth.loginWithout2fa(forEachEmail, baseCreds.PASSWORD)
    await kycForms.followToViewIdentity()
    const fields = await kycForms.editCorporateInformation()
    await kycForms.checkThatTheChangesSaved(fields)
  })

  const identityType = 'individuals'

  test(`The ${identityType} KYC should be editable (IXPRIME-385)`, async ({ kycForms, auth, page }) => {
    const identityResponce = await createIdentity(forEachEmail, identityType, individualBody)
    await approveIdentity(identityResponce.submitId, identityType)
    await navigate(baseCreds.URL, page)
    await auth.loginWithout2fa(forEachEmail, baseCreds.PASSWORD)
    await kycForms.followToViewIdentity()
    const fields = await kycForms.editIndividualInformation()
    await kycForms.checkThatTheChangesSaved(fields)
  })

  test('The "Issuer" KYC should be editable', async ({ kycForms, auth, page }) => {
    const identityResponce = await createCorporateIdentity(forEachEmail, corporatesType, corporateBody)
    await approveIdentity(identityResponce.submitId, corporatesType)
    await navigate(baseCreds.URL, page)
    await auth.loginWithout2fa(forEachEmail, baseCreds.PASSWORD)
    await kycForms.followToViewIdentity()
    const fields = await kycForms.editCorporateInformation()
    await kycForms.checkThatTheChangesSaved(fields)
  })
})

test.describe.parallel('Negative tests for Issuer identity creation (IXPRIME-360)', () => {
  test.beforeEach(async ({ auth, page }) => {
    await auth.submitRegistrationFormByAPI()
    await click(kyc.type.ISSUER, page)
    await page.mouse.click(100, 200)
  })

  test('Create "Issuer" identity without skipping first form', async ({ page, kycForms }) => {
    await test.step('The Issuer Details form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(24)
    })
    // Fill form for following to the next step
    await kycForms.fillIssuerFirstForm()
    await click(kyc.buttons.SUBMIT, page)
    await shouldExist(kyc.UPLOAD_DOCUMENTS_FORM, page)

    await test.step('The Upload Documents form fields should be re1quired', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(3)
    })
  })

  test('Create "Issuer" identity skip first form', async ({ page, kycForms }) => {
    await kycForms.skipFirstForm()
    await test.step('The "Corporate Information" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(45)
    })

    // Fill form for following to the next step
    await kycForms.fillCorporateInformation()
    await kycForms.fillCorporateAddressForm()
    await kycForms.fillCompanyAuthorizedPersonnel()

    await test.step('The "Directors and Beneficial Owner Details" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(35)
    })

    // Fill form for following to the next step
    await kycForms.fillPeopleWithExecutiveAuthorityForm()
    await kycForms.fillCorporateDirectorAddressForm()

    await test.step('The "Tax Declaration" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(7)
    })

    // Fill form for following to the next step
    await kycForms.fillTaxDeclarationForm()
    await shouldExist(kyc.form.DOCUMENTS, page)

    await test.step('The "Upload Documents" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(2)
    })
  })
})

test.describe.parallel('Negative tests for "Corporate Investor Identity" creation', () => {
  test.beforeEach(async ({ auth, page }) => {
    await auth.submitRegistrationFormByAPI()
    await click(kyc.type.CORPORATE, page)
    await page.mouse.click(100, 200)
  })

  test('Create "Corporate Investor" identity without skipping first form', async ({ page, kycForms }) => {
    await test.step('The "Corporate Information" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(45)
    })
    // Fill form for following to the next step
    await kycForms.fillCorporateInformation()
    await kycForms.fillCorporateAddressForm()
    await kycForms.fillCompanyAuthorizedPersonnel()

    await test.step('The "Directors and Beneficial Owner Details" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(35)
    })

    // Fill form for following to the next step
    await kycForms.fillPeopleWithExecutiveAuthorityForm()
    await kycForms.fillCorporateDirectorAddressForm()

    await test.step('The "Tax Declaration" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(7)
    })
  })
})

test.describe.parallel('Test the ability to Create Individual Identity (Negative IXPRIME-318)', () => {
  test.beforeEach(async ({ auth, page }) => {
    await auth.submitRegistrationFormByAPI()
    await click(kyc.type.INDIVIDUAL, page)
    await page.mouse.click(100, 200)
  })

  test('Create "Individual Investor" identity without skipping first form', async ({ page, kycForms }) => {
    await test.step('The "Personal Information" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(18)
    })
    // Fill form for following to the next step
    await kycForms.fillPersonalInformationForm()
    await kycForms.fillAddressForm()

    await test.step('The "Financial Information" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(15)
    })

    // Fill and submit form for following to the next step
    await kycForms.fillFinancialInformation()
    await kycForms.fillTaxDeclaration()
    await click(kyc.buttons.SUBMIT, page)

    //Wait new form
    await shouldExist(kyc.form.INVESTOR_STATUS_DECLARATION, page)

    //Submit empty form
    await click(kyc.buttons.SUBMIT, page)

    await test.step('The "Investor Status Declaration" form fields should be required', async () => {
      await expect(await kycForms.ERROR_NOTIFICATION.first()).toContainText(text.errors.investorStatus)
      await expect(await kycForms.ERROR_NOTIFICATION.last()).toContainText(text.errors.otpIsRequired)
    })

    await kycForms.investorStatusDeclaration('individual')
    await shouldExist(kyc.form.DOCUMENTS, page)

    await test.step('The "Upload Documents" form fields should be required', async () => {
      await click(kyc.buttons.SUBMIT, page)
      await expect(await kycForms.ERROR).toHaveCount(3)
    })
  })
})
