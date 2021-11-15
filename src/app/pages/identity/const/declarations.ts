import { Maybe } from 'types/util'
import { DeclarationTemplate } from 'app/pages/identity/types/forms'

export const MAX_TAX_RESIDENCIES = 5

export enum DeclarationValue {
  Yes = 'Yes',
  No = 'No'
}

export interface IndividualDeclarations<TValue = Maybe<DeclarationValue>> {
  NetPersonalAssets: TValue
  IndividualIncome: TValue
  IndividualFinancialAsset: TValue
  JointlyHeldAccount: TValue
  InvestaXPrivacyPolicy: TValue
  InvestaXTermsOfUse: TValue
  USPerson: TValue
  TreatAsAccreditedInvestor: TValue
  PrimaryIssuancePlatform: TValue
  TrueAndCorrectInformation: TValue
  InformAnyChanges: TValue
}

export interface CorporateDeclarations<TValue = Maybe<DeclarationValue>> {
  AuthorizeAccountOpening: TValue
  NetAssets: TValue
  ShareholderIsAccreditedInvestor: TValue
  AllPartnersAreAccreditedInvestors: TValue
  AllBeneficiariesAreAccreditedInvestors: TValue
  InvestaXPrivacyPolicy: TValue
  InvestaXTermsOfUse: TValue
  USPerson: TValue
  TreatAsAccreditedInvestor: TValue
  PrimaryIssuancePlatform: TValue
  TrueAndCorrectInformation: TValue
  InformAnyChanges: TValue
}

export type AllDeclarations<TValue = Maybe<DeclarationValue>> =
  CorporateDeclarations<TValue> & IndividualDeclarations<TValue>

export const individualDeclarationsTemplate: IndividualDeclarations<DeclarationTemplate> =
  {
    NetPersonalAssets: {
      key: 'NetPersonalAssets',
      header:
        'The Applicant qualifies as an "Individual Accredited Investor" (as defined in Section 4A (1)(a)(i) of the Securities and Futures Act (“SFA”), Chapter 289):',
      content:
        'Individual total net personal assets (including up to SGD 1 million of your primary residence) exceed SGD 2 million or its equivalent in foreign currency ; or',
      value: null,
      subLevel: true,
      answerable: true
    },
    IndividualIncome: {
      key: 'IndividualIncome',
      content:
        'Individual income in the preceding 12 months is not less than SGD300,000 or its equivalent in foreign currency; or',
      value: null,
      answerable: true,
      subLevel: true
    },
    IndividualFinancialAsset: {
      key: 'IndividualFinancialAsset',
      content:
        'Individual financial asset (e.g. deposits and investment products) exceed SGD 1 million or its equivalent in foreign currency; or',
      value: null,
      answerable: true,
      subLevel: true
    },
    JointlyHeldAccount: {
      key: 'JointlyHeldAccount',
      content:
        'Jointly held account with an individual meeting any of the above',
      value: null,
      answerable: true,
      subLevel: true,
      lastLine: true
    },
    InvestaXPrivacyPolicy: {
      key: 'InvestaXPrivacyPolicy',
      content: "The Applicant has read and agrees to InvestaX's [LINK].",
      value: null,
      answerable: true,
      lastLine: true
    },
    InvestaXTermsOfUse: {
      key: 'InvestaXTermsOfUse',
      content: "The Applicant has read and agrees to InvestaX's [LINK].",
      value: null,
      answerable: true,
      lastLine: true
    },
    USPerson: {
      key: 'USPerson',
      content:
        'The Applicant declares that it is not a "U.S. Person" for U.S. federal income tax purposes. <br /> (Please submit [LINK] (whichever is applicable) and satisfactory documentary evidence.)',
      value: null,
      answerable: true,
      lastLine: true
    },
    TreatAsAccreditedInvestor: {
      key: 'TreatAsAccreditedInvestor',
      content:
        'The Applicant elects to be and agrees to be treated as an "Accredited Investor".',
      footer: [
        'Applicant has been informed of and understands the consequences of being treated as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.',
        'Applicant has been informed of and understands its right to opt out of the Accredited Investors status with InvestaX at any point in time after consent has been given, upon which InvestaX will process your election to opt out within 14 business days from receipt.'
      ],
      value: null,
      answerable: true,
      lastLine: true
    },
    PrimaryIssuancePlatform: {
      key: 'PrimaryIssuancePlatform',
      header: 'The Applicant acknowledges and understands:',
      content:
        'InvestaX operates its primary issuance platform as a capital markets services licensee under the SFA (Cap. 289) of Singapore for dealing in capital markets products that are securities and units in a collective investment schemes, and an exempt financial advisor for the provision of advice on units in collective investment schemes, under license number CMS100635-1.',
      value: null,
      answerable: true,
      subLevel: true,
      lastLine: true
    },
    TrueAndCorrectInformation: {
      key: 'TrueAndCorrectInformation',
      content:
        'The applicant confirm that all information provided above and all documents provided or to be provided to InvestaX are true and correct to the best of my knowledge and you may rely on the accuracy thereof',
      value: null,
      answerable: true,
      lastLine: true
    },
    InformAnyChanges: {
      key: 'InformAnyChanges',
      content:
        'The applicant undertake to promptly inform InvestaX if there should be any changes in my/our circumstances which would result in a change of investor status',
      value: null,
      answerable: true,
      lastLine: true
    }
  }

