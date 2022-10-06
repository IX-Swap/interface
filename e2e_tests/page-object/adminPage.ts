import { WebPage } from './webPage'
import { BrowserContext, expect, Locator, Page } from '@playwright/test'
import config from '../playwright.config'
import { createKycRequest } from '../helpers/api/kycApiHelper'
import { individualKycFormData, kycRequestBody } from '../testData/kyc/kycFormData'

export class AdminPage extends WebPage {
  readonly kycApproveButton: Locator;
  readonly kycRejectButton: Locator;
  readonly kycRequestAChangeButton: Locator;
  readonly rejectAnnotationTextField: Locator;
  readonly submitRejectAnnotationButton: Locator;

  kycAdminURL = config.use.baseURL + '#/admin/kyc';

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.kycApproveButton = page.locator('[data-testid="approveButton"]');
    this.kycRejectButton = page.locator('[data-testid="rejectButton"]');
    this.kycRequestAChangeButton = page.locator('[data-testid="changeRequestButton"]');
    this.rejectAnnotationTextField = page.locator('[data-testid="depositPopup"] >> textarea');
    this.submitRejectAnnotationButton = page.locator('[data-testid="depositPopup"] >> text=Submit')
  }

  //Assertions
  async checkPendingStatusForCurrentUserIsVisible(user) {
    const pendingStatusLocator = this.page.locator(`text=${user.firstName} ${user.lastName}I >> [data-testid="Pending"]`);
    await this.checkElementIsVisibleAfterReloadingPage(pendingStatusLocator);
  }

  //Actions
  async approveKycRequest(userData) {
    await this.openKycAdminPage();
    await this.checkPendingStatusForCurrentUserIsVisible(userData);
    await this.clickReviewButtonOfCurrentUser(userData);
    await this.clickKycApproveButton();
  }

  async openKycAdminPage() {
    await this.page.goto(this.kycAdminURL);
  }

  async clickReviewButtonOfCurrentUser(user) {
    await this.page.click(`text=${user.firstName} ${user.lastName}I >> [data-testid="reviewButton"]`);
  }

  async clickKycApproveButton() {
    await this.kycApproveButton.click();
  }

  async clickKycRejectButton() {
    await this.kycRejectButton.click();
  }

  async clickKycRequestAChangeButton() {
    await this.kycRequestAChangeButton.click();
  }

  async fillRejectAnnotationTextField(rejectAnnotation) {
    await this.rejectAnnotationTextField.fill(rejectAnnotation);
  }

  async fillChangeRequestTextField(changeRequest) {
    await this.rejectAnnotationTextField.fill(changeRequest);
  }

  async clickSubmitPopUpButton() {
    await this.submitRejectAnnotationButton.click();
  }
}
