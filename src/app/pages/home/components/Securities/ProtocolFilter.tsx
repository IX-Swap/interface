import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

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
            <MenuItem value='ERC-20'>ERC-20</MenuItem>
            <MenuItem value='ERC-1400'>ERC-1400</MenuItem>
            <MenuItem value='Tezos'>Tezos</MenuItem>
            <MenuItem value='INPR-18'>INPR-18</MenuItem>
            <MenuItem value='DS'>DS</MenuItem>
            <MenuItem value='Stellar'>Stellar</MenuItem>
            <MenuItem value='Liquid'>Liquid</MenuItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
