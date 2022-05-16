import { baseCreds, setENV } from '../helpers/creds'
import { randomString } from '../helpers/helpers'
import { text } from '../helpers/text'

export const corporateInformation = {
  logo: '62600679c3a7390d8b2ac5af',
  companyLegalName: randomString(),
  countryOfFormation: 'Benin',
  registrationNumber: 's123qwe',
  sourceOfFund: 'INVESTMENT GAIN',
  numberOfBusinessOwners: '3 OR MORE',
  businessActivity: '123',
  companyAddress: {
    line1: 'my line 1 ad',
    line2: 'my lone 2 add',
    city: 'Cherkassy',
    state: 'Cherkassy',
    country: 'Comoros',
    postalCode: '18000'
  },
  isMailingAddressSame: true,
  representatives: [
    {
      fullName: 'my Full name',
      designation: 'Designition',
      email: 'authorizerTestsdev@esiix.com',
      contactNumber: '+1 (808) 989-8989',
      documents: [
        {
          _id: '626006b4c3a7390d8b2ac5c5',
          title: 'Authorization Document',
          type: 'Authorization Document',
          originalFileName: 'Мануал по XPath - Google Chrome.pdf',
          checksum: '7b355f6d64f28e91da9c49bbabbcbbf0102e9d1904b8ff6126e64b3965921515',
          createdAt: '2022-04-20T13:12:20.359Z',
          updatedAt: '2022-04-20T13:12:20.359Z',
          url: 'https://https://otc.mozork.com/dataroom/raw/626006b4c3a7390d8b2ac5c5'
        }
      ]
    }
  ],
  legalEntityStatus: 'publicCompanyLimitedByGuarantee',
  step: 1,
  type: 'investor'
}

export const financialInformation = {
  directors: [
    {
      fullName: 'Duncan Melendez',
      contactNumber: '+1 (726) 481-8292',
      designation: 'Et cum necessitatibu',
      email: 'mahixolys@mailinator.com',
      address: {
        line1: '805 White Cowley Freeway',
        line2: 'Laborum occaecat con',
        city: 'Recusandae Vel dolo',
        state: 'Ex sapiente elit il',
        country: 'Benin',
        postalCode: 'Voluptatem Deserunt'
      },
      documents: [
        {
          _id: '625fc8e7b364cd0d8c911802',
          title: 'Proof of Identity',
          type: 'Proof of Identity',
          originalFileName: 'Мануал по XPath - Google Chrome.pdf',
          checksum: '7b355f6d64f28e91da9c49bbabbcbbf0102e9d1904b8ff6126e64b3965921515',
          createdAt: '2022-04-20T08:48:39.591Z',
          updatedAt: '2022-04-20T08:48:39.591Z',
          url: 'https://https://otc.mozork.com/dataroom/raw/625fc8e7b364cd0d8c911802'
        },
        {
          _id: '625fc8efb364cd0d8c911805',
          title: 'Proof of Address',
          type: 'Proof of Address',
          originalFileName: 'Мануал по XPath - Google Chrome.pdf',
          checksum: '7b355f6d64f28e91da9c49bbabbcbbf0102e9d1904b8ff6126e64b3965921515',
          createdAt: '2022-04-20T08:48:47.922Z',
          updatedAt: '2022-04-20T08:48:47.922Z',
          url: 'https://https://otc.mozork.com/dataroom/raw/625fc8efb364cd0d8c911805'
        }
      ]
    }
  ],
  beneficialOwners: [
    {
      fullName: 'Thomas Dodson',
      percentageShareholding: 10,
      documents: [
        {
          _id: '625fc8e4b364cd0d8c9117ff',
          title: 'Proof of Identity',
          type: 'Proof of Identity',
          originalFileName: 'Мануал по XPath - Google Chrome.pdf',
          checksum: '7b355f6d64f28e91da9c49bbabbcbbf0102e9d1904b8ff6126e64b3965921515',
          createdAt: '2022-04-20T08:48:36.271Z',
          updatedAt: '2022-04-20T08:48:36.271Z',
          url: 'https://https://otc.mozork.com/dataroom/raw/625fc8e4b364cd0d8c9117ff'
        },
        {
          _id: '625fc8f3b364cd0d8c911808',
          title: 'Proof of Address',
          type: 'Proof of Address',
          originalFileName: 'Мануал по XPath - Google Chrome.pdf',
          checksum: '7b355f6d64f28e91da9c49bbabbcbbf0102e9d1904b8ff6126e64b3965921515',
          createdAt: '2022-04-20T08:48:51.076Z',
          updatedAt: '2022-04-20T08:48:51.076Z',
          url: 'https://https://otc.mozork.com/dataroom/raw/625fc8f3b364cd0d8c911808'
        }
      ]
    }
  ],
  step: 2,
  type: 'investor'
}

export const taxDeclaration = {
  declarations: { tax: { fatca: false } },
  taxResidencies: [
    {
      countryOfResidence: 'Barbados',
      taxIdentificationNumber: 'S5319893G',
      taxIdAvailable: true,
      residentOfSingapore: false
    }
  ],
  step: 3,
  type: 'investor'
}

export const investorStatusDeclaration = {
  declarations: {
    investorsStatus: {
      assets: true,
      trustee: false,
      accreditedShareholders: false,
      partnership: false,
      accreditedBeneficiaries: false,
      accreditedSettlors: false,
      optInAgreements: true,
      digitalSecurities: false,
      primaryOfferingServices: false,
      digitalSecuritiesIssuance: false,
      allServices: false
    }
  },
  step: 4,
  type: 'investor'
}

export const docs = {
  documents: text.docs.uploaded,
  step: 5,
  type: 'investor'
}
