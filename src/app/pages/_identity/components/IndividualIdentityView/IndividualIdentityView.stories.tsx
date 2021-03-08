import React from 'react'
import { Grid } from '@material-ui/core'
import { Meta, Story } from '@storybook/react/types-6-0'
import { IndividualIdentityView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityView'
import { user } from '__fixtures__/user'

const meta: Meta = {
  title: 'Pages/Identity/IndividualIdentityView',
  component: IndividualIdentityView
}

// TODO Remove after added new _fixture
const address = {
  city: 'Omsk',
  country: 'Russian Federation',
  state: 'Siberia',
  line1: 'Address line 1',
  line2: 'Address line 2',
  postalCode: '123456'
}

// TODO Remove after added new _fixture
// const taxDeclaration = {
//   singaporeOnly: true,
//   declarations: {
//       tax: {
//           fatca: false
//       }
//   },
//   taxResidencies: [
//       {
//           taxIdentificationNumber: "123456789",
//       }
//   ]
// }

// TODO Remove after added new _fixture
const investorDeclaration = {
  accreditedInvestorDeclaration: {
    'My total net personal assets (including up to SGD$1 million of your primary residence) exceed SGD$2 million or its equivalent in foreign currency; or ': true,
    'My income in the precedeng 12 months is not less than SGD 300,00 (or its equivalent in a foriegn currency); or': false,
    'My personal financial asset (e.g. deposits and investment product) exceed SGD$1 million or  its equivalent in foriegn currency; or': true
  },
  optInRequirement: {
    'I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an “Accredited Investor”.': true,
    'I have been informed of and understand the consequences of my qualification as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.': false,
    'I have been informed of and understand my right to opt out of the Accredited Investors status with InvestaX at any point in time.': true
  },
  accreditedInvestorOptOut: {
    'Trading in digital securities on the InvestaX private exchange': true,
    'Use of Primary Offering Services for the purpose of fundraising': true,
    'Issuance of Digital Securities by the Issuers': true,
    'Any/all Services/Products offered by InvestaX': true
  }
}

// TODO Remove after added new _fixture
const taxDeclaration = {
  singaporeOnly: false,
  declarations: {
    tax: {
      fatca: true
    }
  },
  taxResidencies: [
    {
      countryOfResidence: 'Malaysia',
      taxIdentificationNumber: '123456789',
      taxIdAvailable: true
    },
    {
      countryOfResidence: 'Indonesia',
      customReason: 'custom reason',
      reason: 'B'
    }
  ]
}

// TODO Remove after added new _fixture
const individual = {
  photo: '',
  _id: '1',
  email: 'email@example.com',
  annualIncome: '50,000 and below',
  contactNumber: '1234567890',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  countryOfResidence: 'Russian Federation',
  dob: '01-01-2000',
  employer: 'InvestaX',
  employmentStatus: 'Employed',
  firstName: 'John',
  lastName: 'Doe',
  middleName: '',
  nationality: 'Russian',
  occupation: 'Occupied',
  authorizationDocuments: [],
  taxDeclaration,
  investorDeclaration,
  agreementsAndDisclosures: {
    investorAgreement: true,
    custodyAgreement: true,
    disclosures: true
  },
  documents: [],
  address,
  user
}

export default meta

const Template: Story = () => (
  <Grid container>
    <Grid item>
      <IndividualIdentityView data={individual as any} />
    </Grid>
  </Grid>
)

export const Default = Template.bind({})
