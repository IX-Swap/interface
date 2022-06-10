import { kyc } from '../selectors/kyc-form'
import { text } from '../helpers/text'
import { expect, Locator } from '@playwright/test'

import {
  click,
  typeText,
  uploadFiles,
  clearAndTypeText,
  waitForText,
  screenshotMatching,
  shouldNotExist,
  randomString,
  waitForRequestInclude,
  shouldExist
} from '../helpers/helpers'

class UserForms {
  page: any
  ERROR: Locator
  FULL_NAME: Locator
  ERROR_NOTIFICATION: Locator

  constructor(page) {
    this.page = page
    this.ERROR = page.locator('[class*=Mui-error]')
    this.FULL_NAME = page.locator(kyc.field.FULL_NAME)
    this.ERROR_NOTIFICATION = page.locator("[appearance='error']")
  }

  followToViewIdentity = async () => {
    await click(kyc.MY_PROFILE, this.page)
    await click(kyc.CREATE_IDENTITY_SECTION, this.page)
    await click(kyc.buttons.VIEW, this.page)
  }

  checkIssuerView = async testInfo => {
    await click(kyc.buttons.SUBMIT_TEXT, this.page)
    await expect(this.page.locator('button[disabled]')).toHaveText('Submitted')
    const dialog = await this.page.waitForSelector(kyc.DIALOG_VIEW)
    // await screenshotMatching(testInfo.title, dialog, this.page)
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

  skipFirstForm = async () => {
    await this.page.mouse.click(100, 200, { force: true })
    await click('text="SKIP THIS"', this.page)
    await click('text="Yes"', this.page)
    await click(kyc.buttons.OKAY, this.page)
  }

  checkAllViewUsingSnapshot = async screenName => {
    await this.page.waitForSelector(kyc.USER_PHOTO)
    await this.page.waitForTimeout(5000)
    const elementHandle = await this.page.$('//form')
    await screenshotMatching(screenName, elementHandle, this.page)
  }

  fillTaxDeclarationForm = async () => {
    await click(kyc.field.TAX_RESIDENT, this.page)
    await click(kyc.field.TAX_RESIDENT_VALUE, this.page)
    await typeText(kyc.field.TAX_RESIDENT_IDENTIFICATION, '9379992', this.page)
    await click(kyc.buttons.SUBMIT, this.page)
  }

  fillCorporateInformation = async () => {
    await this.page.mouse.click(100, 200, { force: true })
    await uploadFiles(this.page, kyc.field.corporate.LOGO, text.docs.pathToFile)
    await typeText(kyc.field.corporate.NAME, 'middle' + randomString(), this.page)
    await typeText(kyc.field.REGISTRATION_NUMBER, '1990', this.page)
    await click(kyc.field.corporate.COMPANY_OF_INCORPORATION, this.page)
    await click(kyc.field.TAX_RESIDENT_VALUE, this.page)
    await click(kyc.field.corporate.LEGAL_ENTITY_STATUS, this.page)
    await click(kyc.field.corporate.LEGAL_ENTITY_VALUE, this.page)
    await click(kyc.listBox.NUMBER_BUSINESS_OWNERS, this.page)
    await click(kyc.listBox.NUMBER_BUSINESS_OWNERS_VALUE, this.page)
    await click(kyc.listBox.SOURCE_OF_FUNDS, this.page)
    await click(kyc.listBox.SOURCE_OF_FUNDS_VALUE, this.page)
    await typeText(kyc.field.issuer.BUSINESS_ACTIVITY, 'BUSINESS ACTIVITY', this.page)
  }
  updateData = async () => {
    const update = await this.page.locator('text="Update"')
    await update.click()
    await this.page.waitForRequest(request => request.url().includes('/identity'))
  }

  editCorporateInformation = async () => {
    const string = randomString()
    await click(kyc.buttons.EDIT, this.page)
    const corporateName = await clearAndTypeText(kyc.field.corporate.NAME, 'name' + string, this.page)
    const regNumber = await clearAndTypeText(kyc.field.REGISTRATION_NUMBER, '1990' + string, this.page)
    const city = await clearAndTypeText(kyc.field.corporate.CITY, 'Baku' + string, this.page)
    const state = await clearAndTypeText(kyc.field.corporate.STATE, 'Kyiv' + string, this.page)
    await clearAndTypeText(kyc.field.issuer.BUSINESS_ACTIVITY, 'business' + string, this.page)
    await this.updateData()
    await click(kyc.buttons.SUBMIT, this.page)
    const directorName = await clearAndTypeText(kyc.field.issuer.FULL_NAME, 'director' + string, this.page)
    await this.updateData()
    await click(kyc.buttons.SUBMIT, this.page)
    const taxNumber = await clearAndTypeText(kyc.field.TAX_RESIDENT_IDENTIFICATION, 'S' + string, this.page)
    await this.updateData()
    await this.page.reload()
    return [corporateName, regNumber, city, state, directorName, taxNumber]
  }
  checkThatTheChangesSaved = async (fields: Array<[]>) => {
    await click(kyc.CREATE_IDENTITY_SECTION, this.page)
    await click(kyc.buttons.VIEW, this.page)
    for (let item of fields) {
      await waitForText(this.page, item)
    }
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
    await uploadFiles(this.page, kyc.field.corporate.directors.BENEFICIAL_PROOF_ADDRESS, text.docs.pdfFilePath)
    await uploadFiles(this.page, kyc.field.corporate.directors.BENEFICIAL_PROOF_IDENTITY, text.docs.pdfFilePath)
    await waitForText(this.page, text.docs.docBenefitsIdentifyName)
    await typeText(kyc.field.corporate.directors.POSTAL_CODE, '123441', this.page)
    await typeText(kyc.field.corporate.directors.ADDRESS1, 'line1', this.page)
    await typeText(kyc.field.corporate.directors.ADDRESS2, 'line2', this.page)
    await click(kyc.field.corporate.directors.COUNTRY, this.page)
    await click('text="Azerbaijan"', this.page)
    await typeText(kyc.field.corporate.directors.CITY, 'Baku', this.page)
    await typeText(kyc.field.corporate.directors.STATE, 'Kyiv', this.page)
    await typeText(kyc.field.corporate.directors.PERCENTAGE_SHAREHOLDING, '100', this.page)
    await typeText(kyc.field.BENEFICIAL_FULL_NAME, 'BENEFICIAL FULL NAME', this.page)
    await click(kyc.buttons.SUBMIT, this.page)
    await shouldExist(kyc.form.TAX_DECLARATION, this.page)
  }

  fillPeopleWithExecutiveAuthorityForm = async () => {
    await typeText(kyc.field.issuer.FULL_NAME, 'Full name auto test', this.page)
    await typeText(kyc.field.EMAIL, 'line2@test.com', this.page)
    await typeText(kyc.field.corporate.directors.DESIGNATION, 'DESIGNATION', this.page)
    await clearAndTypeText(kyc.field.PHONE_NUMBER, '13022462220', this.page)
    //Authorization Document
    await uploadFiles(this.page, kyc.field.corporate.directors.PROOF_IDENTITY, text.docs.pdfFilePath)
    await uploadFiles(this.page, kyc.field.corporate.directors.PROOF_ADDRESS, text.docs.pdfFilePath)
  }

  fillCompanyAuthorizedPersonnel = async () => {
    await typeText(kyc.field.EMAIL, 'line2@test.com', this.page)
    await typeText(kyc.field.FULL_NAME, 'Full name auto test', this.page)
    await typeText(kyc.field.corporate.DESIGNATION, 'DESIGNATION', this.page)
    await clearAndTypeText(kyc.field.PHONE_NUMBER, '13022462220', this.page)
    //Authorization Document
    await uploadFiles(this.page, kyc.field.corporate.directors.DOCUMENTS, text.docs.pdfFilePath)
    await click(kyc.buttons.SUBMIT, this.page)
    await shouldExist(kyc.form.DIRECTORS, this.page)
  }
  fillPersonalInformationForm = async () => {
    await uploadFiles(this.page, kyc.field.PHOTO, text.docs.pathToFile)
    await click('[id="gender"]', this.page)
    await click('[data-value="F"]', this.page)
    await typeText(kyc.field.MIDDLENAME, 'Middle', this.page)
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
    await click(kyc.buttons.SUBMIT, this.page)
    await shouldExist(kyc.listBox.OCCUPATION, this.page)
  }

  fillFinancialInformation = async () => {
    await click(kyc.listBox.OCCUPATION, this.page)
    await click(kyc.listBox.OCCUPATION_VALUE, this.page)
    await typeText(kyc.field.EMPLOYER, 'EMPLOYER', this.page)
    await click(kyc.field.EMPLOYMENT_STATUS, this.page)
    await click(kyc.field.STATUS, this.page)
    await click(kyc.field.INCOME, this.page)
    await click(kyc.field.SET_INCOME, this.page)
    await click(kyc.listBox.SOURCE_OF_FUNDS, this.page)
    await click(kyc.listBox.SOURCE_OF_FUNDS_VALUE, this.page)
    await click(kyc.buttons.SUBMIT, this.page)
    await shouldExist(kyc.form.TAX_DECLARATION, this.page)
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
    await click(kyc.buttons.SUBMIT, this.page)
  }

  uploadDocument = async list => {
    for (const item of list) {
      await uploadFiles(this.page, item, text.docs.pdfFilePath)
    }
  }

  editIndividualInformation = async () => {
    const string = randomString().toLowerCase()
    await click(kyc.buttons.EDIT, this.page)
    const corporateName = await clearAndTypeText(kyc.field.FIRS_NAME, 'Name' + string, this.page)
    const regNumber = await clearAndTypeText(kyc.field.MIDDLENAME, 'Middle' + string, this.page)
    const city = await clearAndTypeText(kyc.field.CITY, 'City' + string, this.page)
    const state = await clearAndTypeText(kyc.field.ADDRESS, 'Kyiv' + string, this.page)
    await this.updateData()
    await click(kyc.buttons.SUBMIT, this.page)

    await click(kyc.listBox.OCCUPATION, this.page)
    await click(kyc.listBox.OCCUPATION_VALUE, this.page)
    const employer = await clearAndTypeText(kyc.field.EMPLOYER, 'Employer' + string, this.page)

    await this.updateData()

    return [corporateName, regNumber, city, state, employer]
  }
}
export { UserForms }
