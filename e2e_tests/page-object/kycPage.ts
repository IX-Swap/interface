import { WebPage } from './webPage'
import { BrowserContext, expect, Locator, Page } from '@playwright/test'
import { MetamaskPage } from './metamaskPage'
import config from '../playwright.config'
import { individualKycFormData } from '../testData/kyc/kycFormData'

export class KycPage extends WebPage {
  readonly metamaskPage: MetamaskPage;
  readonly passKycAsIndividualButton: Locator;
  readonly passKycAsCorporateButton:Locator;
  readonly firstNameField: Locator;
  readonly middleNameField: Locator;
  readonly lastNameField: Locator;
  readonly dateOfBirthButton: Locator;
  readonly genderDropdown: Locator;
  readonly nationalityDropdown: Locator;
  readonly citizenshipDropdown: Locator;
  readonly phoneNumberField: Locator;
  readonly emailAddressField: Locator;
  readonly documentTypeDropdown: Locator;
  readonly documentNumberField: Locator;
  readonly documentIssueDateButton: Locator;
  readonly documentExpiryDateButton: Locator;
  readonly addressField: Locator;
  readonly postalCodeField: Locator;
  readonly countryDropdown: Locator;
  readonly cityField: Locator;
  readonly sourceOfFundsCheckbox: Locator;
  readonly investorStatusDeclarationToggle: Locator;
  readonly usCitizenshipDeclarationToggle: Locator;
  readonly occupationDropdown: Locator;
  readonly employmentStatusDropdown: Locator;
  readonly employerField: Locator;
  readonly incomeUsdDropdown: Locator;
  readonly proofOfIdentityFile: Locator;
  readonly proofOfAddressFile: Locator;
  readonly submitButton: Locator;
  readonly pendingApprovalStatus: Locator;
  readonly reviewButton: Locator;
  readonly kycApproveButton: Locator;
  readonly kycRejectButton: Locator;
  readonly kycRequestAChangeButton: Locator;
  readonly rejectAnnotationTextField: Locator;
  readonly submitRejectAnnotationButton: Locator;
  readonly pendingStatus: Locator;

