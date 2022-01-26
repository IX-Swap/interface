import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { MenuItem, Select } from '@mui/material'
import { privateClassNames } from 'helpers/classnames'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { queryStatusRenderer } from 'components/form/renderUtils'

export const NetworkFilter = () => {
  const { data, status } = useAllNetworks()
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('network')

  const handleChange = (event: ChangeEvent<{ value: any }>) => {
    const {
      target: { value }
    } = event

    if (value === 'All') {
      removeFilter('network')
    } else {
      updateFilter('network', event.target.value)
    }
  }

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  return (
    <Select
      fullWidth
      value={value ?? 'All'}
      variant={'outlined'}
      onChange={handleChange}
      defaultValue={value ?? 'All'}
      style={{ fontSize: 15, fontWeight: 'normal' }}
    >
      <MenuItem value={'All'}>Network</MenuItem>
      {data?.map(({ name, _id }) => (
        <MenuItem key={_id} value={_id} className={privateClassNames()}>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}
