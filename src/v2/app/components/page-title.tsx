import React from 'react'
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em'
  }
}))

const PageTitle = ({
  title,
  subPage = false,
  backUrl
}: {
  title: string
  subPage?: boolean
  backUrl?: string
}) => {
  const classes = useStyles()
  const history = useHistory()
  const goBack = (): void => {
    backUrl !== undefined ? history.push(backUrl) : history.goBack()
  }

  if (title.length === 0) return null

  return (
    <Grid container alignItems='center'>
      {subPage && (
        <Grid item>
          <IconButton size='small' onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Box mx={3} />
        </Grid>
      )}
      <Grid item>
        <Typography variant='h3' className={classes.pageTitle}>
          {title}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PageTitle