export const corporateDeclarationsTemplate: CorporateDeclarations<DeclarationTemplate> =
  {
    AuthorizeAccountOpening: {
      key: 'AuthorizeAccountOpening',
      content:
        'The User declares that he/she has the authority to open an account with InvestaX on behalf of the Applicant and bind the Applicant, and to submit all documents on behalf of the Applicant in connection with the account opening.',
      value: null,
      answerable: true,
      lastLine: true
    },
    NetAssets: {
      key: 'NetAssets',
      header:
        'The Applicant qualifies as a "Corporate Accredited Investor" as defined in Section 4A(1)(a)(ii) of the Securities and Futures Act (“SFA”), Chapter 289, under Singapore law.',
      content:
        'An entity or corporation with net assets exceeding $10 million or its equivalent in foreign currency; or',
      value: null,
      answerable: true,
      subLevel: true
    },
    ShareholderIsAccreditedInvestor: {
      key: 'ShareholderIsAccreditedInvestor',
      content:
        'A corporation where all the shareholders are accredited investors; or',
      value: null,
      answerable: true,
      subLevel: true
    },
    AllPartnersAreAccreditedInvestors: {
      key: 'AllPartnersAreAccreditedInvestors',
      content:
        'A partnership (other than a limited liability partnership) where all the partners are accredited investors; or',
      value: null,
      answerable: true,
      subLevel: true
    },
    AllBeneficiariesAreAccreditedInvestors: {
      key: 'AllBeneficiariesAreAccreditedInvestors',
      content: 'A trust where all the beneficiaries are accredited investors',
      value: null,
      answerable: true,
      subLevel: true,
      lastLine: true
    },
    InvestaXPrivacyPolicy: {
      key: 'InvestaXPrivacyPolicy',
      content: "The Applicant has read and agrees to InvestaX's [LINK].",
      value: null,
      answerable: true,
      lastLine: true
    },
    InvestaXTermsOfUse: {
      key: 'InvestaXTermsOfUse',
      content: "The Applicant has read and agrees to InvestaX's [LINK].",
      value: null,
      answerable: true,
      lastLine: true
    },
    USPerson: {
      key: 'USPerson',
      content:
        'The Applicant declares that it is not a "U.S. Person" for U.S. federal income tax purposes. <br /> (Please submit [LINK] (whichever is applicable) and satisfactory documentary evidence.)',
      value: null,
      answerable: true,
      lastLine: true
    },
    TreatAsAccreditedInvestor: {
      key: 'TreatAsAccreditedInvestor',
      content:
        'The Applicant elects to be and agrees to be treated as an "Accredited Investor".',
      value: null,
      footer: [
        'Applicant has been informed of and understands the consequences of being treated as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.',
        'Applicant has been informed of and understands its right to opt out of the Accredited Investors status with InvestaX at any point in time after consent has been given, upon which InvestaX will process your election to opt out within 14 business days from receipt.'
      ],
      answerable: true,
      lastLine: true
    },
    PrimaryIssuancePlatform: {
      key: 'PrimaryIssuancePlatform',
      header: 'The Applicant acknowledges and understands:',
      content:
        'InvestaX operates its primary issuance platform as a capital markets services licensee under the SFA (Cap. 289) of Singapore for dealing in capital markets products that are securities and units in a collective investment schemes, and an exempt financial advisor for the provision of advice on units in collective investment schemes, under license number CMS100635-1.',
      value: null,
      answerable: true,
      subLevel: true,
      lastLine: true
    },
    TrueAndCorrectInformation: {
      key: 'TrueAndCorrectInformation',
      content:
        'The applicant confirm that all information provided above and all documents provided or to be provided to InvestaX are true and correct to the best of my knowledge and you may rely on the accuracy thereof',
      value: null,
      answerable: true,
      lastLine: true
    },
    InformAnyChanges: {
      key: 'InformAnyChanges',
      content:
        'The applicant undertake to promptly inform InvestaX if there should be any changes in my/our circumstances which would result in a change of investor status',
      value: null,
      answerable: true,
      lastLine: true
    }
  }
