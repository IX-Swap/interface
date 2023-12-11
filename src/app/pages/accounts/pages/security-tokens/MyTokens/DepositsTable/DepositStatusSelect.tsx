import React from 'react'
import { FormControl } from '@mui/material'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'

export const DepositStatusSelect = (props: Partial<SelectProps>) => {
  const options = [
    {
      label: 'Pending',
      value: 'PENDING'
    },
    {
      label: 'Completed',
      value: 'COMPLETED'
    },
    {
      label: 'Failed',
      value: 'FAILED'
    }
    // {
    //   label: 'Error',
    //   value: 'ERROR'
    // }
  ]

  return (
    <FormControl fullWidth variant='outlined'>
      <Autocomplete options={options} placeholder='Select Status' {...props} />
    </FormControl>
  )
}

DepositStatusSelect.displayName = 'Select_DepositStatusSelect'
