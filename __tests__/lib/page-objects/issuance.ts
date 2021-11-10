import { issuance } from '../selectors/issuance'
import { text } from '../helpers/text'
import { baseCreds } from '../helpers/creds'

import {
  click,
  typeText,
  uploadFiles,
  waitForText,
  randomString,
  navigate,
  shouldNotExist,
  shouldExist,
  clearAndTypeText
} from '../helpers/helpers'

class Dso {
  page: any
  constructor(page) {
    this.page = page
  }

  checkThatTheDsoWasCreated = async tokenName => {
    await click(issuance.sections.VIEW_DSO_LISTENING, this.page)
    const result = await waitForText(this.page, tokenName)
    return result
  }

  followToIssuanceTab = async auth => {
    await navigate(baseCreds.URL, this.page)
    await auth.loginWithout2fa(baseCreds.EMAIL_APPROVED, baseCreds.PASSWORD)
    await click(issuance.ISSUANCE_TAB, this.page)
  }

  fillDsoInformationForm = async () => {
    const tokenName = 'TokenName' + randomString()
    const tokenSymbol = Date.now().toString().slice(-6)
    await uploadFiles(this.page, issuance.dso.LOGO, text.docs.pathToFile)
    await click(issuance.dso.listBox.CAPITAL_STRUCTURE, this.page)
    await click(issuance.dso.listBox.STRUCTURE_VALUE, this.page)
    await click(issuance.dso.listBox.CORPORATE, this.page)
    await click(issuance.dso.listBox.CORPORATE_VALUE, this.page)
    await click(issuance.dso.listBox.CURRENCY, this.page)
    await click(issuance.dso.listBox.CURRENCY_VALUE, this.page)
    await click(issuance.dso.listBox.NETWORK, this.page)
    await click(issuance.dso.listBox.NETWORK_VALUE, this.page)
    await typeText(issuance.dso.fields.TOKEN_NAME, tokenName, this.page)
    await typeText(issuance.dso.fields.TOKEN_SYMBOL, tokenSymbol, this.page)
    await typeText(issuance.dso.fields.ISSUER_NAME, 'Top issuer', this.page)
    await typeText(issuance.dso.fields.LAUNCH_DATE, '11112022', this.page)
    await typeText(issuance.dso.fields.COMPLETION_DATE, '11112023', this.page)
    await typeText(
      issuance.dso.fields.IDENTIFIER_CODE,
      's12345678900',
      this.page
    )
    return { tokenSymbol, tokenName }
  }
  fillDsoPricingForm = async () => {
    await typeText(issuance.dso.fields.PRICEPER_UNIT, '100000', this.page)
    await typeText(
      issuance.dso.fields.TOTAL_FUNDRAISING_AMOUNT,
      '100000000',
      this.page
    )
    await typeText(
      issuance.dso.fields.MINIMUM_INVESTMENT,
      '11112023',
      this.page
    )
  }

  fillDsoOfferingTermsForm = async () => {
    await typeText(issuance.dso.fields.INVESTMENT_PERIOD, '11', this.page)
    await typeText(issuance.dso.fields.DIVIDEND_YIELD, '10', this.page)
    await typeText(issuance.dso.fields.INTEREST_RATE, '10', this.page)
    await typeText(issuance.dso.fields.GROSS_IRR, '10', this.page)
    await typeText(
      issuance.dso.fields.INVESTMENT_STRUCTURE,
      'best Structure',
      this.page
    )
    await click(issuance.dso.listBox.DISTRIBUTION_FREQUENCY, this.page)
    await click(issuance.dso.listBox.DISTRIBUTION_VALUE, this.page)
    await typeText(issuance.dso.fields.LEVERAGE, '0.1', this.page)
    await typeText(issuance.dso.fields.EQUITY_MULTIPLE, '0.001', this.page)
    const infoAreas = await this.page.$$('[role="textbox"]')
    for (const infoArea of infoAreas) {
      await click('text="Start typing..."', this.page)
      await infoArea.type('Information')
    }
  }

