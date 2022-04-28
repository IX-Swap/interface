import { FormControl } from '@mui/material'
import { Pair, useMarketList } from 'app/pages/invest/hooks/useMarketList'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select, SelectProps } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const PairSelect = (props: Partial<SelectProps>) => {
  const { data } = useMarketList()

  if (data === undefined || data.list.length < 1) {
    return null
  }

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel>Pair</InputLabel>

      <Select {...props} label={undefined}>
        <SelectItem disabled value={undefined}>
          Pair
        </SelectItem>
        {data.list.map((item: Pair) => (
          <SelectItem key={item._id} value={item._id}>
            {item.name}
          </SelectItem>
        ))}
      </Select>
    </FormControl>
  )
}

PairSelect.displayName = 'Select_PairSelect'
