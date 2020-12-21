import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { usePromo } from '../hooks/usePromo'
import { generateImgSrc } from 'helpers/generateImgSrc'
import { escape } from 'lodash'

const useStyles = makeStyles(theme => ({
  promoBanner: {
    width: '100%',
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(4)}px`
  },
  message: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'normal',
    fontSize: `${theme.typography.fontSize * 2}px`,
    marginBottom: `${theme.spacing(3)}px`
  },
  bannerImage: {
    width: '100%',
    display: 'block'
  }
}))

export const PromoBanner = () => {
  const styles = useStyles()
  const { data, isLoading, error } = usePromo()

  if (typeof error !== 'undefined' && error !== null) {
    return null
  }
  if (typeof data === 'undefined' || isLoading) {
    return null
  }

  const { image, title } = data

  if (typeof image === 'undefined') {
    return null
  }

  return (
    <Grid className={styles.promoBanner}>
      {title !== '' ? (
        <Typography variant='h1' className={styles.message}>
          {title}
        </Typography>
      ) : null}
      <Paper variant='outlined'>
        <img
          data-testid='promo-image'
          className={styles.bannerImage}
          src={generateImgSrc(image.src)}
          alt={escape(image.alt ?? image.title ?? '')}
          title={escape(image.title)}
        />
      </Paper>
    </Grid>
  )
}
