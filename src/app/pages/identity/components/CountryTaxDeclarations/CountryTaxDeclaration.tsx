import { Box, Grid, Typography } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { TaxResidencies } from 'app/pages/identity/types/forms'

export interface CountryTaxDeclarationProps {
  taxResidencies?: TaxResidencies
}

export type Reason = 'A' | 'B' | 'C'

export const CountryTaxDeclaration = ({
  taxResidencies
}: CountryTaxDeclarationProps) => {
  const renderReasonBlock = (reason: Reason, customReason?: string) => {
    let reasonDescription: JSX.Element | string = ''

    switch (reason) {
      case 'A':
        reasonDescription = (
          <>
            <strong>Reason A</strong> - The country where the account holder is
            resident does not issue TINs to its residents
          </>
        )
        break
      case 'B':
        reasonDescription = (
          <>
            <strong>Reason B</strong> - The user is otherwise unable to obtain a
            TIN or equivalent number
          </>
        )
        break
      case 'C':
        reasonDescription = (
          <>
            <strong>Reason C</strong> - No TIN is required. (Note. Only select
            this reason if the domestic law of the relevant jurisdiction does
            not require the collection of the TIN issued by such jurisdiction)
          </>
        )
        break
      default:
        reasonDescription = ''
    }

    return (
      <Grid item container xs={12} spacing={1} style={{ marginTop: 12 }}>
        <Grid item xs={12}>
          <Typography>{reasonDescription}</Typography>
        </Grid>
        {customReason != null && (
          <Grid item xs={12}>
            <Typography>{customReason}</Typography>
          </Grid>
        )}
      </Grid>
    )
  }

  if (taxResidencies === undefined) {
    return null
  }

  return (
    <>
      {taxResidencies.map(it => (
        <Grid item xs={12} style={{ marginTop: 20 }}>
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
          {it.reason != null
            ? renderReasonBlock(it.reason, it.customReason)
            : null}
          <VSpacer size={'small'} />
        </Grid>
      ))}
    </>
  )
}
