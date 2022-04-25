import React from 'react'
import { SelectProps } from '@mui/material'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { privateClassNames } from 'helpers/classnames'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { QueryStatus } from 'react-query'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

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

  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select label={undefined} displayEmpty {...rest}>
        {list.map(({ label, _id }) => (
          <SelectItem key={_id} value={_id} className={privateClassNames()}>
            {label}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
