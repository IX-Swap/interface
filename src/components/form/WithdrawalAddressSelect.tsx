import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { privateClassNames } from 'helpers/classnames'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { QueryStatus } from 'react-query'

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
    <Select {...rest}>
      {list.map(({ label, _id }) => (
        <MenuItem key={_id} value={_id} className={privateClassNames()}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
