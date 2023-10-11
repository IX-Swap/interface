import React from 'react'
import { FormControl } from '@mui/material'
// import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete'

export const SourceSelect = (props: Partial<SelectProps>) => {
  const options = [
    {
      label: 'STO_ISSUANCE',
      value: 'STO_ISSUANCE'
    },
    {
      label: 'STO_WITHDRAWAL',
      value: 'STO_WITHDRAWAL'
    },
    {
      label: 'EXCHANGE_TRADE',
      value: 'EXCHANGE_TRADE'
    }
  ]

  return (
    <FormControl fullWidth variant='outlined'>
      {/* <InputLabel>Source</InputLabel> */}

      <Autocomplete options={options} placeholder='Select Source' {...props} />
    </FormControl>
  )
}

SourceSelect.displayName = 'Select_SourceSelect'
