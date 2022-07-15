import { baseCreds, setENV } from '../helpers/creds'
import { text } from '../helpers/text'

export const personalInformation = {
  photo: '62c808bf810ec02d3bc6e738',
  firstName: 'Britanney',
  middleName: 'Amanda bonner',
  lastName: 'Bright',
  dob: '1990-01-07T21:00:00.000Z',
  gender: 'M',
  email: 'ceha@mailinator.com',
  contactNumber: '+1 (608) 852-2063',
  nationality: 'Ukraine',
  address: {
    line1: '55 East Green Old Parkway',
    line2: 'Impedit vero pariat',
    city: 'Aliquid qui eum aut ',
    state: 'Quidem nemo iusto au',
    country: 'Ukraine',
    postalCode: 'Dolorem ut sint nost'
  }
}

export const financialInformation = {
  declarations: { tax: { fatca: false } },
  taxResidencies: [
    {
      countryOfResidence: 'Anguilla',
      taxIdentificationNumber: 'S4235022B',
      taxIdAvailable: true,
      residentOfSingapore: false
    }
  ],
  occupation: 'BUILDING CONSTRUCTION LABOURER',
  employmentStatus: 'Part-Time Employee',
  employer: 'dfs',
  annualIncome: '50,000-100,000',
  sourceOfFund: 'INVESTMENT GAIN',
  step: 1
}

export const taxDeclaration = {
  declarations: {
    investorsStatus: {
      personalAssets: true,
      income: false,
      financialAsset: false,
      jointlyHeldAccount: false,
      optInAgreementsSafeguards: true,
      optInAgreementsOptOut: true,
      digitalSecurities: false,
      primaryOfferingServices: false,
      digitalSecuritiesIssuance: false,
      allServices: false
    }
  },
  documents: ['62c8176a810ec02d3bc6f45d', '62c81767810ec02d3bc6f448', '62c81766810ec02d3bc6f445'],
  step: 2
}

// export const investorStatusDeclaration = {
//   declarations: {
//     investorsStatus: {
//       personalAssets: true,
//       income: true,
//       financialAsset: true,
//       jointlyHeldAccount: true,
//       optInAgreements: true,
//       digitalSecurities: false,
//       primaryOfferingServices: false,
//       digitalSecuritiesIssuance: false,
//       allServices: false
//     }
//   },
//   step: 4
// }
// export const docs = {
//   documents: text.docs.uploaded,
//   step: 5
// }