  fillDsoTeamMembersForm = async () => {
    await uploadFiles(
      this.page,
      issuance.dso.fields.TEAM_MEMBER_PHOTO,
      text.docs.pathToFile
    )
    await typeText(
      issuance.dso.fields.TEAM_MEMBER_NAME,
      'Team member Name',
      this.page
    )
    await typeText(
      issuance.dso.fields.TEAM_MEMBER_POSITION,
      'Team member Position',
      this.page
    )
  }
  fillVideoAndFAQform = async () => {
    await typeText(issuance.dso.fields.VIDEO_TITLE, 'videoTitle', this.page)
    await typeText(
      issuance.dso.fields.VIDEO_LINK,
      'https://www.youtube.com/watch?v=UubZO2bPCgw&ab_channel=hate5six',
      this.page
    )
    await typeText(issuance.dso.fields.FAQ_1, 'FAQ_1', this.page)
    await typeText(issuance.dso.fields.FAQ_1_ANSWER, 'FAQ_1_ANSWER', this.page)
    await typeText(issuance.dso.fields.FAQ_2, 'FAQ_2', this.page)
    await typeText(issuance.dso.fields.FAQ_2_ANSWER, 'FAQ_2_ANSWER', this.page)
    await typeText(issuance.dso.fields.FAQ_3, 'FAQ_3', this.page)
    await typeText(issuance.dso.fields.FAQ_3_ANSWER, 'FAQ_3_ANSWER', this.page)
    await click(issuance.dso.buttons.FINISH_LATER, this.page)
  }

  addNewTeamMember = async () => {
    await click(issuance.dso.buttons.ADD_TEAM_MEMBER, this.page)
    const inputs = await this.page.$$(issuance.dso.fields.TEAM_MEMBER_INPUTS)
    return inputs.length
  }

  removeTeamMember = async () => {
    await click(issuance.dso.buttons.REMOVE, this.page)
    const inputs = await this.page.$$(issuance.dso.fields.TEAM_MEMBER_INPUTS)
    return inputs.length
  }

  addAndRemoveNewFAQ = async () => {
    await click(issuance.dso.buttons.ADD_NEW_FAQ, this.page)
    const inputsBefore = await this.page.$$(issuance.dso.fields.FAQ_INPUTS)
    await click(issuance.dso.buttons.REMOVE_FAQ, this.page)
    const inputsAfter = await this.page.$$(issuance.dso.fields.FAQ_INPUTS)
    return [inputsBefore.length, inputsAfter.length]
  }

  addNewVideoLinks = async () => {
    await click(issuance.dso.buttons.ADD_NEW_VIDEO, this.page)
    const inputs = await this.page.$$(issuance.dso.fields.VIDEO_INPUTS)
    return inputs.length
  }
}
class Listing {
  page: any
  constructor(page) {
    this.page = page
  }

  checkError = async text => {
    await click(issuance.dso.buttons.FINISH_LATER, this.page)
    const error = await waitForText(this.page, text)
    return error
  }

