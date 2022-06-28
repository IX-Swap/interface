import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface OwnershipStructureProps {
  data: CorporateIdentity
}

export const OwnershipStructure = ({ data }: OwnershipStructureProps) => {
  return (
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
          value={data.numberOfBusinessOwners}
          label='Number of Business Owners'
        />
      </Grid>
      <Grid item>
        <LabelledValue
          isRedesigned
          value={data.businessActivity}
          label='Business Activity'
        />
      </Grid>
    </Grid>
  )
}
