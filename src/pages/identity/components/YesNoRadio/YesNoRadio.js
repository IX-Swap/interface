import React, { useState } from 'react'
import {
  // FormControl,
  RadioGroup,
  FormControlLabel,
  // FormHelperText,
  Radio,
  Grid
} from '@material-ui/core'
// import { Controller } from 'react-hook-form'

const YesNoRadio = props => {
  // const {
  //   options,
  //   label,
  //   error,
  //   helperText,
  //   required
  //   ...controllerProps
  // } = props

  const [value, setValue] = useState()

  const handleChange = ev => setValue(ev.target.value)

  return (
    // <FormControl
    //   component='fieldset'
    //   margin='dense'
    //   fullWidth
    //   error={!!error}
    //   required={required}
    // >
    //   <FormControlLabel
    //     label={label}
    //     control={<Controller as={Radio} {...controllerProps} />}
    //   />
    //   {error && <FormHelperText>{helperText}</FormHelperText>}
    // </FormControl>
    <RadioGroup
      aria-label='declaration'
      name='declaration'
      value={value}
      onChange={handleChange}
    >
      <Grid container>
        <Grid item lg={8}>
          <FormControlLabel value={true} control={<Radio />} label='Yes' />
        </Grid>
        <Grid item lg={3}>
          <FormControlLabel value={false} control={<Radio />} label='No' />
        </Grid>
      </Grid>
    </RadioGroup>
  )
}

export default YesNoRadio
