import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  infoGrid: {
    width: '300px',
    alignSelf: 'center',
    textAlign: 'center',
    padding: '10px'
  },
  labels: {
    textAlign: 'left'
  },
  values: {
    textAlign: 'right'
  }
}))

const BoldTypography = ({ children, ...others }: any) => (
  // eslint-disable-next-line
  <Typography {...others}>
    <b>{children}</b>
  </Typography>
)

function GenericPreview ({ items }: { items: Array<{label: string, value: string}> }) {
  const classes = useStyles()

  return (
    <Grid container justify='center' direction='column'>
      <Grid container className={classes.infoGrid}>
        {items.map((e, i) => (
          <React.Fragment key={i}>
            <Grid item xs={6}>
              <BoldTypography variant='subtitle2' className={classes.labels}>
                {e.label}:
              </BoldTypography>
            </Grid>
            <Grid item xs={6}>
              <BoldTypography
                variant='subtitle2'
                className={classes.values}
                color='primary'
              >
                {e.value}
              </BoldTypography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  )
}

export default GenericPreview
