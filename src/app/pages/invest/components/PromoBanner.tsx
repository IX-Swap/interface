import React from 'react'
import _escape from 'lodash/escape'
import { Grid, Paper, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';
import { usePromo } from '../hooks/usePromo'
import { generateImgSrc } from 'helpers/generateImgSrc'

const useStyles = makeStyles(theme => ({
  promoBanner: {
    width: '100%',
    padding: `${theme.spacing(3)} 0 ${theme.spacing(4)}`
  },
  message: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'normal',
    fontSize: `${theme.typography.fontSize * 2}px`,
    marginBottom: theme.spacing(3)
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
        <Typography variant='h4' style={{ marginBottom: 20 }}>
          {title}
        </Typography>
      ) : null}
      <Paper variant='outlined'>
        <img
          data-testid='promo-image'
          className={styles.bannerImage}
          src={generateImgSrc(image.src)}
          alt={_escape(image.alt ?? image.title ?? '')}
          title={_escape(image.title)}
        />
      </Paper>
    </Grid>
  )
}
