import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
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
          <Select
            displayEmpty
            value={value ?? ''}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              onChange(event.target.value as string)
            }}
            label='Protocol'
          >
            <MenuItem value=''>All Protocols</MenuItem>
            {protocols.map(protocol => (
              <MenuItem key={protocol} value={protocol}>
                {protocol}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
