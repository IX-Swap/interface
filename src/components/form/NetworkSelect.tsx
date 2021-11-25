import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { privateClassNames } from 'helpers/classnames'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'

export const NetworkSelect = (props: SelectProps): JSX.Element => {
  const { data } = useAllNetworks()

  return (
    <Select
      {...props}
      style={{ minWidth: 70 }}
      label={props.label}
      data-testid='network-select'
    >
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
