import React from 'react'
import { SelectProps } from '@mui/material'
import { privateClassNames } from 'helpers/classnames'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const NetworkSelect = (props: SelectProps): JSX.Element => {
  const { data } = useAllNetworks()

  return (
    <Select
      {...props}
      style={{ minWidth: 70 }}
      label={props.label}
      data-testid='network-select'
    >
      <SelectItem disabled value={undefined}>
        Blockchain Network
      </SelectItem>
      {data?.map(({ name, _id }) => (
        <SelectItem key={_id} value={_id} className={privateClassNames()}>
          {name}
        </SelectItem>
      ))}
    </Select>
  )
}
