import React from 'react'
import { CorporateIdentity } from 'types/identity'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Box } from '@material-ui/core'
import { useStyles } from './DSONameAndStructures.styles'
export interface DSONameAndStructureProps {
  corporate: CorporateIdentity
  dso: DigitalSecurityOffering
}

export const DSONameAndStructure: React.FC<DSONameAndStructureProps> = (
  props: DSONameAndStructureProps
) => {
  const classes = useStyles()
  const { corporate, dso } = props
  return (
    <Box className={classes.container}>
      <DSOLogo dsoId={dso._id} size={70} variant='rounded' />
      <Box className={classes.meta}>
        <Box component='span'>{corporate?.companyLegalName}</Box>
        <Box component='span' className={classes.capital}>
          {dso?.capitalStructure}
        </Box>
      </Box>
    </Box>
  )
}
