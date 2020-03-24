import React from 'react'
import { Grid, Card, Button, FormGroup, TextField } from '@material-ui/core'

export default function DsoStepOne (props) {
  return (
    <Grid>
      <Card>
        <FormGroup>
          <FormControl>
            <TextField id='time' type='time' inputProps={inputProps} />;
          </FormControl>
        </FormGroup>
      </Card>
    </Grid>
  )
}
