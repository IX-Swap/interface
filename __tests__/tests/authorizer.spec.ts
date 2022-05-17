import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { invest } from '../lib/selectors/invest'
import { authorizerEl } from '../lib/selectors/authorizer'
import { text } from '../lib/helpers/text'
import {
  approveIdentity,
  createIdentity,
  createIssuerIdentity,
  userRegistrationConfirmation2FA
} from '../lib/api/create-identities'
import { baseCreds } from '../lib/helpers/creds'
import { bankAccount, rejectedApi, approvedApi, rejectedFunds, dso } from '../lib/api/api-body'
import * as individualBody from '../lib/api/individual-identity'
import {
  navigate,
  click,
  getCount,
  waitForRequestInclude,
  shouldNotExist,
  emailCreate,
  uploadFiles,
  shouldExist
} from '../lib/helpers/helpers'
import { issuance } from '../lib/selectors/issuance'

test.use({ storageState: './__tests__/lib/storages/authorizerStorageState.json' })

test.beforeEach(async ({ page }) => {
  await navigate(baseCreds.URL, page)
  await click(authorizerEl.AUTHORIZER, page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Check Dashboard page', () => {
  test.beforeEach(async ({ page }) => {
    await click(authorizerEl.pages.DASHBOARD, page)
  })
  test('The Dashboard page should be available', async ({ page }) => {
    await expect(page).toHaveURL(/app\/authorizer$/g)
  })

  test('All sections should be displayed on the table ', async ({ page }) => {
    const sections = await getCount(page, authorizerEl.PENDING_ITEMS)
    expect(sections).toBe(13)
  })
})

test.describe('Check The Bank Accounts page', () => {
  test.beforeEach(async ({ authorizer, page }) => {
    await authorizer.createBankAccountByApi()
    await click(authorizerEl.pages.BANK_ACCOUNTS, page)
  })

  test.afterEach(async ({ authorizer }) => {
    await authorizer.deleteBankAccount()
  })

  test('Bank account should be approved from bank account landing page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approveBankAccount()
  })

  test('Bank account should be rejected from bank account landing page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.rejectBankAccount()
  })

  test('Bank account should be rejected from the table(IXPRIME-487)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.rejectBankAccount()
  })

  test('Bank account should be approved from the table (IXPRIME-486)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approveBankAccount()
  })
  test('Check view bank account from the dropdown list', async ({ page, authorizer }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/bank-accounts\/\S+\/view/g)
    await authorizer.approveBankAccount()
  })

  test('Search should work (IXPRIME-576)', async ({ authorizer, textHelper, page }) => {
    const table = await authorizer.checkAuthorizePagesSearch(bankAccount.accountHolderName, 'accounts/banks/list')
    await expect(table).toContainText(bankAccount.accountHolderName)
    await navigate(baseCreds.URL + textHelper.requests.bankAccount, page)
  })
})

test.describe('Check Cash Withdraw page', () => {
  test.beforeEach(async ({ page, authorizer }) => {
    await authorizer.createCashWithdrawalRequestByApi()
    await click(authorizerEl.pages.CASH_WITHDRAWALS, page)
  })
  test.skip('(the functional has a bug)Search should work (IXPRIME-584)', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('Stevens', 'accounts/cash/withdrawals')
    await expect(table).toContainText('Stevens')
  })

  test('Should be approved from the CW landing page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approveCashWithdraw()
  })

  test('Should be rejected from the CW landing page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    const message = await authorizer.rejectCashWithdraw()
    expect(message).toContain('Was Rejected')
  })

  test('Should be rejected from the table(IXPRIME-557)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    const message = await authorizer.rejectCashWithdraw()
    expect(message).toContain('Was Rejected')
  })

  test('Should be approved from the table(IXPRIME-556)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approveCashWithdraw()
  })

  test('Check view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/cash-withdrawals\/\S+\/view/g)
  })
})

