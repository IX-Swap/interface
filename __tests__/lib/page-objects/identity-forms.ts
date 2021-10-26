import { kyc } from '../selectors/kyc-form'
import { text } from '../helpers/text'
// import { userRegistration } from "../helpers/api-helpers";
import { expect } from '@playwright/test'

import {
  click,
  typeText,
  uploadFiles,
  clearAndTypeText,
  waitForText,
  screenshotMatching,
  shouldNotExist
} from '../helpers/helpers'

class UserForms {
  page: any
  constructor(page) {
    this.page = page
  }

  checkIssuerView = async testInfo => {
    await click(kyc.buttons.SUBMIT_TEXT, this.page)
    await expect(this.page.locator('button[disabled]')).toHaveText('Submitted')
    const dialog = await this.page.waitForSelector(kyc.DIALOG_VIEW)
    await screenshotMatching(testInfo.title, dialog)
  }

  fillIssuerFirstForm = async () => {
    await this.page.mouse.click(100, 200, { force: true })
    await typeText(kyc.field.REGISTRATION_NUMBER, '1990', this.page)
    await clearAndTypeText(kyc.field.FULL_NAME, 'Issuer FULL NAME', this.page)
    await typeText(kyc.field.EMAIL, 'line2@test.com', this.page)
    await typeText(kyc.field.issuer.COMPANY_NAME, 'Company name', this.page)
    await typeText(kyc.field.issuer.INDUSTRY, 'Coal', this.page)
    await typeText(kyc.field.issuer.FR_AMOUNT, '100000', this.page)
    await typeText(kyc.field.issuer.DETAILS, 'OMG', this.page)
  }

  fillIssuerDetails = async () => {
    await this.page.mouse.click(100, 200, { force: true })
    await click('text="SKIP THIS"', this.page)
    await click('text="Yes"', this.page)
    await click(kyc.buttons.OKAY, this.page)
    await uploadFiles(this.page, kyc.field.corporate.LOGO, text.docs.pathToFile)
    await typeText(kyc.field.corporate.NAME, 'middle', this.page)
    await typeText(kyc.field.REGISTRATION_NUMBER, '1990', this.page)
    await click(kyc.field.corporate.COMPANY_OF_INCORPORATION, this.page)
    await click(kyc.field.TAX_RESIDENT_VALUE, this.page)
    await click(kyc.field.corporate.LEGAL_ENTITY_STATUS, this.page)
    await click(kyc.field.corporate.LEGAL_ENTITY_VALUE, this.page)
  }

  checkAllViewUsingSnapshot = async screenName => {
    await this.page.waitForSelector(kyc.USER_PHOTO)
    const elementHandle = await this.page.$('//form')
    await this.page.waitForTimeout(5000)
    await screenshotMatching(screenName, elementHandle)
  }

  fillTaxDeclarationForm = async () => {
    await click(kyc.field.TAX_RESIDENT, this.page)
    await click(kyc.field.TAX_RESIDENT_VALUE, this.page)
    await typeText(kyc.field.TAX_RESIDENT_IDENTIFICATION, '9379992', this.page)
  }

  fillCorporateInformation = async () => {
    await click(kyc.buttons.OKAY, this.page)
    await uploadFiles(this.page, kyc.field.corporate.LOGO, text.docs.pathToFile)
    await typeText(kyc.field.corporate.NAME, 'middle', this.page)
    await typeText(kyc.field.REGISTRATION_NUMBER, '1990', this.page)
    await click(kyc.field.corporate.COMPANY_OF_INCORPORATION, this.page)
    await click(kyc.field.TAX_RESIDENT_VALUE, this.page)
    await click(kyc.field.corporate.LEGAL_ENTITY_STATUS, this.page)
    await click(kyc.field.corporate.LEGAL_ENTITY_VALUE, this.page)
  }

  fillCorporateAddressForm = async () => {
    await typeText(kyc.field.corporate.POSTAL_CODE, '123441', this.page)
    await typeText(kyc.field.corporate.ADDRESS1, 'line1', this.page)
    await typeText(kyc.field.corporate.ADDRESS2, 'line2', this.page)
    await click(kyc.field.corporate.ADDRESS_COUNTRY, this.page)
    await click('text="Azerbaijan"', this.page)
    await typeText(kyc.field.corporate.CITY, 'Baku', this.page)
    await typeText(kyc.field.corporate.STATE, 'Kyiv', this.page)
  }

