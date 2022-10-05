import { WebPage } from './webPage'
import { BrowserContext, expect, Locator, Page } from '@playwright/test'
import { MetamaskPage } from './metamaskPage'
import config from '../playwright.config'

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
  readonly kycStatusBlock: string;
  readonly makeChangesAndResendKycButton: Locator;
  readonly personalInformationKycForm: Locator;
  readonly dropdownListBlock: string;
  readonly sourceOfFunds: Locator;

  readonly countryOfTaxDeclarationDropdown: Locator;
  readonly taxIdentificationNumberField: Locator;
  readonly retailInvestorToggle: Locator;

  kycAdminURL = config.use.baseURL + '#/admin/kyc';
  kycURL = config.use.baseURL + '#/kyc';
  pendingApprovalText = 'Pending approval';
  changesRequestedText = 'Changes Requested';
  rejectedText = 'Rejected';
  approvedText = 'Approved';

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.passKycAsIndividualButton = page.locator('[data-testid="passKycAsIndividualButton"]');
    this.passKycAsCorporateButton = page.locator('[data-testid="passKycAsCorporateButton"]');
    this.submitButton = page.locator('[data-testid="submitButton"]');
    this.pendingApprovalStatus = page.locator(`text=${this.pendingApprovalText}`);
    this.kycStatusBlock = (`[data-testid="kycStatus"]`);
    this.makeChangesAndResendKycButton = page.locator('[data-testid="makeChangesAndResendKycButton"]');
    this.personalInformationKycForm = page.locator('[id="personal"]');
    this.dropdownListBlock = ('[id*=react-select]');
    this.countryOfTaxDeclarationDropdown = page.locator('[id="countryOfTaxDeclaration"]');
    this.taxIdentificationNumberField = page.locator('[data-testid="taxIdentificationNumberField"]');
    this.retailInvestorToggle = page.locator('[id="retailInvestorToggle"]')
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
    this.sourceOfFunds = page.locator(`[id="sourceOfFundsDropdown"]`);
    //UPLOAD DOCUMENTS
    this.proofOfIdentityFile = page.locator(`[type=file] >> nth=0`);
    this.proofOfAddressFile = page.locator(`[type=file] >> nth=1`);

    // Country of Tax Declaration
    // Tax Identification Number (TIN)
    // INVESTOR DECLARATION

  }
  //Assertions
  async checkPendingApprovalStatusIsVisible() {
    await expect(this.page.locator(`${this.kycStatusBlock} >> text=${this.pendingApprovalText}`)).toBeVisible();
  }

  async checkApprovedStatusIsVisible() {
    const approvedStatusLocator = this.page.locator(`${this.kycStatusBlock} >> text=${this.approvedText}`);
    await this.checkElementIsVisibleAfterReloadingPage(approvedStatusLocator);
  }

  async checkChangesRequestStatusIsVisible() {
    const changesRequestStatusLocator = this.page.locator(`${this.kycStatusBlock} >> text=${this.changesRequestedText}`);
    await this.checkElementIsVisibleAfterReloadingPage(changesRequestStatusLocator);
  }

  async checkRejectAnnotationTextIsVisible(rejectAnnotation) {
    await expect(this.page.locator(`text=${rejectAnnotation}`)).toBeVisible();
  }

  async checkRejectedStatusIsVisible() {
    const rejectedStatusLocator = this.page.locator(`${this.kycStatusBlock} >> text=${this.rejectedText}`);
    await this.checkElementIsVisibleAfterReloadingPage(rejectedStatusLocator);
  }

  async checkChangeRequestTextIsVisible(changeRequest) {
    await expect(this.page.locator(`text=${changeRequest}`)).toBeVisible();
  }

  //Actions
  async openKycPage() {
    await this.page.goto(this.kycURL);
    await this.page.reload();
  }

  async openKycAdminPage() {
    await this.page.goto(this.kycAdminURL);
  }

  async clickPassKycAsIndividualButton() {
    await this.passKycAsIndividualButton.click();
    await this.page.waitForLoadState();
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async clickMakeChangesAndResendKycButton() {
    await this.makeChangesAndResendKycButton.click();
  }

  async fillKycForm(userData) {
    await this.fillPersonalInformation(userData);
    await this.fillIdentityDocument(userData);
    await this.fillAddress(userData);
    await this.pickSourceOfFunds(userData.sourceOfFunds);
    await this.pickInvestorStatusDeclaration(userData.investorStatusDeclaration);
    await this.pickUSCitizenship(userData.FATCHA);
    await this.fillEmploymentInformation(userData);
    await this.uploadProofOfIdentityFile(userData);
    await this.uploadProofOfAddressFile(userData);
    await this.pickCountryOfTaxDeclarationDropdown(userData.country);
    await this.fillTaxIdentificationNumberField(userData.taxIdentificationNumber);
    await this.clickRetailInvestorToggle();
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
    await this.page.mouse.click(10, 10);
  }

  async pickDateOfBirth(year, month, day) {
    await this.dateOfBirthButton.click();
    await this.pickDate(year, month, day);
  }

  async pickGender(gender) {
    await this.genderDropdown.click();
    await this.page.click(`${this.dropdownListBlock}  >> text=${gender}`);
  }

  async pickNationality(nationality) {
    await this.nationalityDropdown.click();
    await this.page.click(`${this.dropdownListBlock} >> text=${nationality}`);
  }

  async pickCitizenship(citizenship) {
    await this.citizenshipDropdown.click();
    await this.page.click(`${this.dropdownListBlock} >> text=${citizenship}`);
  }

  async fillPhoneNumberField(phoneNumber) {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async fillEmailAddressField(emailAddress) {
    await this.emailAddressField.fill(emailAddress);
  }

  async fillPersonalInformation(userData) {
    await this.fillFirstNameField(userData.firstName);
    await this.fillMiddleNameField(userData.middleName);
    await this.fillLastNameField(userData.lastName);
    await this.pickDateOfBirth(userData.dateOfBirthYear, userData.dateOfBirthMonth, userData.dateOfBirthDay);
    await this.pickGender(userData.gender);
    await this.pickNationality(userData.nationality);
    await this.pickCitizenship(userData.citizenship);
    await this.fillPhoneNumberField(userData.phoneNumber);
    await this.fillEmailAddressField(userData.emailAddress);
  }

  //IDENTITY DOCUMENT
  async pickDocumentType(docType) {
    await this.documentTypeDropdown.click();
    await this.page.click(`${this.dropdownListBlock} >> text=${docType}`);
  }

  async fillDocumentNumberField(documentNumber) {
    await this.documentNumberField.fill(documentNumber);
  }

  async pickDocumentIssueDate(year, month, day) {
    await this.documentIssueDateButton.click();
    await this.pickDate(year, month, day);
  }

  async pickDocumentExpiryDate(year, month, day) {
    await this.documentExpiryDateButton.click();
    await this.pickDate(year, month, day);
  }

  async fillIdentityDocument(userData) {
    await this.pickDocumentType(userData.documentType);
    await this.fillDocumentNumberField(userData.documentNumber);
    await this.pickDocumentIssueDate(userData.documentIssueYear, userData.documentIssueMonth, userData.documentIssueDay);
    await this.pickDocumentExpiryDate(userData.documentExpiryYear, userData.documentExpiryMonth, userData.documentExpiryDay);
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
    await this.page.click(`${this.dropdownListBlock} >> text=${country}`);
  }

  async fillCityField(city) {
    await this.cityField.fill(city);
  }

  async fillAddress(userData) {
    await this.fillAddressField(userData.address);
    await this.fillPostalCodeField(userData.postalCode);
    await this.pickCountry(userData.country);
    await this.fillCityField(userData.city);
  }

  //SOURCE OF FUNDS
  async pickSourceOfFunds(source) {
    await this.sourceOfFunds.click();
    await this.page.click(`${this.dropdownListBlock} >> text=${source}`);
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
    await this.page.click(`${this.dropdownListBlock} >> text=${occupation}`);
  }

  async pickEmploymentStatusDropdown(employmentStatus) {
    await this.employmentStatusDropdown.click();
    await this.page.click(`${this.dropdownListBlock} >> text=${employmentStatus}`);
  }

  async fillEmployerField(employer) {
    await this.employerField.fill(employer);
  }

  async pickIncomeUsdDropdown(incomeUsd) {
    await this.incomeUsdDropdown.click();
    await this.page.click(`${this.dropdownListBlock} >> text=${incomeUsd}`);
  }

  async fillEmploymentInformation(userData) {
    await this.pickOccupationDropdown(userData.occupation);
    await this.pickEmploymentStatusDropdown(userData.employmentStatus);
    await this.fillEmployerField(userData.employer);
    await this.pickIncomeUsdDropdown(userData.incomeUsd);
  }

  //UPLOAD DOCUMENTS
  async uploadProofOfIdentityFile(userData) {
    await this.proofOfIdentityFile.setInputFiles(userData.documentFilePath);
  }

  async uploadProofOfAddressFile(userData) {
    await this.proofOfAddressFile.setInputFiles(userData.documentFilePath);
  }

  //TAX DECLARATION
  async pickCountryOfTaxDeclarationDropdown(countryOfTaxDeclaration) {
    await this.countryOfTaxDeclarationDropdown.click();
    await this.page.click(`${this.dropdownListBlock} >> text=${countryOfTaxDeclaration}`);
  }

  async fillTaxIdentificationNumberField(taxNumber) {
    await this.taxIdentificationNumberField.fill(taxNumber);
  }

  //INVESTOR STATUS DECLARATION
  async clickRetailInvestorToggle() {
    await this.retailInvestorToggle.click();
  }
}
