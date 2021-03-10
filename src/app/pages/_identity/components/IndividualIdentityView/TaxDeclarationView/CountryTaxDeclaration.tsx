import { Box, Grid, Typography } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { TaxResidencies } from 'types/identity'

export interface CountryTaxDeclarationProps {
  taxResidencies?: TaxResidencies
}

export type Reason = 'A' | 'B' | 'C'

export const CountryTaxDeclaration = ({
  taxResidencies
}: CountryTaxDeclarationProps) => {
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

  if (taxResidencies === undefined) {
    return null
  }

  return (
    <>
      {taxResidencies.map(it => (
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
      ))}
    </>
  )
}
