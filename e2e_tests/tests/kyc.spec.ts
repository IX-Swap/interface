import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'
import { individualKycFormData } from '../testData/kyc/kycFormData'
import { deleteUser } from '../helpers/api/kycApiHelper'

test.use({ recoveryPhrase: process.env.KYC_METAMASK_RECOVERY });

test.beforeEach(async ({ kovanNetwork, kycPage}) => {
  await kycPage.clickPassKycAsIndividualButton();
})

test.afterEach(async ({kycPage}) => {
  await deleteUser(individualKycFormData.id, await kycPage.getAuthToken());
})

test.describe('Check KYC section functions', () => {
    test('Test the ability to "Submit KYC" as "Individual"', async ({ kycPage, page }) => {
      await kycPage.fillKycForm();
      await kycPage.clickSubmitButton();

      await expect(kycPage.pendingApprovalStatus).toBeVisible();
    })

    test.skip('Test the ability to "Submit KYC" as "Corporate"', async ({ kycPage, page }) => {
    })

    test('Check the KYC section for the "Approved" user', async ({ kycPage, page }) => {
      await kycPage.fillKycForm();
      await kycPage.clickSubmitButton();

      await expect(kycPage.pendingApprovalStatus).toBeVisible();

      await kycPage.openKycAdminPage();
      await expect(kycPage.pendingStatus).toBeVisible();

      await kycPage.clickReviewButton();
      await kycPage.clickKycApproveButton();

      await kycPage.openKycPage();
      await kycPage.checkApprovedStatusIsVisible();
    })

    test('Check the KYC section for the "Rejected" user', async ({ kycPage, page }) => {
      await kycPage.fillKycForm();
      await kycPage.clickSubmitButton();

      await expect(kycPage.pendingApprovalStatus).toBeVisible();

      await kycPage.openKycAdminPage();
      await expect(kycPage.pendingStatus).toBeVisible();

      await kycPage.clickReviewButton();
      await kycPage.clickKycRejectButton();
      await kycPage.fillRejectAnnotationTextField(individualKycFormData.rejectAnnotation);
      await kycPage.clickSubmitPopUpButton();

      await kycPage.openKycPage();
      await kycPage.checkRejectedStatusIsVisible();
      await kycPage.checkRejectAnnotationTextIsVisible(individualKycFormData.rejectAnnotation);
    })

    test('Check the KYC section for the "Changes requested" user', async ({ kycPage, page }) => {
      await kycPage.fillKycForm();
      await kycPage.clickSubmitButton();

      await expect(kycPage.pendingApprovalStatus).toBeVisible();

      await kycPage.openKycAdminPage();
      await expect(kycPage.pendingStatus).toBeVisible();

      await kycPage.clickReviewButton();
      await kycPage.clickKycRequestAChangeButton();
      await kycPage.fillChangeRequestTextField(individualKycFormData.changeRequest);
      await kycPage.clickSubmitPopUpButton();

      await kycPage.openKycPage();
      await kycPage.checkChangesRequestStatusIsVisible();
      await kycPage.checkChangeRequestTextIsVisible(individualKycFormData.changeRequest);
    })
})
