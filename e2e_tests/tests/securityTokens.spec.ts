import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'
import { deleteUser } from '../helpers/api/generalApiHelper'
import { createKycRequest } from '../helpers/api/kycApiHelper'
import { individualKycFormData, kycRequestBody } from '../testData/kyc/kycFormData'

test.use({ recoveryPhrase: process.env.SEC_METAMASK_RECOVERY });

test.beforeEach(async ({ kovanNetwork, kycPage, adminPage }) => {
  await createKycRequest(await kycPage.getAuthToken(process.env.SEC_METAMASK_ADDRESS), kycRequestBody);
  await adminPage.approveKycRequest(individualKycFormData);
  await kycPage.openKycPage();
  await kycPage.checkApprovedStatusIsVisible();
  })

test.afterEach(async ({kycPage}) => {
    await deleteUser(await kycPage.getUserId(), await kycPage.getAuthToken(process.env.SEC_METAMASK_ADDRESS));
  })

test.describe('Check Security Tokens functions', () => {
  test('Check UI for the "Security Tokens" section for the user with approved KYC', async ({ kycPage, securityTokensPage, topNavigationBar, page }) => {
    await topNavigationBar.securityTokensButton.click();
    await expect(securityTokensPage.securityTokensTitle).toBeVisible();
  })
})
