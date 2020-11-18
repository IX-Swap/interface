import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { queryStatusRenderer } from 'v2/components/form/renderUtils'
import { privateClassNames } from 'v2/helpers/classnames'
import { useAllNetworks } from 'v2/app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'

export const NetworkSelect: React.FC<SelectProps> = props => {
  const { data, status } = useAllNetworks()

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Blockchain Network
      </MenuItem>
      {data?.map(({ name, _id }) => (
        <MenuItem key={_id} value={_id} className={privateClassNames()}>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}
