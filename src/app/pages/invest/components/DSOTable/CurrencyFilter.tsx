import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { ListItemText, SelectChangeEvent } from '@mui/material'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { useAssetsData } from 'hooks/asset/useAssetsData'

interface FiltersFavProps {
  setPage?: (page: number) => void
}

export const CurrencyFilter = (props: FiltersFavProps) => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const currency = getFilterValue('currency')
  const { status, data } = useAssetsData('Currency,Stablecoin')

  const handleChange = (event: SelectChangeEvent<any>) => {
    props.setPage && props.setPage(0)
    updateFilter(
      'currency',
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    )
  }

  const value = currency !== '' ? currency?.split(',') ?? [] : []

  queryStatusRenderer(status)

  return (
    <Select
      placeholder='Currency'
      multiple
      value={value}
      onChange={handleChange}
      displayEmpty
    >
      {data.list.map(currency => (
        <SelectItem key={currency.symbol} value={currency.symbol} withCheckbox>
          <UICheckbox checked={value.includes(currency.symbol)} />
          <ListItemText primary={currency.symbol} />
        </SelectItem>
      ))}
    </Select>
  )
}
