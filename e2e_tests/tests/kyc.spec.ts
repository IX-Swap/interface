import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'
import { individualKycFormData } from '../testData/kyc/kycFormData'
import { deleteUser } from '../helpers/api/generalApiHelper'

test.use({ recoveryPhrase: process.env.KYC_METAMASK_RECOVERY });

test.beforeEach(async ({ kovanNetwork, kycPage}) => {
  await kycPage.clickPassKycAsIndividualButton();
})

test.afterEach(async ({kycPage}) => {
  await deleteUser(await kycPage.getUserId(), await kycPage.getAuthToken(process.env.KYC_METAMASK_ADDRESS));
})

test.describe('Check KYC section functions', () => {
  test.describe('Check KYC section functions', () => {
    test('Test the ability to "Submit KYC" as "Individual"', async ({ kycPage, topNavigationBar, page }) => {
      await page.pause();
      await kycPage.fillKycForm(individualKycFormData);
      await kycPage.clickSubmitButton();

      await expect(kycPage.pendingApprovalStatus).toBeVisible();
      await expect(topNavigationBar.securityTokensButton).toHaveAttribute('disabled', '');
    })

    test.skip('Test the ability to "Submit KYC" as "Corporate"', async ({ kycPage, page }) => {
    })
  })

  test.describe('Check KYC section functions', () => {
    test.beforeEach(async ({ kycPage, adminPage,}) => {
      await kycPage.fillKycForm(individualKycFormData);
      await kycPage.clickSubmitButton();
      await expect(kycPage.pendingApprovalStatus).toBeVisible();
      await kycPage.openKycAdminPage();
      await adminPage.checkPendingStatusForCurrentUserIsVisible(individualKycFormData);
    })

    test('Check the KYC section for the "Approved" user', async ({ kycPage, adminPage, securityTokensPage, topNavigationBar, page }) => {
      await adminPage.clickReviewButtonOfCurrentUser(individualKycFormData);
      await adminPage.clickKycApproveButton();

      await kycPage.openKycPage();
      await kycPage.checkApprovedStatusIsVisible();

      await topNavigationBar.securityTokensButton.click();
      await expect(securityTokensPage.securityTokensTitle).toBeVisible();
    })

    test('Check the KYC section for the "Rejected" user', async ({ kycPage, adminPage, topNavigationBar, page }) => {
      await adminPage.clickReviewButtonOfCurrentUser(individualKycFormData);
      await adminPage.clickKycRejectButton();
      await adminPage.fillRejectAnnotationTextField(individualKycFormData.rejectAnnotation);
      await adminPage.clickSubmitPopUpButton();

      await kycPage.openKycPage();
      await kycPage.checkRejectedStatusIsVisible();
      await kycPage.checkRejectAnnotationTextIsVisible(individualKycFormData.rejectAnnotation);
      await expect(topNavigationBar.securityTokensButton).toHaveAttribute('disabled', '');
    })

    test('Check the KYC section for the "Changes requested" user', async ({ kycPage, adminPage, topNavigationBar, page }) => {
      await adminPage.clickReviewButtonOfCurrentUser(individualKycFormData);
      await adminPage.clickKycRequestAChangeButton();
      await adminPage.fillChangeRequestTextField(individualKycFormData.changeRequest);
      await adminPage.clickSubmitPopUpButton();

      await kycPage.openKycPage();
      await kycPage.checkChangesRequestStatusIsVisible();
      await kycPage.checkChangeRequestTextIsVisible(individualKycFormData.changeRequest);
      await expect(topNavigationBar.securityTokensButton).toHaveAttribute('disabled', '');

      await kycPage.clickMakeChangesAndResendKycButton();
      await expect(kycPage.personalInformationKycForm).toBeVisible();
    })
  })
})
