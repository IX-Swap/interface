import { FormControl, InputLabel, TextFieldProps } from '@mui/material'
import { Pair, useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import React from 'react'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const PairSelect = (props: Partial<TextFieldProps>) => {
  const { data } = useMarketList()

  if (data === undefined || data.list.length < 1) {
    return null
  }

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel shrink>Pair</InputLabel>

      <TextFieldSelect {...props}>
        <SelectItem disabled value={undefined}>
          Pair
        </SelectItem>
        {data.list.map((item: Pair) => (
          <SelectItem key={item._id} value={item._id}>
            {item.name}
          </SelectItem>
        ))}
      </TextFieldSelect>
    </FormControl>
  )
}