test.describe('Check Individual Identities view page ', () => {
  test.beforeEach(async ({ page }) => {
    await click(authorizerEl.pages.INDIVIDUAL_IDENTITIES, page)
  })

  test('Uploaded file display on the view page', async ({ authorizer, page }) => {
    await createIdentity(emailCreate(), 'individuals', individualBody)
    await click(invest.buttons.VIEW_INVEST, page)
    await uploadFiles(page, issuance.dso.fields.DATA_ROOM, text.docs.pdfFilePath)
    await authorizer.viewProfileCheckUploadDocument()
  })

  test('Uploaded file should be deleted', async ({ page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await uploadFiles(page, issuance.dso.fields.DATA_ROOM, text.docs.pdfFilePath)
    await shouldExist(authorizerEl.viewProfileSection.UPLOAD_DOCUMENT, page)
    await click(authorizerEl.viewProfileSection.DELETE_DOCUMENT_BUTTON, page)
    await shouldNotExist(authorizerEl.viewProfileSection.UPLOAD_DOCUMENT, page)
  })

  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/individuals\/\S+\/view/g)
  })

  test('Search should work (IXPRIME-568)', async ({ authorizer, page }) => {
    await navigate(baseCreds.URL + text.requests.individualsRejectedList, page)
    const table = await authorizer.checkAuthorizePagesSearch('Fredericka', text.requests.identityIndividualsList)
    await expect(table).toContainText('Fredericka')
  })
})

test.describe('Check Approve Individual Identities page ', () => {
  let approved
  test.beforeEach(async ({ page, authorizer }) => {
    await createIdentity(emailCreate(), 'individuals', individualBody)
    approved = await authorizer.getDataForIdentityTable(approvedApi)
    await click(authorizerEl.pages.INDIVIDUAL_IDENTITIES, page)
  })

  test('Should be approved from the view page', async ({ authorizer, page }) => {
    await navigate(baseCreds.URL + text.requests.individualsRejectedList, page)
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be approved from the table(IXPRIME-562)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi)
    expect(approved + 1).toEqual(allApproved)
  })
})

test.describe('Check Reject Individual Identities page ', () => {
  let rejected
  test.beforeEach(async ({ page, authorizer }) => {
    await createIdentity(emailCreate(), 'individuals', individualBody)
    rejected = await authorizer.getDataForIdentityTable(rejectedApi)
    await click(authorizerEl.pages.INDIVIDUAL_IDENTITIES, page)
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be rejected from the table (IXPRIME-563)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi)
    expect(rejected + 1).toEqual(allRejected)
  })
})

test.describe('Check Corporate Identities page', () => {
  const corporate = text.requests.identityCorporatesList
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.CORPORATE_IDENTITIES, page)
  })

  test.skip(' NEED TO FIX BUG Uploaded file display on the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await uploadFiles(page, issuance.dso.fields.DATA_ROOM, text.docs.pdfFilePath)
    await authorizer.viewProfileCheckUploadDocument()
  })

  test('Search should work (IXPRIME-606)', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('middle', corporate)
    await expect(table).toContainText('middle')
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be rejected from the table(IXPRIME-600)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the table (IXPRIME-599)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/corporates\/\S+\/view/g)
  })
})

test.describe('Check Issuance Offerings page', () => {
  const corporate = text.requests.dsoList
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    await authorizer.createNewDSO()
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.ISSUANCE_OFFERINGS, page)
  })

  test('Search should work (IXPRIME-638)', async ({ authorizer, page }) => {
    const table = await authorizer.checkAuthorizePagesSearch(dso.tokenName, corporate)
    await expect(table).toContainText(dso.tokenName)
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be rejected from the table (IXPRIME-633)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the table (IXPRIME-632)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/offerings\/\S+\/view/g)
  })
})

test.describe('Check Deal Closure page', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(baseCreds.URL + 'app/authorizer/closure?authorizationStatus=', page)
  })
  test.skip('(bug)Search should work', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('Fund test', 'issuance/closure/list')
    await expect(table).toContainText('Fund test')
  })

  test('The Deal Closure view page should be available', async ({ page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await expect(page).toHaveURL(/app\/authorizer\/closure\/\S+\/view/g)
  })
})

test.describe('Check Commitments page', () => {
  const corporate = text.requests.commitments
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    await authorizer.createCommitmentsByApi()
    rejected = await authorizer.getDataForIdentityTable(rejectedFunds, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.COMMITMENTS, page)
  })

  test.skip('(It needs to be fixed)Search should work (IXPRIME-660)', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('secondDSO', corporate)
    await expect(table).toContainText('secondDSO')
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedFunds, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test.skip('Should be approved from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be rejected from the table (IXPRIME-649)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(`${authorizerEl.DROP_DOWN}>> ${authorizerEl.buttons.REJECT}`, page)
    await waitForRequestInclude(page, '/reject', 'PUT')
    const allRejected = await authorizer.getDataForIdentityTable(rejectedFunds, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test.skip('Should be approved from the table (IXPRIME-648)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/commitments\/\S+\/view/g)
  })
})

