// const { getTestAttribute } = require("../helpers/helpers");

export const kyc = {
  USER_PHOTO:'[src*="blob:https://staging.mozork.com/"]',
  type: {
    INDIVIDUAL: '[href="/app/identity/individuals/create"]',
    CORPORATE: '[href="/app/identity/corporates/create"]',
    ISSUER: '[href="/app/identity/issuance/create-details-of-issuance"]',
  },
  buttons: {
    SUBMIT: "[type='submit']",
    // NEXT: '//button[text()="Next"]',
    OKAY: 'text="Okay"',
  },

  field: {
    corporate:{
      LOGO:'[id="logo"]',
      DOCUMENTS: '[id="representatives[0].documents"]',
      DESIGNATION:'[id="representatives[0].designation"]',
      FULL_NAME:'[id="representatives[0].fullName"]',
      EMAIL:'[name="representatives[0].email"]',
      OTHER:'[id="otherLegalEntityStatus"]',
      REGISTRATION_NUMBER : '[id="registrationNumber"]',
      LEGAL_ENTITY_STATUS : '[id="legalEntityStatus"]',
      LEGAL_ENTITY_VALUE:'[data-value="society"]',
      COMPANY_OF_INCORPORATION:'[id="countryOfFormation"]',
      NAME:'[id="companyLegalName"]',
      ADDRESS1:'[id="companyAddress.line1"]',
      ADDRESS2: '[id="companyAddress.line2"]',
      ADDRESS_COUNTRY:'[id="companyAddress.country"]',
      CITY:'[id="companyAddress.city"]',
      POSTAL_CODE:'[id="companyAddress.postalCode"]',
      STATE: 'input[id="companyAddress.state"]',

      



      directors:{
        DOCUMENTS: '[id="representatives[0].documents"]',
        DESIGNATION:'[id="directors[0].designation"]',
        FULL_NAME:'[id="directors[0].fullName"]',
        EMAIL:'[id="directors[0].email"]',
        OTHER:'[id="otherLegalEntityStatus"]',
        REGISTRATION_NUMBER : '[id="registrationNumber"]',
        LEGAL_ENTITY_STATUS : '[id="legalEntityStatus"]',
        COMPANY_OF_INCORPORATION:'[id="countryOfFormation"]',
        CORPORATE_NAME:'[id="companyLegalName"]',
        STATE: 'input[id="directors[0].address.state"]',
        ADDRESS1: 'input[name="directors[0].address.line1"]',
        ADDRESS2: 'input[name="directors[0].address.line2"]',
        CITY: 'input[id="directors[0].address.city"]',
        COUNTRY: '[id="directors[0].address.country"]',
        POSTAL_CODE:'[id="directors[0].address.postalCode"]',
        PROOF_IDENTITY:'[id="directors[0].documents.proofOfIdentity"]',
        PROOF_ADDRESS:'[id="directors[0].documents.proofOfAddress"]',
        BENEFICIAL_PROOF_ADDRESS:'[id="beneficialOwners[0].documents.proofOfAddress"]',
        BENEFICIAL_PROOF_IDENTITY:'[id="beneficialOwners[0].documents.proofOfIdentity"]',
        BENEFICIAL_FULL_NAME: '[id="beneficialOwners[0].fullName"]',
        PERCENTAGE_SHAREHOLDING: '[id="beneficialOwners[0].percentageShareholding"]', //in percent
        ADDRESS_COUNTRY: '[id="companyAddress.country"]',

  
      },
    },

    TAX_RESIDENT:'[id="taxResidencies[0].countryOfResidence"]',
    TAX_RESIDENT_VALUE:'[data-value="Ukraine"]',
    TAX_RESIDENT_IDENTIFICATION:'[id="taxResidencies[0].taxIdentificationNumber"]',
    PHONE_NUMBER: '[placeholder="+1 (702) 123-4567"]',
    DATA: '[placeholder="mm/dd/yyyy"]',
    PHOTO: "input#photo",
    POSTAL_CODE: 'input[name="address.postalCode"]',
    ADDRESS: 'input[name="address.state"]',
    ADDRESS1: 'input[name="address.line1"]',
    ADDRESS2: 'input[name="address.line2"]',
    CITIZENSHIP: '[id="nationality"]',
    CITIZENSHIP_VALUE:'[data-value="Ukrainian"]',
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
    CORPORATE_DOCUMENTS:'[id="corporateDocuments"]',
    FINANCIAL_DOCUMENTS:'[id="financialDocuments"]',
    EVIDENCE_ACCREDITATION:'[id="evidenceOfAccreditation"]'
  },

  checkbox: {
    investorStatusDeclaration:{first:'[name="assets"]'},
    INHERITANCE: 'input[name="sourceOfFund[0].checked"]',
    INVESTMENTS: 'input[name="sourceOfFund[1].checked"]',
    INHERITANCE_VALUE: '[id="sourceOfFund[0].value"]',
    INVESTMENTS_VALUE: '[id="sourceOfFund[1].value"]',
    I_READ_AGREE: '[class="first-time-flow__checkbox first-time-flow__terms"]',
    NO_SINGAPORE_RESIDENT: '[name="singaporeOnly"][value="no"]',
    YES_SINGAPORE_RESIDENT: '[name="singaporeOnly"][value="yes"]',
    NO_US_RESIDENT: '[name="fatca"][value="no"]',
    YES_US_RESIDENT: '[name="fatca"][value="yes"]',
    I_CONFIRM:'[name="optInAgreements"]',
    PERSONAL_ASSETS:'[name="personalAssets"]',
    INCOME:'[name="income"]',
    FINANCIAL_ASSET:'[name="financialAsset"]',
    JOINTLY_HELD_ACCOUNT : '[name="jointlyHeldAccount"]'

  },
};
