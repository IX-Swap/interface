import React from 'react'

import { Grid, TextField, FormControl, Button } from '@material-ui/core'
import Widget from '../../../components/Widget/Widget'

export default function TokenTransfer (props) {
  return (
    <Grid container>
      <Widget disableWidgetMenu>
        <form>
          <TextField label='From'></TextField>
          <TextField label='To'></TextField>
          <TextField label='Amount'></TextField>
        </form>
      </Widget>
    </Grid>
  )
}