  fillListeningOfferingTermsForm = async () => {
    await clearAndTypeText(
      issuance.dso.fields.INVESTMENT_PERIOD,
      '11',
      this.page
    )
    await click(issuance.dso.listBox.CURRENCY, this.page)
    await clearAndTypeText(issuance.dso.fields.DIVIDEND_YIELD, '10', this.page)
    await clearAndTypeText(issuance.dso.fields.INTEREST_RATE, '10', this.page)
    await clearAndTypeText(issuance.dso.fields.GROSS_IRR, '10', this.page)
    await clearAndTypeText(
      issuance.dso.fields.INVESTMENT_STRUCTURE,
      'best Structure',
      this.page
    )
    await click(issuance.dso.listBox.DISTRIBUTION_FREQUENCY, this.page)
    await click(issuance.dso.listBox.DISTRIBUTION_VALUE, this.page)
    await clearAndTypeText(issuance.dso.fields.LEVERAGE, '0.1', this.page)
    await clearAndTypeText(
      issuance.dso.fields.EQUITY_MULTIPLE,
      '0.001',
      this.page
    )
  }
  fillListingGeneralInformationForm = async () => {
    const tokenName = 'TokenName' + randomString()
    const tokenSymbol = Date.now().toString().slice(-6)
    await uploadFiles(this.page, issuance.dso.LOGO, text.docs.pathToFile)
    await click(issuance.dso.listBox.CAPITAL_STRUCTURE, this.page)
    await click(issuance.dso.listBox.STRUCTURE_VALUE, this.page)
    await click(issuance.dso.listBox.CORPORATE, this.page)
    await click(issuance.dso.listBox.CORPORATE_VALUE, this.page)
    await click(issuance.dso.listBox.CURRENCY, this.page)
    await click(issuance.dso.listBox.NETWORK, this.page)
    await click(issuance.dso.listBox.NETWORK_VALUE, this.page)
    await typeText(issuance.dso.fields.TOKEN_NAME, tokenName, this.page)
    await typeText(issuance.dso.fields.TOKEN_SYMBOL, tokenSymbol, this.page)
    await typeText(issuance.dso.fields.LAUNCH_DATE, '11112022', this.page)
    await typeText(issuance.dso.fields.COMPLETION_DATE, '11112023', this.page)
    return { tokenSymbol, tokenName }
  }

  fillListingPricingForm = async () => {
    await typeText(
      issuance.listings.fields.MIN_TRADE_AMOUNT,
      '100000',
      this.page
    )

    await typeText(
      issuance.listings.fields.MAX_TRADE_AMOUNT,
      '100000000',
      this.page
    )
    await typeText(
      issuance.listings.fields.RAISED_AMOUNT,
      '100000000',
      this.page
    )
  }

  addAndFillTeamMemberForm = async () => {
    await click(issuance.dso.buttons.ADD_TEAM_MEMBER, this.page)
    await uploadFiles(
      this.page,
      issuance.dso.fields.TEAM_MEMBER_PHOTO,
      text.docs.pathToFile
    )
    await typeText(
      issuance.dso.fields.TEAM_MEMBER_NAME,
      'Team member Name',
      this.page
    )
    await typeText(
      issuance.dso.fields.TEAM_MEMBER_POSITION,
      'Team member Position',
      this.page
    )
  }
  fillDocumentsForm = async () => {
    const docFields = await uploadFiles(
      this.page,
      issuance.listings.fields.DOCS,
      text.docs.pathToFile
    )
    return docFields.inputsFile
  }
  checkThatTheListingWasCreated = async tokenName => {
    await click(issuance.dso.buttons.FINISH_LATER, this.page)
    await click(issuance.listings.buttons.SUBMIT, this.page)
    await click(issuance.sections.VIEW_EXCHANGE_LISTINGS, this.page)
    const result = await waitForText(this.page, tokenName)
    return result
  }

  importDso = async () => {
    await click(issuance.listings.buttons.IMPORT_DSO, this.page)
    await shouldNotExist(issuance.listings.listBox.DSO_STATE, this.page)
    await click(issuance.listings.listBox.MY_DSO, this.page)
    await click(issuance.listings.listBox.DSO_HYBRID_TEST, this.page)
    await click(issuance.listings.buttons.IMPORT, this.page)
    await shouldExist(
      `${issuance.listings.GENERAL_FORM} ${issuance.listings.LOGO}`,
      this.page
    )
    const importedForm = await this.page.$(issuance.listings.GENERAL_FORM)
    return importedForm
  }
  removeTeamMember = async () => {
    await click(issuance.dso.buttons.REMOVE, this.page)
    const inputs = await this.page.$$(issuance.dso.fields.TEAM_MEMBER_NAME)
    return inputs.length
  }
}
export { Dso, Listing }
