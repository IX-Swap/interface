// const { getTestAttribute } = require("../helpers/helpers");

export const kyc = {
  NOTIFICATION: '[appearance="success"]',
  DIALOG_VIEW: '[role="dialog"]',
  MY_PROFILE: '[aria-controls="profile-menu"]',

  USER_PHOTO: '[src*="blob:https://staging.mozork.com/"]',
  type: {
    INDIVIDUAL: '[href="/app/identity/individuals/create"]',
    CORPORATE: '[href="/app/identity/corporates/create"]',
    ISSUER: '[href="/app/identity/issuance/create-details-of-issuance"]'
  },
  buttons: {
    SUBMIT: "[type='submit']",
    // NEXT: '//button[text()="Next"]',
    SUBMIT_TEXT: '//*[text()="Submit"]',
    OKAY: 'text="Okay"',
    CLICK_HERE: 'text="Click here"',
    FATCA: 'span >> text=FATCA'
  },

  field: {
    issuer: {
      COMPANY_NAME: '[name="companyName"]',
      INDUSTRY: '[name="industry"]',
      FR_AMOUNT: '[name="fundRaisingAmount"]',
      DETAILS: '[name="detail"]',
      FULL_NAME: '[name="directors[0].fullName"]'
    },
    corporate: {
      LOGO: '[id="logo"]',
      DOCUMENTS: '[id="representatives[0].documents"]',
      DESIGNATION: '[id="representatives[0].designation"]',
      OTHER: '[id="otherLegalEntityStatus"]',
      LEGAL_ENTITY_STATUS: '[id="legalEntityStatus"]',
      LEGAL_ENTITY_VALUE: '[data-value="society"]',
      COMPANY_OF_INCORPORATION: '[id="countryOfFormation"]',
      NAME: '[id="companyLegalName"]',
      ADDRESS1: '[id="companyAddress.line1"]',
      ADDRESS2: '[id="companyAddress.line2"]',
      ADDRESS_COUNTRY: '[id="companyAddress.country"]',
      CITY: '[id="companyAddress.city"]',
      POSTAL_CODE: '[id="companyAddress.postalCode"]',
      STATE: 'input[id="companyAddress.state"]',
      DOCS_INDIVIDUAL: [
        '[id="proofOfIdentity"]',
        '[name="proofOfAddress"]',
        '[name="evidenceOfAccreditation"]'
      ],
      DOCS_ISSUER: ['[id="corporateDocuments"]', '[id="financialDocuments"]'],

      directors: {
        DOCUMENTS: '[id="representatives[0].documents"]',
        DESIGNATION: '[id="directors[0].designation"]',
        OTHER: '[id="otherLegalEntityStatus"]',
        LEGAL_ENTITY_STATUS: '[id="legalEntityStatus"]',
        COMPANY_OF_INCORPORATION: '[id="countryOfFormation"]',
        CORPORATE_NAME: '[id="companyLegalName"]',
        STATE: 'input[id="directors[0].address.state"]',
        ADDRESS1: 'input[name="directors[0].address.line1"]',
        ADDRESS2: 'input[name="directors[0].address.line2"]',
        CITY: 'input[id="directors[0].address.city"]',
        COUNTRY: '[id="directors[0].address.country"]',
        POSTAL_CODE: '[id="directors[0].address.postalCode"]',
        PROOF_IDENTITY: '[id="directors[0].documents.proofOfIdentity"]',
        PROOF_ADDRESS: '[id="directors[0].documents.proofOfAddress"]',
        BENEFICIAL_PROOF_ADDRESS:
          '[id="beneficialOwners[0].documents.proofOfAddress"]',
        BENEFICIAL_PROOF_IDENTITY:
          '[id="beneficialOwners[0].documents.proofOfIdentity"]',
        PERCENTAGE_SHAREHOLDING:
          '[id="beneficialOwners[0].percentageShareholding"]', //in percent
        ADDRESS_COUNTRY: '[id="companyAddress.country"]'
      }
    },
    BENEFICIAL_FULL_NAME: '[name="beneficialOwners[0].fullName"]',
    EMAIL: '[name*="email"]',
    FULL_NAME: '[name*="fullName"]',
    REGISTRATION_NUMBER: '[name*="egistrationNumber"]',
    TAX_RESIDENT: '[id="taxResidencies[0].countryOfResidence"]',
    TAX_RESIDENT_VALUE: '[data-value="Ukraine"]',
    TAX_RESIDENT_IDENTIFICATION:
      '[id="taxResidencies[0].taxIdentificationNumber"]',
    PHONE_NUMBER: '[placeholder="+1 (702) 123-4567"]',
    DATA: '[placeholder="mm/dd/yyyy"]',
    PHOTO: 'input#photo',
    POSTAL_CODE: 'input[name="address.postalCode"]',
    ADDRESS: 'input[name="address.state"]',
    ADDRESS1: 'input[name="address.line1"]',
    ADDRESS2: 'input[name="address.line2"]',
    CITIZENSHIP: '[id="nationality"]',
    CITIZENSHIP_VALUE: '[data-value="Ukrainian"]',
    ADDRESS_COUNTRY: '[id="address.country"]',
    CITY: 'input[name="address.city"]',
    MIDDLENAME: 'input[name="middleName"]',
    NATIONAL: '[name="nationality"]',
    OCCUPATION: '[id="occupation"]',
    EMPLOYMENT_STATUS: '[id="employmentStatus"]',
    STATUS: '[data-value="Own Business"]',
    EMPLOYER: '[name="employer"]',
    INCOME: '[id="annualIncome"]',
    SET_INCOME: '[data-value="< 50,000"]',
    IDENTIFICATION_NUMBER: '[id="taxResidencies[0].taxIdentificationNumber"]',
    CORPORATE_DOCUMENTS: '[id="corporateDocuments"]',
    FINANCIAL_DOCUMENTS: '[id="financialDocuments"]',
    EVIDENCE_ACCREDITATION: '[id="evidenceOfAccreditation"]',
    FILES: '[type="file"]'
  },

  checkbox: {
    investorStatusDeclaration: { first: '[name="assets"]' },
    INHERITANCE: 'input[name="sourceOfFund[0].checked"]',
    INVESTMENTS: 'input[name="sourceOfFund[1].checked"]',
    INHERITANCE_VALUE: '[id="sourceOfFund[0].value"]',
    INVESTMENTS_VALUE: '[id="sourceOfFund[1].value"]',
    I_READ_AGREE: '[class="first-time-flow__checkbox first-time-flow__terms"]',
    NO_SINGAPORE_RESIDENT: '[name="singaporeOnly"][value="no"]',
    YES_SINGAPORE_RESIDENT: '[name="singaporeOnly"][value="yes"]',
    NO_US_RESIDENT: '[name="fatca"][value="no"]',
    YES_US_RESIDENT: '[name="fatca"][value="yes"]',
    I_CONFIRM: '[name="optInAgreements"]',
    PERSONAL_ASSETS: '[name="personalAssets"]',
    INCOME: '[name="income"]',
    FINANCIAL_ASSET: '[name="financialAsset"]',
    JOINTLY_HELD_ACCOUNT: '[name="jointlyHeldAccount"]'
  }
}
