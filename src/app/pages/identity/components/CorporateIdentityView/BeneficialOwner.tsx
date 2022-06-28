import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { Personnel } from 'app/pages/identity/types/forms'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

import { ProofDocuments } from 'app/pages/identity/components/CorporateIdentityView/ProofDocuments'

export interface BeneficialOwnerProps {
  data: Personnel
  title: string
}

export const BeneficialOwner = ({ data, title }: BeneficialOwnerProps) => {
  const { fullName, percentageShareholding, documents } = data

  return (
    <FieldContainer>
      <Grid container direction={'column'} spacing={5}>
        <Grid item>
          <FormSectionHeader title={title} />
        </Grid>

        <Grid
          item
          container
          spacing={5}
          sx={{
            display: 'grid',
            gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
          }}
        >
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <LabelledValue isRedesigned value={fullName} label='Full Name' />
            </Grid>
          </Grid>
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <LabelledValue
                isRedesigned
                value={
                  percentageShareholding !== undefined
                    ? `${percentageShareholding}%`
                    : '–'
                }
                label='Percentage Shareholding'
              />
            </Grid>
          </Grid>
        </Grid>

        <ProofDocuments documents={documents} />
      </Grid>
    </FieldContainer>
  )
}
