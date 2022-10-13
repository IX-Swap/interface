/* eslint-disable */
import { SelectProps } from '@mui/material'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { privateClassNames } from 'helpers/classnames'
import { renderValue } from 'helpers/forms'
import React from 'react'
import { Network } from 'types/networks'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { Icon } from 'ui/Icons/Icon'
import { useDisabledSelectComponent } from './useFormStyles/disabledSelectComponent'

interface NetworkSelectProps extends SelectProps {
  placeHolder?: string | undefined
  isDisabled?: boolean
}

export const NetworkSelect = (props: NetworkSelectProps): JSX.Element => {
  const { data } = useAllNetworks()
  const classes = useDisabledSelectComponent()

  const renderName = (value: any) => {
    return renderValue({
      value,
      list: data,
      extractor: (item: Network) => item.name
    })
  }
  return (
    <div className={props.isDisabled ? classes.root : ''}>
      <InputLabel>{props.label}</InputLabel>
      {props.isDisabled ? (
        <Icon color={'#7DD320'} name={'check'} className='svgCheck' />
      ) : null}
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
    </div>
  )
}
NetworkSelect.displayName = 'Select_NetworkSelect'
