import React from 'react'
import { Grid, ListSubheader, Typography } from '@material-ui/core'
import useStyles from 'v2/app/pages/identity/components/dataroom/styles'

export const DataroomHeader: React.FC = () => {
  const classes = useStyles()

  return (
    <ListSubheader>
      <Grid container>
        <Grid container item xs={3}>
          <Typography className={classes.listItemHeader}>File Name</Typography>
        </Grid>
        <Grid container item xs={2} justify='center'>
          <Typography className={classes.listItemHeader}>Date</Typography>
        </Grid>
        <Grid container item xs={3} justify='center'>
          <Typography className={classes.listItemHeader}>Title</Typography>
        </Grid>
        <Grid container item xs={3} justify='center'>
          <Typography className={classes.listItemHeader}>Type</Typography>
        </Grid>
        <Grid container item xs={1}>
          &nbsp;
        </Grid>
      </Grid>
    </ListSubheader>
  )
}
