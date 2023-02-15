import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { FormControl, SelectChangeEvent } from '@mui/material'
import { IdentityTypeSelect } from 'components/form/IdentityTypeSelect'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const IdentityTypeFilter = () => {
  const getValue = (value: any) => {
    let res = ''
    switch (value) {
      case 'issuer_corporate':
        res = 'Issuer and Corporate'
        break
      case 'individual':
        res = 'Individual Identity'
        break
      case 'issuer':
        res = 'Issuer Identity'
        break
      case 'corporate':
        res = 'Corporate Identity'
        break
      case '':
        res = 'All'
        break
      default:
        res = 'All'
        break
    }
    return res
  }
  return (
    <SearchQueryFilter<'identityType'> name='identityType' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 207 }}>
          <InputLabel shrink>Identity Type</InputLabel>
          <IdentityTypeSelect
            withAll
            displayEmpty
            // value={value ?? ''}
            value={getValue(value)}
            onChange={(event: SelectChangeEvent<unknown>) => {
              onChange(event.target.value as string)
            }}
            label={undefined}
          />
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
