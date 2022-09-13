import { SelectProps } from '@mui/material'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { privateClassNames } from 'helpers/classnames'
import { renderValue } from 'helpers/forms'
import React from 'react'
import { Network } from 'types/networks'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

interface NetworkSelectProps extends SelectProps {
  placeHolder?: string | undefined
}

export const NetworkSelect = (props: NetworkSelectProps): JSX.Element => {
  const { data } = useAllNetworks()
  const renderName = (value: any) => {
    return renderValue({
      value,
      list: data,
      extractor: (item: Network) => item.name
    })
  }
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        placeholder={String(props.placeHolder)}
        displayEmpty
        renderValue={renderName}
        style={{ minWidth: 70 }}
        data-testid='network-select'
        defaultValue={undefined}
      >
        <SelectItem disabled value={undefined}>
          Select blockchain network
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
NetworkSelect.displayName = 'Select_NetworkSelect'
