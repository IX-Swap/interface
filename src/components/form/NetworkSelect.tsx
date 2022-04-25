import React from 'react'
import { SelectProps } from '@mui/material'
import { privateClassNames } from 'helpers/classnames'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { Select } from 'ui/Select/Select'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const NetworkSelect = (props: SelectProps): JSX.Element => {
  const { data } = useAllNetworks()

  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        placeholder={String(props.label)}
        displayEmpty
        style={{ minWidth: 70 }}
        data-testid='network-select'
        defaultValue={undefined}
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
    </>
  )
}