  kycAdminURL = config.use.baseURL + '#/admin/kyc';
  kycURL = config.use.baseURL + '#/kyc';
  pendingApprovalText = 'Pending approval';
  changesRequestedText = 'Changes Requested';
  rejectedText = 'Rejected';

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.passKycAsIndividualButton = page.locator('[data-testid="passKycAsIndividualButton"]');
    this.passKycAsCorporateButton = page.locator('[data-testid="passKycAsCorporateButton"]');
    this.submitButton = page.locator('[data-testid="submitButton"]');
    this.pendingApprovalStatus = page.locator(`text=${this.pendingApprovalText}`);
    //PERSONAL INFORMATION
    this.firstNameField = page.locator(`[data-testid="firstNameInput"]`);
    this.middleNameField = page.locator(`[data-testid="middleNameInput"]`);
    this.lastNameField = page.locator(`[data-testid="lastNameInput"]`);
    this.dateOfBirthButton = page.locator(`[data-testid="dateOfBirthButton"]`);
    this.genderDropdown = page.locator(`[id="genderDropdown"]`);
    this.nationalityDropdown = page.locator(`[id="nationalityDropdown"]`);
    this.citizenshipDropdown = page.locator(`[id="citizenshipDropdown"]`);
    this.phoneNumberField = page.locator(`[type="tel"]`);
    this.emailAddressField = page.locator(`[data-testid="emailAddressField"]`);
    //IDENTITY DOCUMENT
    this.documentTypeDropdown = page.locator(`[id="documentTypeDropdown"]`);
    this.documentNumberField = page.locator(`[data-testid="documentNumberField"]`);
    this.documentIssueDateButton = page.locator(`[data-testid="documentIssueDateButton"]`);
    this.documentExpiryDateButton = page.locator(`[data-testid="documentExpiryDateButton"]`);
    //ADDRESS
    this.addressField = page.locator(`[data-testid="addressField"]`);
    this.postalCodeField = page.locator(`[data-testid="postalCodeField"]`);
    this.countryDropdown = page.locator(`[id="countryDropdown"]`);
    this.cityField = page.locator(`[data-testid="cityField"]`);
    //EMPLOYMENT INFORMATION
    this.occupationDropdown = page.locator(`[id="occupationDropdown"]`);
    this.employmentStatusDropdown = page.locator(`[id="employmentStatusDropdown"]`);
    this.employerField = page.locator(`[data-testid="employerField"]`);
    this.incomeUsdDropdown = page.locator(`[id="incomeUsdDropdown"]`);
    //UPLOAD DOCUMENTS
    this.proofOfIdentityFile = page.locator(`[type=file] >> nth=0`);
    this.proofOfAddressFile = page.locator(`[type=file] >> nth=1`);
    //Admin Section
    this.reviewButton = page.locator(`text=${individualKycFormData.firstName} ${individualKycFormData.lastName}I >> [data-testid="reviewButton"]`);
    this.kycApproveButton = page.locator('[data-testid="approveButton"]');
    this.kycRejectButton = page.locator('[data-testid="rejectButton"]');
    this.kycRequestAChangeButton = page.locator('[data-testid="changeRequestButton"]');
    this.rejectAnnotationTextField = page.locator('[data-testid="depositPopup"] >> textarea');
    this.submitRejectAnnotationButton = page.locator('[data-testid="depositPopup"] >> text=Submit')
    this.pendingStatus = page.locator(`text=${individualKycFormData.firstName} ${individualKycFormData.lastName}I >> [data-testid="Pending"]`)
  }
  //Assertions
  async checkPendingApprovalStatusIsVisible() {
    await expect(this.page.locator(`[data-testid="kycStatus"] >> text=Pending approval`)).toBeVisible();
  }

  async checkChangesRequestStatusIsVisible() {
    await expect(this.page.locator(`[data-testid="kycStatus"] >> text=Changes Requested`)).toBeVisible();
  }

  async checkRejectAnnotationTextIsVisible(rejectAnnotation) {
    await expect(this.page.locator(`text=${rejectAnnotation}`)).toBeVisible();
  }

  async checkRejectedStatusIsVisible() {
    await expect(this.page.locator(`[data-testid="kycStatus"] >> text=Rejected`)).toBeVisible();
  }

  async checkChangeRequestTextIsVisible(changeRequest) {
    await expect(this.page.locator(`text=${changeRequest}`)).toBeVisible();
  }

  //Actions
  async openKycPage() {
    await this.page.goto(this.kycURL);
    await this.page.reload();
  }

  async clickPassKycAsIndividualButton() {
    await this.passKycAsIndividualButton.click();
    await this.page.waitForLoadState();
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async fillKycForm() {
    await this.fillPersonalInformation();
    await this.fillIdentityDocument();
    await this.fillAddress();
    await this.pickSourceOfFunds(individualKycFormData.sourceOfFunds);
    await this.pickInvestorStatusDeclaration(individualKycFormData.investorStatusDeclaration);
    await this.pickUSCitizenship(individualKycFormData.FATCHA);
    await this.fillEmploymentInformation();
    await this.uploadProofOfIdentityFile();
    await this.uploadProofOfAddressFile();
  }

  //PERSONAL INFORMATION
  async fillFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillMiddleNameField(middleName) {
    await this.middleNameField.fill(middleName);
  }

  async fillLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async pickDate(year, month, day) {
    await this.page.click(`[data-mui-test="year-${year}"]`);
    await this.page.click(`[data-mui-test="month"] >> text=${month}`);
    await this.page.click(`[class="MuiPickersDay-dayLabel"] >> text=${day}`);
  }

  async pickDateOfBirth(year, month, day) {
    await this.dateOfBirthButton.click();
    await this.pickDate(year, month, day);
    await this.page.mouse.click(10, 10);
  }

  async pickGender(gender) {
    await this.genderDropdown.click();
    await this.page.click(`#react-select-3-listbox  >> text=${gender}`);
  }

  async pickNationality(nationality) {
    await this.nationalityDropdown.click();
    await this.page.click(`#react-select-5-listbox >> text=${nationality}`);
  }

  async pickCitizenship(citizenship) {
    await this.citizenshipDropdown.click();
    await this.page.click(`#react-select-7-listbox >> text=${citizenship}`);
  }

  async fillPhoneNumberField(phoneNumber) {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async fillEmailAddressField(emailAddress) {
    await this.emailAddressField.fill(emailAddress);
  }

  async fillPersonalInformation() {
    await this.fillFirstNameField(individualKycFormData.firstName);
    await this.fillMiddleNameField(individualKycFormData.middleName);
    await this.fillLastNameField(individualKycFormData.lastName);
    await this.pickDateOfBirth(1992, 'Oct', 13);
    await this.pickGender(individualKycFormData.gender);
    await this.pickNationality(individualKycFormData.nationality);
    await this.pickCitizenship(individualKycFormData.citizenship);
    await this.fillPhoneNumberField(individualKycFormData.phoneNumber);
    await this.fillEmailAddressField(individualKycFormData.emailAddress);
  }

  //IDENTITY DOCUMENT
  async pickDocumentType(docType) {
    await this.documentTypeDropdown.click();
    await this.page.click(`#react-select-9-listbox >> text=${docType}`);
  }

  async fillDocumentNumberField(documentNumber) {
    await this.documentNumberField.fill(documentNumber);
  }

  async pickDocumentIssueDate(year, month, day) {
    await this.documentIssueDateButton.click();
    await this.pickDate(year, month, day);
    await this.page.mouse.click(10, 10);
  }

  async pickDocumentExpiryDate(year, month, day) {
    await this.documentExpiryDateButton.click();
    await this.pickDate(year, month, day);
    await this.page.mouse.click(10, 10);
  }

  async fillIdentityDocument() {
    await this.pickDocumentType(individualKycFormData.documentType);
    await this.fillDocumentNumberField(individualKycFormData.documentNumber);
    await this.pickDocumentIssueDate(2021, 'Oct', 25);
    await this.pickDocumentExpiryDate(2024, 'Oct', 25);
  }

  //ADDRESS
  async fillAddressField(address) {
    await this.addressField.fill(address);
  }

  async fillPostalCodeField(postalCode) {
    await this.postalCodeField.fill(postalCode);
  }

  async pickCountry(country) {
    await this.countryDropdown.click();
    await this.page.click(`#react-select-11-listbox >> text=${country}`);
  }

  async fillCityField(city) {
    await this.cityField.fill(city);
  }

  async fillAddress() {
    await this.fillAddressField(individualKycFormData.address);
    await this.fillPostalCodeField(individualKycFormData.postalCode);
    await this.pickCountry(individualKycFormData.country);
    await this.fillCityField(individualKycFormData.city);
  }

  //SOURCE OF FUNDS
  async pickSourceOfFunds(source) {
    await this.page.click(`[id="${source}"]`);
  }

  //INVESTOR STATUS DECLARATION
  async pickInvestorStatusDeclaration(investorStatus) {
    await this.page.click(`[id="${investorStatus}"]`);
  }

  //FATCA
  async pickUSCitizenship(citizenship) {
    await this.page.click(`[id="${citizenship}"]`);
  }

  //EMPLOYMENT INFORMATION
  async pickOccupationDropdown(occupation) {
    await this.occupationDropdown.click();
    await this.page.click(`#react-select-13-listbox >> text=${occupation}`);
  }

  async pickEmploymentStatusDropdown(employmentStatus) {
    await this.employmentStatusDropdown.click();
    await this.page.click(`#react-select-15-listbox >> text=${employmentStatus}`);
  }

  async fillEmployerField(employer) {
    await this.employerField.fill(employer);
  }

  async pickIncomeUsdDropdown(incomeUsd) {
    await this.incomeUsdDropdown.click();
    await this.page.click(`#react-select-17-listbox >> text=${incomeUsd}`);
  }

  async fillEmploymentInformation() {
    await this.pickOccupationDropdown(individualKycFormData.occupation);
    await this.pickEmploymentStatusDropdown(individualKycFormData.employmentStatus);
    await this.fillEmployerField(individualKycFormData.employer);
    await this.pickIncomeUsdDropdown(individualKycFormData.incomeUsd);
  }

  //UPLOAD DOCUMENTS
  async uploadProofOfIdentityFile() {
    await this.proofOfIdentityFile.setInputFiles('testData/kycDocument.jpg');
  }

  async uploadProofOfAddressFile() {
    await this.proofOfAddressFile.setInputFiles('testData/kycDocument.jpg');
  }

  //Admin section
  async openKycAdminPage() {
    await this.page.goto(this.kycAdminURL);
    await this.page.waitForTimeout(35000);
    await this.page.reload();
  }

  async clickReviewButton() {
    await this.reviewButton.click();
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
    await this.page.waitForTimeout(15000);
  }
}
