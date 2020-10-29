import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { queryStatusRenderer } from 'v2/components/form/renderUtils'
import { AuthorizableStatus } from 'v2/types/util'

export const BankSelect = (
  props: Partial<SelectProps> & { status?: AuthorizableStatus }
): JSX.Element => {
  const { data, status } = useBanksData()
  const { status: bankStatus = 'Approved' } = props

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  const filteredBanks = data.list.filter(({ status }) => status === bankStatus)
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Bank
      </MenuItem>
      {filteredBanks.map(({ _id, bankName, bankAccountNumber }) => (
        <MenuItem key={_id} value={_id}>
          {bankName} – {bankAccountNumber}
        </MenuItem>
      ))}
    </Select>
  )
}
