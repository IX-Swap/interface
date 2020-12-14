import React from 'react'
import { CorporateIdentity } from 'types/identity'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Grid, Typography } from '@material-ui/core'
export interface DSONameAndStructureProps {
  corporate: CorporateIdentity
  dso: DigitalSecurityOffering
}

export const DSONameAndStructure: React.FC<DSONameAndStructureProps> = (
  props: DSONameAndStructureProps
) => {
  const { corporate, dso } = props

  return (
    <Grid container alignItems='center' wrap='nowrap' spacing={2}>
      <Grid item>
        <DSOLogo dsoId={dso._id} size={70} variant='rounded' />
      </Grid>
      <Grid item zeroMinWidth>
        <Typography noWrap>{corporate?.companyLegalName}</Typography>
        <Typography color='textSecondary'>{dso?.capitalStructure}</Typography>
      </Grid>
    </Grid>
  )
}
