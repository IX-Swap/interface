import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { privateClassNames } from 'helpers/classnames'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'

export const NetworkSelect = (props: SelectProps): JSX.Element => {
  const { data, status } = useAllNetworks()

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  return (
    <Select {...props} style={{ minWidth: 70 }} label={props.label}>
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
