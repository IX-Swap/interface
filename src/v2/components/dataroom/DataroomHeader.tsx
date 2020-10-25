import React from 'react'
import { Grid, ListSubheader, Typography } from '@material-ui/core'
import useStyles from 'v2/components/dataroom/styles'

export const DataroomHeader: React.FC = () => {
  const classes = useStyles()

  return (
    <ListSubheader disableSticky>
      <Grid container>
        <Grid container item xs={4}>
          <Typography className={classes.listItemHeader}>File Name</Typography>
        </Grid>
        <Grid container item xs={3} justify='flex-start'>
          <Typography className={classes.listItemHeader}>Type</Typography>
        </Grid>
        <Grid container item xs={3} justify='center'>
          <Typography className={classes.listItemHeader}>
            Uploaded At
          </Typography>
        </Grid>
        <Grid container item xs={2}>
          &nbsp;
        </Grid>
      </Grid>
    </ListSubheader>
  )
}
