import React from 'react'
import { Box } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { ReactComponent as SGDIcon } from 'assets/icons/flags/sgd.svg'
import { ReactComponent as USDIcon } from 'assets/icons/flags/usd.svg'

const CURRENCIES = [
  {
    label: (
      <Box display={'flex'} alignItems={'center'}>
        <SGDIcon style={{ marginRight: 16 }} />
        SGD
      </Box>
    ),
    value: 'SGD'
  },
  {
    label: (
      <Box display={'flex'} alignItems={'center'}>
        <USDIcon style={{ marginRight: 16 }} />
        USD
      </Box>
    ),
    value: 'USD'
  }
]

export const CurrencySelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        placeholder={String(props.label)}
        displayEmpty
        renderValue={value =>
          CURRENCIES.find(currency => currency.value === value)?.label
        }
      >
        <SelectItem disabled value={undefined}>
          Select Currency
        </SelectItem>
        {renderSelectItems(CURRENCIES)}
      </Select>
    </>
  )
}

CurrencySelect.displayName = 'Select_CurrencySelect'
