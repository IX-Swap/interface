import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { invest } from '../lib/selectors/invest'
import { baseCreds } from '../lib/helpers/creds'
import { bankAccount, rejectedApi, approvedApi, rejectedFunds } from '../lib/helpers/api-body'

import { navigate, click, getCount, waitForRequestInclude } from '../lib/helpers/helpers'
import { authorizerEl } from '../lib/selectors/authorizer'
import { text } from '../lib/helpers/text'

test.beforeEach(async ({ auth, page }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.AUTHORIZER_USER, baseCreds.PASSWORD)
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

  test('Bank account should be rejected from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.rejectBankAccount()
  })

  test('Bank account should be approved from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approveBankAccount()
  })
  test('Check view bank account from the dropdown list', async ({ page, authorizer }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/bank-accounts\/\S+\/view/g)
    await authorizer.approveBankAccount()
  })

  test('Search should work', async ({ authorizer, textHelper, page }) => {
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
  test.skip('(the functional has a bug)Search should work', async ({ authorizer }) => {
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

  test('Should be rejected from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    const message = await authorizer.rejectCashWithdraw()
    expect(message).toContain('Was Rejected')
  })

  test('Should be approved from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approveCashWithdraw()
  })

  test('Check view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/cash-withdrawals\/\S+\/view/g)
  })
})

test.describe('Check Individual Identities page', () => {
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    rejected = await authorizer.getDataForIdentityTable(rejectedApi)
    approved = await authorizer.getDataForIdentityTable(approvedApi)
    await click(authorizerEl.pages.INDIVIDUAL_IDENTITIES, page)
  })
  test('Check profile view from the dropdown list', async ({ page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(authorizerEl.buttons.VIEW, page)
    await expect(page).toHaveURL(/app\/authorizer\/individuals\/\S+\/view/g)
  })

  test('Search should work', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('Fredericka', text.requests.identityIndividualsList)
    await expect(table).toContainText('Fredericka')
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi)
    expect(rejected + 1).toEqual(allRejected)
  })
  test('Should be approved from the view page', async ({ authorizer, page }) => {
    await click(invest.buttons.VIEW_INVEST, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi)
    expect(approved + 1).toEqual(allApproved)
  })

  test('Should be rejected from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.reject()
    const allRejected = await authorizer.getDataForIdentityTable(rejectedApi)
    expect(rejected + 1).toEqual(allRejected)
  })

  test('Should be approved from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await authorizer.approve()
    const allApproved = await authorizer.getDataForIdentityTable(approvedApi)
    expect(approved + 1).toEqual(allApproved)
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

  test('Search should work', async ({ authorizer }) => {
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

  test('Search should work', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('Cucumber', corporate)
    await expect(table).toContainText('Cucumber')
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

  test.skip('(It needs to be fixed)Search should work', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('secondDSO', corporate)
    await expect(table).toContainText('secondDSO')
  })

  test('Should be rejected from the view page', async ({ authorizer, page }) => {
    await page.pause()
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

  test('Should be rejected from the table', async ({ authorizer, page }) => {
    await click(authorizerEl.buttons.MORE, page)
    await click(`${authorizerEl.DROP_DOWN}>> ${authorizerEl.buttons.REJECT}`, page)
    await waitForRequestInclude(page, '/reject', 'PUT')
    const allRejected = await authorizer.getDataForIdentityTable(rejectedFunds, corporate)
    expect(rejected + 1).toEqual(allRejected)
  })

  test.skip('Should be approved from the table', async ({ authorizer, page }) => {
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
  test.beforeEach(async ({ page, authorizer }) => {
    await authorizer.createBlockchainAddressByApi()
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.BLOCKCHAIN_ADDRESSES, page)
  })

  test.skip('Search should work', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('Cucumber', corporate)
    await expect(table).toContainText('Cucumber')
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
    await expect(page).toHaveURL(/app\/authorizer\/withdrawal-addresses\/\S+\/view/g)
  })
})

test.describe('Check Proposed Fundraising Details page', () => {
  const corporate = text.requests.proposedFundraisingDetails
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
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

test.describe('Check Listings page', () => {
  const corporate = text.requests.listing
  let approved, rejected
  test.beforeEach(async ({ page, authorizer }) => {
    rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
    approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
    await click(authorizerEl.pages.LISTINGS, page)
  })

  test.skip('Search should work', async ({ authorizer }) => {
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
    await expect(page).toHaveURL(/app\/authorizer\/listings\/\S+\/view/g)
  })
})

// test.describe('Check Virtual Accounts page', () => {
//   const corporate = text.requests.virtualAccounts
//   let approved, rejected
//   test.beforeEach(async ({ page, authorizer }) => {
//     const userEmail = await authorizer.getUserForVirtualAccountCreation()
//     await authorizer.createVirtualAccount(userEmail)
//     rejected = await authorizer.getDataForIdentityTable(rejectedApi, corporate)
//     approved = await authorizer.getDataForIdentityTable(approvedApi, corporate)
//     await click(authorizerEl.pages.VIRTUAL_ACCOUNT, page)
//   })
//   test('Check profile view from the dropdown list', async ({ page }) => {
//     await click(authorizerEl.buttons.MORE, page)
//     await click(authorizerEl.buttons.VIEW, page)
//     await expect(page).toHaveURL(
//       /app\/authorizer\/virtual-accounts\/\S+\/view/g
//     )
//   })

//   test('Should be rejected from the view page', async ({
//     authorizer,
//     page
//   }) => {
//     await click(invest.buttons.VIEW_INVEST, page)
//     await authorizer.reject()
//     const allRejected = await authorizer.getDataForIdentityTable(
//       rejectedApi,
//       corporate
//     )
//     expect(allRejected).toEqual(rejected + 1)
//   })

//   test('Should be rejected from the table', async ({ authorizer, page }) => {
//     await click(authorizerEl.buttons.MORE, page)
//     await authorizer.reject()
//     const allRejected = await authorizer.getDataForIdentityTable(
//       rejectedApi,
//       corporate
//     )
//     expect(rejected + 1).toEqual(allRejected)
//   })

//   test('Should be approved from the view page', async ({
//     authorizer,
//     page
//   }) => {
//     await click(invest.buttons.VIEW_INVEST, page)
//     await authorizer.approve()
//     const allApproved = await authorizer.getDataForIdentityTable(
//       approvedApi,
//       corporate
//     )
//     expect(approved + 1).toEqual(allApproved)
//   })
// })

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

  test('Search should work', async ({ authorizer }) => {
    const table = await authorizer.checkAuthorizePagesSearch('Cucumber', 'issuance/dso/deployments/list')
    await expect(table).toContainText('Cucumber')
  })
})
