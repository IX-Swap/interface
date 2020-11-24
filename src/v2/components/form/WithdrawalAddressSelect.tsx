import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { queryStatusRenderer } from 'v2/components/form/renderUtils'
import { privateClassNames } from 'v2/helpers/classnames'
import { useWithdrawalAddresses } from 'v2/app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'

export const WithdrawalAddressSelect: React.FC<SelectProps> = props => {
  const { data, status } = useWithdrawalAddresses({})

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  const filteredAddresses = data.list.filter(
    ({ status }) => status === 'Approved'
  )

  return (
    <Select {...props}>
      <MenuItem value=''>I don't want to specify a wallet</MenuItem>
      {filteredAddresses.map(({ label, _id }) => (
        <MenuItem key={_id} value={_id} className={privateClassNames()}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
