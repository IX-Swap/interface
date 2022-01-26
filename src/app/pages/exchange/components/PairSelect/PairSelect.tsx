import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material'
import { Pair, useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import React from 'react'

export const PairSelect = (props: Partial<SelectProps>) => {
  const { data } = useMarketList()

  if (data === undefined || data.list.length < 1) {
    return null
  }

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel shrink>Pair</InputLabel>

      <Select {...props}>
        <MenuItem disabled value={undefined}>
          Pair
        </MenuItem>
        {data.list.map((item: Pair) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
