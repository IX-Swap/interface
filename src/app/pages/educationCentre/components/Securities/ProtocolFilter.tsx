import { FormControl } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
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
          <TextFieldSelect
            label='Protocol'
            onChange={event => {
              onChange(event.target.value)
            }}
            value={value}
          >
            <SelectItem value=''>All Protocols</SelectItem>
            {protocols.map(protocol => (
              <SelectItem key={protocol} value={protocol}>
                {protocol}
              </SelectItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
