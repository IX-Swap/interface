import { FormControl } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { isEmptyString } from 'helpers/strings'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const protocols = [
  'ERC-20',
  'Algorand',
  'ERC-1400',
  'Tezos',
  'INPR-18',
  'DS',
  'Stellar',
  'Liquid'
]

export const ProtocolFilter = () => {
  return (
    <SearchQueryFilter<'protocol'> name='protocol' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 140 }}>
          <InputLabel>Protocol</InputLabel>
          <Select
            onChange={event => {
              onChange(event.target.value as string)
            }}
            value={isEmptyString(value) ? 'All Protocols' : value}
          >
            <SelectItem value=''>All Protocols</SelectItem>
            {protocols.map(protocol => (
              <SelectItem key={protocol} value={protocol}>
                {protocol}
              </SelectItem>
            ))}
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