  fillCorporateDirectorAddressForm = async () => {
    await uploadFiles(
      this.page,
      kyc.field.corporate.directors.BENEFICIAL_PROOF_ADDRESS,
      text.docs.docBenefitsAddress
    )
    await uploadFiles(
      this.page,
      kyc.field.corporate.directors.BENEFICIAL_PROOF_IDENTITY,
      text.docs.docBenefitsIdentify
    )
    await waitForText(this.page, text.docs.docBenefitsIdentifyName)
    await typeText(
      kyc.field.corporate.directors.POSTAL_CODE,
      '123441',
      this.page
    )
    await typeText(kyc.field.corporate.directors.ADDRESS1, 'line1', this.page)
    await typeText(kyc.field.corporate.directors.ADDRESS2, 'line2', this.page)
    await click(kyc.field.corporate.directors.COUNTRY, this.page)
    await click('text="Azerbaijan"', this.page)
    await typeText(kyc.field.corporate.directors.CITY, 'Baku', this.page)
    await typeText(kyc.field.corporate.directors.STATE, 'Kyiv', this.page)
    await typeText(
      kyc.field.corporate.directors.PERCENTAGE_SHAREHOLDING,
      '100',
      this.page
    )
    await typeText(
      kyc.field.BENEFICIAL_FULL_NAME,
      'BENEFICIAL FULL NAME',
      this.page
    )
  }

  fillPeopleWithExecutiveAuthorityForm = async () => {
    await typeText(kyc.field.issuer.FULL_NAME, 'Full name auto test', this.page)
    await typeText(kyc.field.EMAIL, 'line2@test.com', this.page)
    await typeText(
      kyc.field.corporate.directors.DESIGNATION,
      'DESIGNATION',
      this.page
    )
    await clearAndTypeText(kyc.field.PHONE_NUMBER, '13022462220', this.page)
    //Authorization Document
    await uploadFiles(
      this.page,
      kyc.field.corporate.directors.PROOF_IDENTITY,
      text.docs.pathToFile
    )

    await uploadFiles(
      this.page,
      kyc.field.corporate.directors.PROOF_ADDRESS,
      text.docs.pathToFile
    )
  }
  fillCompanyAuthorizedPersonnel = async () => {
    await typeText(kyc.field.EMAIL, 'line2@test.com', this.page)
    await typeText(kyc.field.FULL_NAME, 'Full name auto test', this.page)
    await typeText(kyc.field.corporate.DESIGNATION, 'DESIGNATION', this.page)
    await clearAndTypeText(kyc.field.PHONE_NUMBER, '13022462220', this.page)
    //Authorization Document
    await uploadFiles(
      this.page,
      kyc.field.corporate.directors.DOCUMENTS,
      text.docs.pathToFile
    )
  }
  fillPersonalInformationForm = async () => {
    await click(kyc.buttons.OKAY, this.page)

    await uploadFiles(this.page, kyc.field.PHOTO, text.docs.pathToFile)
    await typeText(kyc.field.MIDDLENAME, 'middle', this.page)
    await typeText(kyc.field.DATA, '12/11/1990', this.page)
    await clearAndTypeText(kyc.field.PHONE_NUMBER, '13022462220', this.page)
    await click(kyc.field.CITIZENSHIP, this.page)
    await click(kyc.field.CITIZENSHIP_VALUE, this.page)
  }

  fillAddressForm = async () => {
    await typeText(kyc.field.POSTAL_CODE, '123441', this.page)
    await typeText(kyc.field.ADDRESS, 'StateAddress', this.page)
    await typeText(kyc.field.ADDRESS1, 'line1', this.page)
    await typeText(kyc.field.ADDRESS2, 'line2', this.page)
    await click(kyc.field.ADDRESS_COUNTRY, this.page)
    await click('text="Azerbaijan"', this.page)
    await typeText(kyc.field.CITY, 'Baku', this.page)
  }

  fillFinancialInformation = async () => {
    await typeText(kyc.field.OCCUPATION, 'OCCUPATION', this.page)
    await typeText(kyc.field.EMPLOYER, 'EMPLOYER', this.page)
    await click(kyc.field.EMPLOYMENT_STATUS, this.page)
    await click(kyc.field.STATUS, this.page)
    await click(kyc.field.INCOME, this.page)
    await click(kyc.field.SET_INCOME, this.page)
    await this.page.check(kyc.checkbox.INHERITANCE)
    await this.page.check(kyc.checkbox.INVESTMENTS)
    await click(kyc.checkbox.INVESTMENTS_VALUE, this.page)
    await click(kyc.checkbox.INHERITANCE_VALUE, this.page)
  }

  fillTaxDeclaration = async () => {
    await click(kyc.checkbox.YES_SINGAPORE_RESIDENT, this.page)
    await typeText(kyc.field.IDENTIFICATION_NUMBER, 'S4235022B', this.page)
    await click(kyc.checkbox.NO_US_RESIDENT, this.page)
  }
  investorStatusDeclaration = async (identities = 'default') => {
    if (identities === 'individual') {
      await click('[name="personalAssets"]', this.page)
    } else {
      await click('[name="trustee"]', this.page)
    }
    await click(kyc.checkbox.I_CONFIRM, this.page)
  }

  uploadDocument = async list => {
    for (const item of list) {
      await uploadFiles(this.page, item, text.docs.pathToFile)
    }
    await shouldNotExist(kyc.NOTIFICATION, this.page)
  }
}
export { UserForms }
