import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CorporateIdentity } from 'types/identity'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from './DSOLogo'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '300px'
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '30px',
    gap: '8px',
    fontSize: '14px'
  },
  capital: {
    color: '#AAA'
  }
}))

export interface DSONameProps {
  corporate: CorporateIdentity
  dso: DigitalSecurityOffering
}

export const DSOName: React.FC<DSONameProps> = (props: DSONameProps) => {
  const classes = useStyles()
  const { corporate, dso } = props
  return (
    <div className={classes.container}>
      <DSOLogo dsoId={dso?._id} alt={corporate?.companyLegalName} />
      <div className={classes.meta}>
        <span>{corporate?.companyLegalName}</span>
        <span className={classes.capital}>{dso?.capitalStructure}</span>
      </div>
    </div>
  )
}