test.describe('Check Blockchain Addresses page', () => {
  const corporate = text.requests.blockchainAddresses
  let approved, rejected
  const identityType = 'individuals'

  test.beforeEach(async ({ page, authorizer }) => {
    const email = emailCreate()
    const identityResponce = await createIdentity(email, identityType, individualBody)
    await approveIdentity(identityResponce.submitId, identityType)
    await authorizer.createBlockchainAddressByApi(email)
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.BLOCKCHAIN_ADDRESSES, page)
  })

  // test('Search should work (IXPRIME-676)', async ({ authorizer }) => {
  //   const table = await authorizer.checkAuthorizePagesSearch('Cucumber', corporate)
  //   await expect(table).toContainText('Cucumber')
  // })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be rejected from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/withdrawal-addresses\/\S+\/view/g)
  })
})

test.describe('Check Proposed Fundraising Details page', () => {
  const corporate = text.requests.proposedFundraisingDetails
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    let email = emailCreate()
    await createIssuerIdentity(email, 'issuance-detail')
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.PROPOSED_FUNDRAISING_DETAILS, page)
  })

  test('Search should work', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('Issuer FULL NAME', corporate)
    await expect(table).toContainText('Issuer FULL NAME')
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be rejected from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/issuance-details\/\S+\/view/g)
  })
})

test.skip('Check Listings page', () => {
  const corporate = text.requests.listing
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.LISTINGS, page)
  })

  test.skip('Search should work (IXPRIME-707)', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('TokenName', corporate)
    await expect(table).toContainText('TokenName')
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be rejected from the table (IXPRIME-702)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the table (IXPRIME-701)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/listings\/\S+\/view/g)
  })
})

test.describe('Check Virtual Accounts page', () => {
  const corporate = text.requests.virtualAccounts
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    const userEmail = emailCreate()
    await userRegistrationConfirmation2FA(userEmail)
    await authorizer.createVirtualAccount(userEmail)
    rejectedApi['isAssigned'] = false
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.VIRTUAL_ACCOUNT, page)
  })
  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/virtual-accounts\/\S+\/view/g)
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(allRejected).toEqual(rejected + 1)
  })

  test('Should be rejected from the table (IXPRIME-717)', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the view page (IXPRIME-716)', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    expect(approved + 1).toEqual(allApproved)
  })
})

test.describe('Check Token Deployment page', () => {
  test.beforeEach(async ({ page }) => {
    await click(authorizerEl.pages.TOKEN_DEPLOYMENT, page)
  })
  test('The Token view page should be available', async ({ page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await expect(page).toHaveURL(/app\/authorizer\/token-deployment\/\S+\/view/g)
  })

  test('Check that tokens only with pending status ', async ({ page }) => {
    await click('text="Pending"', page)
    const pending = await getCount(page, 'text="PENDING"')
    const rowsOnTable = await page.locator(invest.ROW).count()
    expect(pending).toBe(rowsOnTable)
  })

  test('Check that tokens only with Deployed status ', async ({ page }) => {
    await click('text="Deployed"', page)
    const pending = await getCount(page, 'text="DEPLOYED"')
    const rowsOnTable = await page.locator(invest.ROW).count()
    expect(pending).toBe(rowsOnTable)
  })

  test('Search should work (IXPRIME-734)', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch(dso.tokenName, 'issuance/dso/deployments/list')
    await expect(table).toContainText(dso.tokenName)
  })
})

// test.describe('Negative tests Individual identities section', () => {
//   test.beforeEach(async ({ invest, page }) => {
//     await click(authorizerEl.pages.INDIVIDUAL_IDENTITIES, page)
//     await click(invest.buttons.VIEW_INVEST, page)
//   })
//   test.only('The dropdown should be disabled', async ({ page }) => {
//     await shouldNotExist(authorizerEl.DROP_DOWN, page)
//   })
// })
