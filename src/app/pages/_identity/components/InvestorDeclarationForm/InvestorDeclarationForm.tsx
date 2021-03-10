import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DeclarationsList } from 'app/pages/_identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsList'
import { VSpacer } from 'components/VSpacer'
import { OptOutInfoDialog } from 'app/pages/_identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import { SafeguardInfoDialog } from 'app/pages/_identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'

export const investorDeclarationLabelMap = {
  personalAssets:
    'My total net personal assets (including up to SGD$1 million of your primary residence) exceed SGD$2 million or its equivalent in foreign currency; or ',
  income:
    'My income in the precedeng 12 months is not less than SGD 300,00 (or its equivalent in a foriegn currency); or',
  financialAsset:
    'My personal financial asset (e.g. deposits and investment product) exceed SGD$1 million or  its equivalent in foriegn currency; or',
  jointlyHeldAccount:
    'My jointly held account with my spouse/any individual meets any of the above'
}

export const corporateInvestorDeclarationLabelMap = {
  assets:
    'An entity or corporation with net assets exceeding $10 million or its equivalent in foreign currency; or',
  trustee:
    'The trustee of a trust the subject matter of which exceeds $10 million or its equivalent in foreign currency; or',
  accreditedShareholders:
    'A corporation where all the shareholders are Accredited Investors; or',
  partnership:
    'A partnership (other than a limited liability partnership) where all the partners are Accredited Investors; or',
  accreditedBeneficiaries:
    'A trust where all the beneficiaries are Accredited Investors; or',
  accreditedSettlors:
    'A trust where all the settlors are Accredited Investors and have reserved to themselves all powers of investment and asset management functions under the trust, and have reserved to themselves the power to revoke the trust.'
}

export const optInDeclarationLabelMap = {
  consent:
    'I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an “Accredited Investor”.',
  consequencesOfQualification: (
    <>
      I have been informed of and understand the consequences of my
      qualification as an Accredited Investor, in particular the reduced
      regulatory investor <SafeguardInfoDialog /> for Accredited Investors.
    </>
  ),
  rightToOptOut: (
    <>
      I have been informed of and understand my right to <OptOutInfoDialog /> of
      the Accredited Investors status with InvestaX at any point in time.
    </>
  )
}

export const InvestorDeclarationForm = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormSectionHeader title='Investors Status Declaration' />
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Singapore rules require you to declare your investor status before you
          see live deals on our platform
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <VSpacer size={'small'} />
      </Grid>
      <DeclarationsList
        title='I declare that I am an individual "Accredited Investor"'
        data={Object.entries(
          investorDeclarationLabelMap
        ).map(([name, label]) => ({ name, label }))}
      />
      <Grid item xs={12}>
        <VSpacer size={'small'} />
      </Grid>
      <Grid item xs={12}>
        <FormSectionHeader title={'Opt-In Requirement'} />
      </Grid>
      <DeclarationsList
        title='I confirm to be treated as an “Accredited Investor” by InvestaX'
        data={Object.entries(optInDeclarationLabelMap).map(([name, label]) => ({
          name,
          label
        }))}
      />
    </Grid>
  )
}
