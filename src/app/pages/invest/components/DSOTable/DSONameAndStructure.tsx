import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CorporateIdentity } from 'types/identity'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: `${theme.spacing(20)}px`
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: `${theme.spacing(2)}px`,
    gap: `${theme.spacing(0.5)}px`,
    fontSize: `${theme.typography.fontSize}px`
  },
  capital: {
    color: theme.palette.text.hint
  }
}))

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
      <DSOLogo dsoId={dso?._id} size={70} variant='square' />
      <Box className={classes.meta}>
        <Box component='span'>{corporate?.companyLegalName}</Box>
        <Box component='span' className={classes.capital}>
          {dso?.capitalStructure}
        </Box>
      </Box>
    </Box>
  )
}
