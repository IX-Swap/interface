import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRawDataroomFile } from 'hooks/useRawFile'

export interface DSOLogoProps {
  dsoId: string
  alt: string
}

const useStyles = makeStyles(() => ({
  logoContainer: {
    width: '66px',
    height: '57px',
    border: '1px solid #EEE',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  image: {
    width: '100%',
    height: 'auto'
  }
}))

export const DSOLogo = (props: DSOLogoProps) => {
  const classes = useStyles()
  const { dsoId, alt } = props
  const { data } = useRawDataroomFile(
    `/issuance/dso/dataroom/logo/raw/${dsoId}`
  )
  if (data === '') return null
  return (
    <div className={classes.logoContainer}>
      <img className={classes.image} src={data} alt={alt} />
    </div>
  )
}
