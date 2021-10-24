import { kyc } from '../lib/selectors/kyc-form'
import { text } from '../lib/helpers/text'
import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import {
  emailCreate,
  click,
  screenshotMatching,
  waitForResponseInclude,
  waitForText
} from '../lib/helpers/helpers'

test.afterEach(async ({ page, context }, testInfo) => {
  await page.close()
})

test.describe('Create Identity', () => {
  let forEachEmail = emailCreate()
  test.beforeEach(async ({ page, baseURL, auth }, testInfo) => {
    await auth.submitRegistrationFormByAPI(forEachEmail)
  })

  test('Check individual identity', async ({ page, kycForms }, testInfo) => {
    await test.step('Personal Information ', async () => {
      await click(kyc.type.INDIVIDUAL, page)
      await kycForms.fillPersonalInformationForm()
      await kycForms.fillAddressForm()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Financial Information', async () => {
      await kycForms.fillFinancialInformation()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Tax Declaration', async () => {
      await kycForms.fillTaxDeclaration()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Investor Status Declaration', async () => {
      await kycForms.investorStatusDeclaration('individual')
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Upload Documents', async () => {
      await kycForms.uploadDocument(kyc.field.corporate.DOCS_INDIVIDUAL)
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Check full profile view', async () => {
      await kycForms.checkAllViewUsingSnapshot(testInfo.title)
    })
  })

  test('Check Corporate identity', async ({ page, kycForms }, testInfo) => {
    await test.step('fill Personal Information Form', async () => {
      await click(kyc.type.CORPORATE, page)
      await kycForms.fillCorporateInformation()
      await kycForms.fillCorporateAddressForm()
      await kycForms.fillCompanyAuthorizedPersonnel()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Directors and Beneficial Owner Details', async () => {
      await kycForms.fillPeopleWithExecutiveAuthorityForm()
      await kycForms.fillCorporateDirectorAddressForm()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('fill Tax declaration form', async () => {
      await kycForms.fillTaxDeclarationForm()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Investor Status Declaration', async () => {
      await kycForms.investorStatusDeclaration()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Upload Documents', async () => {
      await kycForms.uploadDocument([
        kyc.field.EVIDENCE_ACCREDITATION,
        ...kyc.field.corporate.DOCS_ISSUER
      ])
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Check full profile view', async () => {
      await waitForText(page, text.docs.docBenefitsAddressName)
      // await kycForms.checkAllViewUsingSnapshot(testInfo.title)
    })
  })
  test('Issuer identity (skip step)', async ({ page, kycForms }, testInfo) => {
    await test.step('fill Personal Information Form', async () => {
      await click(kyc.type.ISSUER, page)
      await kycForms.fillIssuerDetails()
      await kycForms.fillCorporateAddressForm()
      await kycForms.fillCompanyAuthorizedPersonnel()
      await click(kyc.buttons.SUBMIT, page)
    })
    await test.step('Directors and Beneficial Owner Details', async () => {
      await kycForms.fillPeopleWithExecutiveAuthorityForm()
      await kycForms.fillCorporateDirectorAddressForm()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('fill Tax declaration form', async () => {
      await kycForms.fillTaxDeclarationForm()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Upload Documents', async () => {
      await kycForms.uploadDocument(kyc.field.corporate.DOCS_ISSUER)
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Check full profile view', async () => {
      await kycForms.checkAllViewUsingSnapshot(testInfo.title)
    })
  })
  test('Check Issuer identity(full)', async ({ page, kycForms }, testInfo) => {
    await test.step('fill Personal Information Form', async () => {
      await click(kyc.type.ISSUER, page)
      await kycForms.fillIssuerFirstForm()
      await click(kyc.buttons.SUBMIT, page)
    })

    await test.step('Upload Documents', async () => {
      await kycForms.uploadDocument([kyc.field.FILES])
      await click(kyc.buttons.SUBMIT, page)
      await kycForms.checkIssuerView(testInfo)
    })
  })
})
