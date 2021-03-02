import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import {
  getIdentityFormDefaultValue,
  IdentityType
} from 'app/pages/identity/utils'
import { DeclarationsList } from 'app/pages/_identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsList'
import { VSpacer } from 'components/VSpacer'
import { Form } from 'components/form/Form'
import { OptOutInfoDialog } from 'app/pages/_identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import { SafeguardInfoDialog } from 'app/pages/_identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'

// TODO Change or delete after added new interfaces
const investorStatusDeclaration = [
  {
    name: 'personalAssets',
    label:
      'My total net personal assets (including up to SGD$1 million of your primary residence) exceed SGD$2 million or its equivalent in foreign currency; or '
  },
  {
    name: 'income',
    label:
      'My income in the precedeng 12 months is not less than SGD 300,00 (or its equivalent in a foriegn currency); or'
  },
  {
    name: 'financialAsset',
    label:
      'My personal financial asset (e.g. deposits and investment product) exceed SGD$1 million or  its equivalent in foriegn currency; or'
  },
  {
    name: 'jointlyHeldAccount',
    label:
      'My jointly held account with my spouse/any individual meets any of the above'
  }
]

// TODO Change or delete after added new interfaces
const optInRequirement = [
  {
    name: 'consent',
    label:
      'I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an “Accredited Investor”.'
  },
  {
    name: 'consequencesOfQualification',
    label: (
      <>
        I have been informed of and understand the consequences of my
        qualification as an Accredited Investor, in particular the reduced
        regulatory investor <SafeguardInfoDialog /> for Accredited Investors.
      </>
    )
  },
  {
    name: 'rightToOptOut',
    label: (
      <>
        I have been informed of and understand my right to <OptOutInfoDialog />{' '}
        of the Accredited Investors status with InvestaX at any point in time.
      </>
    )
  }
]

export interface InvestorDeclarationFormProps {
  type: IdentityType
}

export const InvestorDeclarationForm = (
  props: InvestorDeclarationFormProps
) => {
  return (
    <Form defaultValues={getIdentityFormDefaultValue(undefined, 'individual')}>
      <Grid container>
        <Grid item xs={12}>
          <FormSectionHeader title='Investors Status Declaration' />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Singapore rules require you to declare your investor status before
            you see live deals on our platform
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <VSpacer size={'small'} />
        </Grid>
        <DeclarationsList
          title='I declare that I am an individual "Accredited Investor"'
          data={investorStatusDeclaration}
        />
        <Grid item xs={12}>
          <VSpacer size={'small'} />
        </Grid>
        <Grid item xs={12}>
          <FormSectionHeader title={'Opt-In Requirement'} />
        </Grid>
        <DeclarationsList
          title='I confirm to be treated as an “Accredited Investor” by InvestaX'
          data={optInRequirement}
        />
      </Grid>
    </Form>
  )
}
