import React from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

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

  return (
    <Grid container alignItems='center'>
      {subPage && (
        <Grid item>
          <IconButton
            size='small'
            onClick={() => (backUrl ? history.push(backUrl) : history.goBack())}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
      )}
      <Grid item>
        <Typography
          variant={subPage ? 'h4' : 'h2'}
          className={classes.pageTitle}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PageTitle
