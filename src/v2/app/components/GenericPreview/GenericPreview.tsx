import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './styles'

const BoldTypography = ({ children, ...others }: any) => (
  // eslint-disable-next-line
  <Typography {...others}>
    <b>{children}</b>
  </Typography>
)

export interface GenericPreviewProps {
  items: Array<{ label: string; value: string }>
}

export const GenericPreview = ({ items }: GenericPreviewProps) => {
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
