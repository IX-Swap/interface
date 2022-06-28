import { Grid, Typography } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { TaxResidencies } from 'app/pages/identity/types/forms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Divider } from 'ui/Divider'
import { Icon } from 'ui/Icons/Icon'

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
          <Typography lineHeight={1.5} fontWeight={400}>
            <Typography display={'inline'}>Reason A</Typography> - The
            Country/Jurisdiction Where The Account Holder Is Resident Does Not
            Issue TINs To Its Residents
          </Typography>
        )
        break
      case 'B':
        reasonDescription = (
          <Typography lineHeight={1.5} fontWeight={400}>
            <Typography display={'inline'}>Reason B</Typography> - No TIN Is
            Required. (Note. Only Select This Reason If The Domestic Law Of The
            Relevant Jurisdiction Does Not Require The Collection Of The TIN
            Issued By Such Jurisdiction)
          </Typography>
        )
        break
      case 'C':
        reasonDescription = (
          <Typography lineHeight={1.5} fontWeight={400}>
            <Typography display={'inline'}>Reason C</Typography> - No TIN is
            required. (Note. Only select this reason if the domestic law of the
            relevant jurisdiction does not require the collection of the TIN
            issued by such jurisdiction)
          </Typography>
        )
        break
      default:
        reasonDescription = ''
    }

    return (
      <Grid item container flexWrap={'nowrap'} alignItems={'flex-start'}>
        <Grid item mr={1.5} mt={-0.25}>
          <Icon color={'#7DD320'} name={'check'} />
        </Grid>
        <Grid item container spacing={1.5} direction={'column'}>
          <Grid item>
            <Typography>{reasonDescription}</Typography>
          </Grid>
          {customReason != null && reason === 'B' && (
            <Grid item>
              <Typography>
                Reason:{' '}
                <Typography display={'inline'} fontWeight={400}>
                  {customReason}
                </Typography>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }

  if (taxResidencies === undefined) {
    return null
  }

  return (
    <FieldContainer>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <FormSectionHeader title='Tax Declaration' />
        </Grid>

        {taxResidencies.map((it, i) => (
          <>
            <Grid
              item
              container
              spacing={5}
              sx={{
                display: 'grid',
                gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
              }}
            >
              <Grid item>
                <LabelledValue
                  isRedesigned
                  label={'Country of Tax Residence'}
                  value={it.countryOfResidence}
                />
              </Grid>
              {it.reason === undefined ? (
                <Grid item>
                  <LabelledValue
                    isRedesigned
                    label={'Tax Identification Number'}
                    value={it.taxIdentificationNumber}
                  />
                </Grid>
              ) : null}
            </Grid>
            {it.reason != null ? (
              <Grid item>{renderReasonBlock(it.reason, it.customReason)}</Grid>
            ) : null}
            {i + 1 < taxResidencies?.length && taxResidencies?.length > 1 && (
              <Grid item>
                <Divider />
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </FieldContainer>
  )
}
