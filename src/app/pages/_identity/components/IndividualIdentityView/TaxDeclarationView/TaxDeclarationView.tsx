import React, { Fragment } from 'react'
import { Grid, Typography, Link } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { DeclarationsListItem } from '../../DeclarationsListItem/DeclarationsListItem'
import { VSpacer } from 'components/VSpacer'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IndividualIdentity } from '../../../../../../types/identity'
import { CountryTaxDeclaration } from 'app/pages/_identity/components/CountryTaxDeclarations/CountryTaxDeclaration'

// TODO Remove after added new interfaces
export type Reason = 'A' | 'B' | 'C'

// TODO Remove after added new interfaces
export interface TaxResidencies {
  countryOfResidence?: string
  taxIdentificationNumber?: string
  reason?: Reason
  customReason?: string
  taxIdAvailable?: boolean
}

// TODO Remove after added new interfaces
export interface TaxDeclaration {
  singaporeOnly: boolean
  declarations: {
    tax: {
      fatca: boolean
    }
  }
  taxResidencies: TaxResidencies[]
}

export interface TaxDeclarationViewProps {
  data: IndividualIdentity
}

export const TaxDeclarationView = ({ data }: TaxDeclarationViewProps) => {
  const { taxResidencies, declarations } = data
  const singaporeOnly = taxResidencies?.[0].residentOfSingapore ?? false

  const renderFatcaBlock = () => {
    const fatcaLabel =
      declarations.tax?.fatca || false
        ? 'I confirm that I am a US citizen* and/or resident in the US for tax purposes and my U.S. federal Taxpayer Identifying Number (US TIN) is as follows:'
        : 'I confirm that I am not a US citizen or resident in the US for tax purposes.'

    return (
      <Grid container>
        <Grid item xs={12}>
          <FormSectionHeader title='FATCA' variant={'h5'} />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={'subtitle1'}>
              Declaration of US Citizenship or US Residence for{' '}
              <Link href={'#'}>FATCA</Link>
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <DeclarationsListItem label={fatcaLabel} value={true} />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderContentForSingaporeResident = () => {
    return (
      <LabelledValue
        label={'My Singapore NRIC/FIN is:'}
        value={taxResidencies?.[0].taxIdentificationNumber}
      />
    )
  }

  const renderContentForAnotherCountriesResident = () => {
    return (
      <Fragment>
        <CountryTaxDeclaration taxResidencies={taxResidencies} />
        <Grid item xs={12}>
          {renderFatcaBlock()}
        </Grid>
      </Fragment>
    )
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography>
          Are you currently solely a tax resident of Singapore?
        </Typography>
        <VSpacer size={'small'} />
        <Typography>
          {singaporeOnly
            ? 'YES, I’m currently only tax resident in Singapore and do not have a foreign tax residency.'
            : 'NO, I’m currently tax resident in the following list of countries/ jurisdictions (including Singapore, if applicable):'}
        </Typography>
      </Grid>
      {singaporeOnly
        ? renderContentForSingaporeResident()
        : renderContentForAnotherCountriesResident()}
    </Grid>
  )
}
