import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { privateClassNames } from 'helpers/classnames'
import { useWithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'

export interface WithdrawalAddressSelectProps extends SelectProps {
  network?: string
}

export const WithdrawalAddressSelect: React.FC<
  WithdrawalAddressSelectProps
> = props => {
  const { network, ...rest } = props
  const { data, status } = useWithdrawalAddresses({ network })

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  const filteredAddresses = data.list.filter(
    ({ status }) => status === 'Approved'
  )

  return (
    <Select {...rest}>
      <MenuItem value=''>I don't want to specify a wallet</MenuItem>
      {filteredAddresses.map(({ label, _id }) => (
        <MenuItem key={_id} value={_id} className={privateClassNames()}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
