import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface OwnershipStructureProps {
  data: CorporateIdentity
}

export const OwnershipStructure = ({ data }: OwnershipStructureProps) => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
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
