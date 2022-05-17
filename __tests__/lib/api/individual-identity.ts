import { baseCreds, setENV } from '../helpers/creds'
import { text } from '../helpers/text'

export const personalInformation = {
  gender: 'O',
  address: {
    line1: '659 South Nobel Freeway',
    line2: 'Omnis adipisicing sa',
    city: 'Eaque illo qui amet',
    state: 'Nisi quisquam magnam',
    country: 'Barbados',
    postalCode: 'Non est consequuntur'
  },
  email: 'larojuz@mailinator.com',
  contactNumber: '+1 (986) 725-6377',
  dob: 'Sat Jan 28 1976 00:00:00 GMT+0202 (Eastern European Standard Time)',
  nationality: 'Argentina',
  lastName: 'Noble',
  middleName: 'Justina',
  firstName: 'Germaine',
  step: 1
}

export const financialInformation = {
  occupation: 'CLEANER/HOUSEKEEPER',
  employmentStatus: 'Freelancers',
  employer: 'Minima quaerat aut e',
  annualIncome: '50,000-100,000',
  sourceOfFund: 'INVESTMENT GAIN',
  step: 2
}

export const taxDeclaration = {
  declarations: { tax: { fatca: false } },
  taxResidencies: [{ taxIdentificationNumber: 'S5319893G', residentOfSingapore: true }],
  step: 3
}

export const investorStatusDeclaration = {
  declarations: {
    investorsStatus: {
      personalAssets: true,
      income: true,
      financialAsset: true,
      jointlyHeldAccount: true,
      optInAgreements: true,
      digitalSecurities: false,
      primaryOfferingServices: false,
      digitalSecuritiesIssuance: false,
      allServices: false
    }
  },
  step: 4
}
export const docs = {
  documents: text.docs.uploaded,
  step: 5
}
