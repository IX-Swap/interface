import { FormControl, InputLabel, MenuItem } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

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
          <InputLabel shrink>Protocol</InputLabel>
          <TextFieldSelect
            label='Protocol'
            onChange={event => {
              onChange(event.target.value)
            }}
            value={value}
          >
            <MenuItem value=''>All Protocols</MenuItem>
            {protocols.map(protocol => (
              <MenuItem key={protocol} value={protocol}>
                {protocol}
              </MenuItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
