import { issuance } from './../selectors/issuance'
import { invest } from '../selectors/invest'
import { bankAccounts } from '../selectors/accounts'
import { authorizerEl } from '../selectors/authorizer'
import { baseCreds } from '../helpers/creds'
import { userRegistration } from '../helpers/api'
import { text } from '../helpers/text'
import { postRequest, getCookies } from '../helpers/api'
import {
  bankAccount,
  cashWithdrawal,
  blockchainAddresses,
  dso,
  commitment,
  approvedApi
} from '../helpers/api-body'
// import { userRegistration } from "../helpers/api-helpers";

import {
  click,
  navigate,
  waitForRequestInclude,
  shouldExist,
  getMessage
} from '../helpers/helpers'

class Authorizer {
  page: any
  constructor(page) {
    this.page = page
  }

  createBankAccountByApi = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    const id = (await request.json()).data._id
    const createBankAccount = await postRequest(
      bankAccount,
      cookies,
      `accounts/banks/${id}`
    )
    return createBankAccount
  }

  createCommitmentsByApi = async () => {
    const { cookies, request } = await getCookies(baseCreds.EMAIL_APPROVED)
    const id = (await request.json()).data._id
    const createBankAccount = await postRequest(
      commitment,
      cookies,
      `issuance/commitments/${id}`
    )
    return createBankAccount
  }

  getDataForIdentityTable = async (
    state,
    link = text.requests.identityIndividualsList
  ) => {
    const { cookies, request } = await getCookies('oleksiyk@titanium-tech.net')
    const createBankAccount = await postRequest(state, cookies, link)
    const identitiesCount = (await createBankAccount.json()).data[0].count
    return identitiesCount
  }

  getUserForVirtualAccountCreation = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    const listOfUsers = await postRequest(
      approvedApi,
      cookies,
      text.requests.identityCorporatesList
    )
    let identity
    for (let user of (await listOfUsers.json()).data[0].documents) {
      if (user.companyLegalName === 'middle') {
        identity = user.user.email
        break
      }
    }
    return identity
  }

  createVirtualAccount = async email => {
    const { cookies, request } = await getCookies(email)
    const id = (await request.json()).data._id

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
  }

  createNewDSO = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    const userId = (await request.json()).data._id
    dso['tokenSymbol'] = Date.now().toString().slice(-6)
    const createNewDSO = (
      await postRequest(dso, cookies, `issuance/dso/${userId}`).then(res =>
        res.json()
      )
    ).data.id

    const submitDSO = await postRequest(
      {},
      cookies,
      `issuance/dso/${userId}/${createNewDSO}/submit`,
      'PATCH'
    )
    return submitDSO
  }
  createBlockchainAddressByApi = async () => {
    const { cookies, request } = await getCookies(baseCreds.BANK_ACCOUNT)
    const id = (await request.json()).data._id
    blockchainAddresses['address'] =
      '0x5455D6D8ae4263d69b29d1DeD8eCD361b6' + Date.now().toString().slice(-6)
    const createBankAccount = await postRequest(
      blockchainAddresses,
      cookies,
      `accounts/withdrawal-addresses/${id}`
    )

    return createBankAccount
  }

  createCashWithdrawalRequestByApi = async () => {
    const { cookies, request } = await getCookies(baseCreds.AUTHORIZER_USER)
    const id = (await request.json()).data._id
    const createBankAccount = await postRequest(
      cashWithdrawal,
      cookies,
      text.requests.withdrawalsVirtualAccount
    )

    return createBankAccount
  }

  checkAuthorizePagesSearch = async (word, api) => {
    const locator = this.page.locator('input[type="text"]').first()
    await locator.type(word)
    await click(issuance.listings.buttons.SUBMIT, this.page)
    await waitForRequestInclude(this.page, baseCreds.BASE_API + api, 'POST')
    const table = await this.page.locator(invest.TABLE)
    // await navigate(baseCreds.URL + text.requests.bankAccount, this.page)

    return table
  }
  approve = async () => {
    await click(authorizerEl.buttons.APPROVE, this.page)
    await waitForRequestInclude(this.page, '/approve', 'PUT')
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
    await shouldExist(
      `${invest.TABLE} >> text="less than a minute ago"`,
      this.page
    )
  }
  rejectCashWithdraw = async () => {
    await this.reject()
    const message = await getMessage(
      baseCreds.AUTHORIZER_USER,
      this.page,
      'Your Withdrawal'
    )
    return message.subject
  }
  deleteBankAccount = async () => {
    await click(authorizerEl.buttons.MORE, this.page)
    await click(authorizerEl.buttons.REMOVE, this.page)
    const code = await this.page.$$('input')
    for (const digit of code) {
      await digit.fill('1')
    }
    await click(bankAccounts.buttons.CONFIRM, this.page)
    await waitForRequestInclude(this.page, '/remove', 'PUT')
  }
}
export { Authorizer }
