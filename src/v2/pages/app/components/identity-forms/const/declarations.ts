import { DeclarationTemplate } from '../../../../../types/identity'

const declarations = {
  individual: [
    {
      key: 'IndividualAccreditedInvestor',
      content:
        'The Applicant qualifies as an "Individual Accredited Investor" (as defined in Section 4A (1)(a)(i) of the Securities and Futures Act (“SFA”), Chapter 289):'
    },
    {
      key: 'NetPersonalAssets',
      content:
        'Individual total net personal assets (including up to SGD$1 million of your primary residence) exceed SGD$2 million or its equivalent in foreign currency ; or',
      value: null,
      sublevel: true,
      answerable: true
    },
    {
      key: 'IndividualIncome',
      content:
        'Individual income in the preceding 12 months is not less than SGD$300,000 or its equivalent in foreign currency; or',
      value: null,
      answerable: true,
      sublevel: true
    },
    {
      key: 'IndividualFinancialAsset',
      content:
        'Individual financial asset (e.g. deposits and investment products) exceed SGD$1 million or its equivalent in foreign currency; or',
      value: null,
      answerable: true,
      sublevel: true
    },
    {
      key: 'JointlyHeldAccount',
      content:
        'Jointly held account with an individual meeting any of the above',
      value: null,
      answerable: true,
      sublevel: true,
      lastLine: true
    },
    {
      key: 'InvestaXPrivacyPolicy',
      content:
        'The Applicant has read and agrees to InvestaX\'s <a href="#">Privacy Policy</a>.',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'InvestaXTermsOfUse',
      content:
        'The Applicant has read and agrees to InvestaX\'s <a href="#">Terms of Use</a>.',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'USPerson',
      content:
        'The Applicant declares that it is not a "U.S. Person" for U.S. federal income tax purposes. <br /> (Please submit <a href="#">W-8BEN/W-8BEN-E</a> (whichever is applicable) and satisfactory documentary evidence.)',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'TreatAsAccreditedInvestor',
      content:
        'The Applicant elects to be and agrees to be treated as an "Accredited Investor".',
      value: null,
      answerable: true
    },
    {
      key: 'ConsequencesAsAccreditedInvestor',
      content:
        'Applicant has been informed of and understands the consequences of being treated as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.',
      value: null,
      sublevel: true
    },
    {
      key: 'OptOutAsAccreditedInvestor',
      content:
        'Applicant has been informed of and understands its right to opt out of the Accredited Investors status with InvestaX at any point in time after consent has been given, upon which InvestaX will process your election to opt out within 14 business days from receipt.',
      value: null,
      sublevel: true,
      lastLine: true
    },
    {
      key: 'ApplicantAcknowledgement',
      content: 'The Applicant acknowledges and understands:'
    },
    {
      key: 'PrimaryIssuancePlatform',
      content:
        'InvestaX operates its primary issuance platform as a capital markets services licensee under the SFA (Cap. 289) of Singapore for dealing in capital markets products that are securities and units in a collective investment schemes, and an exempt financial advisor for the provision of advice on units in collective investment schemes, under license number CMS100635-1.',
      value: null,
      answerable: true,
      sublevel: true
    },
    {
      key: 'SecondaryTradingPlatform',
      content:
        'InvestaX operates its secondary trading platform (“Exchange”) in a regulatory sandbox under a Recognized Market Operator (“RMO”) approval issued by the Monetary Authority of Singapore (“MAS”) during the period [DDMMYYYY to DDMMYYYY], subject to extension. While in the sandbox, the Exchange will operate under pre-determined parameters and is not required to meet some of the standard requirements imposed on RMOs under the SFA. It may be possible that InvestaX may not continue to conduct regulated activities as an RMO under the SFA during or after the sandbox period as determined by the MAS.',
      value: null,
      answerable: true,
      sublevel: true,
      lastLine: true
    },
    {
      key: 'TrueAndCorrectInformation',
      content:
        'The applicant confirm that all information provided above and all documents provided or to be provided to InvestaX are true and correct to the best of my knowledge and you may rely on the accuracy thereof',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'InformAnyChanges',
      content:
        'The applicant undertake to promptly inform InvestaX if there should be any changes in my/our circumstances which would result in a change of investor status',
      value: null,
      answerable: true,
      lastLine: true
    }
  ],
  corporate: [
    {
      key: 'AuthorizeAccountOpening',
      content:
        'The User declares that he/she has the authority to open an account with InvestaX on behalf of the Applicant and bind the Applicant, and to submit all documents on behalf of the Applicant in connection with the account opening.',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'CorporateAccreditedInvestor',
      content:
        'The Applicant qualifies as a "Corporate Accredited Investor" as defined in Section 4A(1)(a)(ii) of the Securities and Futures Act (“SFA”), Chapter 289, under Singapore law.',
      value: null
    },
    {
      key: 'NetAssets',
      content:
        'An entity or corporation with net assets exceeding $10 million or its equivalent in foreign currency; or',
      value: null,
      answerable: true,
      sublevel: true
    },
    {
      key: 'ShareholderIsAccreditedInvestor',
      content:
        'A corporation where all the shareholders are accredited investors; or',
      value: null,
      answerable: true,
      sublevel: true
    },
    {
      key: 'AllPartnersAreAccreditedInvestors',
      content:
        'A partnership (other than a limited liability partnership) where all the partners are accredited investors; or',
      value: null,
      answerable: true,
      sublevel: true
    },
    {
      key: 'AllBeneficiariesAreAccreditedInvestors',
      content: 'A trust where all the beneficiaries are accredited investors',
      value: null,
      answerable: true,
      sublevel: true,
      lastLine: true
    },
    {
      key: 'InvestaXPrivacyPolicy',
      content:
        'The Applicant has read and agrees to InvestaX\'s <a href="#">Privacy Policy</a>.',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'InvestaXTermsOfUse',
      content:
        'The Applicant has read and agrees to InvestaX\'s <a href="#">Terms of Use</a>.',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'USPerson',
      content:
        'The Applicant declares that it is not a "U.S. Person" for U.S. federal income tax purposes. <br /> (Please submit <a href="#">W-8BEN/W-8BEN-E</a> (whichever is applicable) and satisfactory documentary evidence.)',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'TreatAsAccreditedInvestor',
      content:
        'The Applicant elects to be and agrees to be treated as an "Accredited Investor".',
      value: null,
      answerable: true
    },
    {
      key: 'ConsequencesAsAccreditedInvestor',
      content:
        'Applicant has been informed of and understands the consequences of being treated as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.',
      value: null,
      sublevel: true
    },
    {
      key: 'OptOutAsAccreditedInvestor',
      content:
        'Applicant has been informed of and understands its right to opt out of the Accredited Investors status with InvestaX at any point in time after consent has been given, upon which InvestaX will process your election to opt out within 14 business days from receipt.',
      value: null,
      sublevel: true,
      lastLine: true
    },
    {
      key: 'ApplicantAcknowledgement',
      content: 'The Applicant acknowledges and understands:'
    },
    {
      key: 'PrimaryIssuancePlatform',
      content:
        'InvestaX operates its primary issuance platform as a capital markets services licensee under the SFA (Cap. 289) of Singapore for dealing in capital markets products that are securities and units in a collective investment schemes, and an exempt financial advisor for the provision of advice on units in collective investment schemes, under license number CMS100635-1.',
      value: null,
      answerable: true,
      sublevel: true
    },
    {
      key: 'SecondaryTradingPlatform',
      content:
        'InvestaX operates its secondary trading platform (“Exchange”) in a regulatory sandbox under a Recognized Market Operator (“RMO”) approval issued by the Monetary Authority of Singapore (“MAS”) during the period [DDMMYYYY to DDMMYYYY], subject to extension. While in the sandbox, the Exchange will operate under pre-determined parameters and is not required to meet some of the standard requirements imposed on RMOs under the SFA. It may be possible that InvestaX may not continue to conduct regulated activities as an RMO under the SFA during or after the sandbox period as determined by the MAS.',
      value: null,
      answerable: true,
      sublevel: true,
      lastLine: true
    },
    {
      key: 'TrueAndCorrectInformation',
      content:
        'The applicant confirm that all information provided above and all documents provided or to be provided to InvestaX are true and correct to the best of my knowledge and you may rely on the accuracy thereof',
      value: null,
      answerable: true,
      lastLine: true
    },
    {
      key: 'InformAnyChanges',
      content:
        'The applicant undertake to promptly inform InvestaX if there should be any changes in my/our circumstances which would result in a change of investor status',
      value: null,
      answerable: true,
      lastLine: true
    }
  ]
}

export const formatDeclarations = (
  payloadItems: Array<{[key: string]: 'Yes' | 'No' | null}>,
  type: 'individual' | 'corporate'
): DeclarationTemplate[] => {
  const mDeclarations: DeclarationTemplate[] = []
  payloadItems.forEach((d) => {
    // get item key
    const key = Object.keys(d)[0]
    // get index of template with same key
    const index = declarations[type].findIndex((item) => item.key === key)
    // add merged object
    mDeclarations.push({
      ...declarations[type][index],
      value: d[key] === 'Yes' ? true : (d[key] === 'No' ? false : null)
    })
  })

  return mDeclarations
}

export default declarations
