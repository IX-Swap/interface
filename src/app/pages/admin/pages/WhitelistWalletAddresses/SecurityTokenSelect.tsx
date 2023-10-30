import React from 'react'
import { FormControl } from '@mui/material'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { SecurityTokenSelectItem } from 'ui/Select/SelectItem/SecurityToken/SecurityToken'

export const SecurityTokenSelect = (props: Partial<SelectProps>) => {
  const { data } = useAssetsData('Security', 500)

  if (data === undefined || data.list.length < 1) {
    return null
  }

  const options = data?.list?.map(data => {
    return {
      label: [data.symbol, data.name, data?.network?.name],
      render: <SecurityTokenSelectItem sto={data} />,
      value: data._id
    }
  })

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel>Security Token</InputLabel>

      <Autocomplete
        {...props}
        placeholder='Select Security Token'
        options={options}
      />
    </FormControl>
  )
}
