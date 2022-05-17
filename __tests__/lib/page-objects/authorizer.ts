import { issuance } from './../selectors/issuance'
import { invest } from '../selectors/invest'
import { accountsTab } from '../selectors/accounts'
import { authorizerEl } from '../selectors/authorizer'
import { baseCreds, setENV } from '../helpers/creds'
import { text } from '../helpers/text'
import { postRequest, getCookies } from '../api/api'
import { bankAccount, cashWithdrawal, blockchainAddresses, dso, commitment, approvedApi } from '../api/api-body'

import {
  click,
  navigate,
  waitForRequestInclude,
  shouldExist,
  getMessage,
  shouldNotExist,
  LOADER,
  uploadFiles
} from '../helpers/helpers'

class Authorizer {
  page: any
  constructor(page) {
    this.page = page
  }

  viewProfileCheckUploadDocument = async () => {
    await shouldExist(authorizerEl.viewProfileSection.UPLOAD_DOCUMENT, this.page)
    await this.page.reload()
    await shouldExist(authorizerEl.viewProfileSection.UPLOAD_DOCUMENT, this.page)
  }

  createBankAccountByApi = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    const id = (await request.json()).data._id
    if (baseCreds.URL.includes('otc' || 'dev')) {
      bankAccount['asset'] = '5fd7199deb87068672a27016'
    }
    const createBankAccount = await postRequest(bankAccount, cookies, `accounts/banks/${id}`)
    return createBankAccount
  }

  createCommitmentsByApi = async () => {
    const { cookies, request } = await getCookies(baseCreds.EMAIL_APPROVED)
    const id = (await request.json()).data._id
    const createBankAccount = await postRequest(commitment, cookies, `issuance/commitments/${id}`)
    return createBankAccount
  }

  getDataForIdentityTable = async (state, link = text.requests.identityIndividualsList) => {
    const { cookies, request } = await getCookies(baseCreds.ADMIN)
    const createBankAccount = await postRequest(state, cookies, link)
    const identitiesCount = (await createBankAccount?.data[0]?.count) ?? 0
    return identitiesCount
  }

  getUserForVirtualAccountCreation = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    const listOfUsers = await postRequest(approvedApi, cookies, text.requests.identityCorporatesList)
    let identity
    for (let user of await listOfUsers.data[0].documents) {
      if (user.companyLegalName.includes('middle')) {
        identity = user.user.email
        break
      }
    }
    return identity
  }

  createVirtualAccount = async email => {
    const { cookies, request } = await getCookies(email)
    const id = (await request.json()).data._id
    try {
      for (let currency of ['SGD', 'USD']) {
        const result = await postRequest(
          {
            currency: currency,
            userId: id
          },
          cookies,
          'virtual-accounts/assign'
        )
      }
    } catch (error) {
      console.error(error)
      throw new Error(`createVirtualAccount by API failed`)
    }
  }

  createNewDSO = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    const userId = (await request.json()).data._id
    dso['tokenSymbol'] = Date.now().toString().slice(-6)
    const createNewDSO = (await postRequest(dso, cookies, `issuance/dso/${userId}`)).data.id
    const submitDSO = await postRequest({}, cookies, `issuance/dso/${userId}/${createNewDSO}/submit`, 'PATCH')
    return submitDSO
  }
  createBlockchainAddressByApi = async email => {
    const { cookies, request } = await getCookies(email)
    const id = (await request.json()).data._id
    const createBankAccount = await postRequest(blockchainAddresses, cookies, `accounts/withdrawal-addresses/${id}`)

    return createBankAccount
  }

  createCashWithdrawalRequestByApi = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    if (baseCreds.URL.includes('otc' || 'dev'))
      (cashWithdrawal['bankAccountId'] = '62334307a5e68410ff43de25'), (cashWithdrawal['amount'] = 10000)
    const createBankAccount = await postRequest(cashWithdrawal, cookies, text.requests.withdrawalsVirtualAccount)
    return createBankAccount
  }

  checkAuthorizePagesSearch = async (word, api) => {
    const locator = this.page.locator('input[type="text"]').first()
    await locator.type(word)
    await click(issuance.listings.buttons.SUBMIT, this.page)
    await waitForRequestInclude(this.page, baseCreds.BASE_API + api, 'POST')
    await click(issuance.listings.buttons.SUBMIT, this.page)
    await shouldNotExist(LOADER, this.page)

    const table = await this.page.locator('tbody')
    return table
  }
  approve = async () => {
    await click(authorizerEl.buttons.APPROVE, this.page)
    // await waitForRequestInclude(this.page, '/approve', 'PUT')
  }
  reject = async () => {
    await click(authorizerEl.buttons.REJECT, this.page)
    await waitForRequestInclude(this.page, '/reject', 'PUT')
  }

  rejectBankAccount = async () => {
    await this.reject()
    await navigate(baseCreds.URL + text.requests.bankAccount, this.page)
    // await shouldExist(`${invest.TABLE} >> text="Rejected"`, this.page)
  }

  approveBankAccount = async () => {
    await this.approve()
    await navigate(baseCreds.URL + text.requests.bankAccount, this.page)
    // await shouldExist(`${invest.TABLE} >> text="Approved"`, this.page)
  }

  approveCashWithdraw = async () => {
    await this.approve()
    await navigate(baseCreds.URL + text.requests.cashWithdrawal, this.page)
    await shouldExist(`${invest.TABLE} >> text="less than a minute ago"`, this.page)
  }
  rejectCashWithdraw = async () => {
    await this.reject()
    const message = await getMessage(baseCreds.AUTHORIZER_USER, 'Your Withdrawal')
    return message.subject
  }
  deleteBankAccount = async () => {
    await click(authorizerEl.buttons.MORE, this.page)
    await click(authorizerEl.buttons.REMOVE, this.page)
    const code = await this.page.$$('input')
    for (const digit of code) {
      await digit.fill('1')
    }
    await click(accountsTab.buttons.CONFIRM, this.page)
    await waitForRequestInclude(this.page, '/remove', 'PUT')
  }
}
export { Authorizer }
