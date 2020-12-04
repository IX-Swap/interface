import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { usePromo } from '../hooks/usePromo'

const useStyles = makeStyles(theme => ({
  promoBanner: {
    width: '100%',
    margin: '20px 0 40px'
  },
  message: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'normal',
    fontSize: '30px'
  },
  bannerImage: {
    maxWidth: '100%',
    display: 'block'
  }
}))

export const PromoBanner = () => {
  const styles = useStyles()
  const { promoData, isLoading, isError } = usePromo()

  if (typeof promoData === 'undefined' || isError || isLoading) return null

  const { message, image } = promoData

  return (
    <div className={styles.promoBanner}>
      <h1 className={styles.message}>{message}</h1>
      <Paper variant='outlined'>
        <img className={styles.bannerImage} src={image} alt={message} />
      </Paper>
    </div>
  )
}
