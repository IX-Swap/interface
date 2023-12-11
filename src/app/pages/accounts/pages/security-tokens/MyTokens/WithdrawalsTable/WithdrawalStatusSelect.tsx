import React from 'react'
import { FormControl } from '@mui/material'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'

export const WithdrawalStatusSelect = (props: Partial<SelectProps>) => {
  const options = [
    {
      label: 'Draft',
      value: 'Draft'
    },
    {
      label: 'Submitted',
      value: 'Submitted'
    },
    {
      label: 'Approved',
      value: 'Approved'
    },
    {
      label: 'Rejected',
      value: 'Rejected'
    },
    {
      label: 'Error',
      value: 'Error'
    },
    {
      label: 'Success',
      value: 'Success'
    }
  ]

  return (
    <FormControl fullWidth variant='outlined'>
      <Autocomplete options={options} placeholder='Select Status' {...props} />
    </FormControl>
  )
}

WithdrawalStatusSelect.displayName = 'Select_WithdrawalStatusSelect'
