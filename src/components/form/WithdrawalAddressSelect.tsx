import { SelectProps } from '@mui/material'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { privateClassNames } from 'helpers/classnames'
import { renderValue } from 'helpers/forms'
import React from 'react'
import { QueryStatus } from 'react-query'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface WithdrawalAddressSelectProps extends SelectProps {
  list: WithdrawalAddress[]
  status: QueryStatus
}

export const WithdrawalAddressSelect: React.FC<
  WithdrawalAddressSelectProps
> = props => {
  const { list, status, ...rest } = props

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus
  const renderName = (value: any) => {
    return renderValue({
      value,
      list,
      extractor: (item: WithdrawalAddress) => item.label
    })
  }
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select displayEmpty {...rest} label={undefined} renderValue={renderName}>
        {list.map(({ label, _id }) => (
          <SelectItem key={_id} value={_id} className={privateClassNames()}>
            {label}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}

WithdrawalAddressSelect.displayName = 'Select_WithdrawalAddressSelect'
