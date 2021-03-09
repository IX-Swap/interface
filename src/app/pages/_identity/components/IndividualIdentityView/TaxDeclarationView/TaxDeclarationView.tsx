import React from 'react'
import { Grid, Typography, Box, Link } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { DeclarationsListItem } from '../../DeclarationsListItem/DeclarationsListItem'
import { VSpacer } from 'components/VSpacer'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IndividualIdentity } from '../../../../../../types/identity'

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

  const renderReasonBlock = (reason: Reason, customReason?: string) => {
    let reasonDescription: string = ''

    switch (reason) {
      case 'A':
        reasonDescription =
          'Reason A - The country/jurisdiction where the Account Holder is resident does not issue TINs to its residents'
        break
      case 'B':
        reasonDescription =
          'Reason B - The user is otherwise unable to obtain a TIN or equivalent number'
        break
      case 'C':
        reasonDescription =
          'Reason C - No TIN is required. (Note. Only select this reason if the domestic law of the relevant jurisdication does not require the collection of the TIN issued by such jurisdication)'
        break
      default:
        reasonDescription = ''
    }

    return (
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12}>
          <Typography>{reasonDescription}</Typography>
        </Grid>
        {customReason != null && (
          <Grid item xs={12}>
            <Typography>{customReason}</Typography>
          </Grid>
        )}
        <VSpacer size={'large'} />
      </Grid>
    )
  }

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
      <Grid item xs={12}>
        {taxResidencies?.map(it => {
          return (
            <>
              <Box display={'flex'}>
                <LabelledValue
                  label={'Country of Tax Residence'}
                  value={it.countryOfResidence}
                />
                {it.taxIdentificationNumber != null ? (
                  <LabelledValue
                    label={'Tax Identification Number'}
                    value={it.taxIdentificationNumber}
                  />
                ) : null}
              </Box>
              {it.reason != null ? <VSpacer size={'medium'} /> : null}
              {it.reason != null
                ? renderReasonBlock(it.reason, it.customReason)
                : null}
              <VSpacer size={'small'} />
            </>
          )
        })}
        {renderFatcaBlock()}
      </Grid>
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
