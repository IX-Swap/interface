import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { SelectChangeEvent } from '@mui/material'
import { privateClassNames } from 'helpers/classnames'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const NetworkFilter = () => {
  const { data, status } = useAllNetworks()
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('network')

  const handleChange = (event: SelectChangeEvent<any>) => {
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
      <SelectItem value={'All'}>Network</SelectItem>
      {data?.map(({ name, _id }) => (
        <SelectItem key={_id} value={_id} className={privateClassNames()}>
          {name}
        </SelectItem>
      ))}
    </Select>
  )
}
