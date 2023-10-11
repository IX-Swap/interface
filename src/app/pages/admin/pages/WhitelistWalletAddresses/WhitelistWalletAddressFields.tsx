import React from 'react'
import { FormControl } from '@mui/material'
import { Pair, useMarketList } from 'app/pages/invest/hooks/useMarketList'
// import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete'

export const WhitelistWalletAddressFields = (props: Partial<SelectProps>) => {
  const { data } = useMarketList()

  if (data === undefined || data.list.length < 1) {
    return null
  }

  const options = data?.list?.map((data: Pair) => {
    return { label: data.name, value: data._id }
  })

  return (
    <FormControl fullWidth variant='outlined'>
      {/* <InputLabel>Pair</InputLabel> */}

      <Autocomplete options={options} placeholder='Select Pair' {...props} />

      {/* <Select
        {...props}
        label={undefined}
        renderValue={(value: any) => data.map[value].name}
        displayEmpty
        placeholder='Select Pair'
      >
        <SelectItem disabled value={undefined}>
          Select Pair
        </SelectItem>
        {data.list.map((item: Pair) => (
          <SelectItem key={item._id} value={item._id}>
            {item.name}
          </SelectItem>
        ))}
      </Select> */}
    </FormControl>
  )
}
