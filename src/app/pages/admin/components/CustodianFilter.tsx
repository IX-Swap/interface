import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'

export interface CustodianFilterProps {
  custodian: 'HEX' | 'InvestaX'
  defaultValue?: string | null
}

export const CustodianFilter = ({
  custodian,
  defaultValue = ''
}: CustodianFilterProps) => {
  const getStringValue = (value: string | undefined, checked: boolean) => {
    const splitValue = value?.split(',') ?? []
    const nextValue = checked
      ? [...splitValue, custodian]
      : splitValue.filter(item => item !== custodian)
    return nextValue.join(',')
  }

  const getChecked = (value: string | undefined) => {
    return value?.includes(custodian) ?? false
  }
  return (
    <SearchQueryFilter<'type'>
      name='type'
      defaultValue={defaultValue ?? undefined}
    >
      {({ value, onChange }) => (
        <FormControlLabel
          style={{ marginRight: 0 }}
          control={
            <Checkbox
              checked={getChecked(value)}
              onChange={(_, checked) => {
                onChange(getStringValue(value, checked))
              }}
              name='type'
              color='primary'
            />
          }
          label={custodian}
        />
      )}
    </SearchQueryFilter>
  )
}
