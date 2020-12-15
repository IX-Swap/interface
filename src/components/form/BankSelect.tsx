import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { AuthorizableStatus } from 'types/util'
import { privateClassNames } from 'helpers/classnames'

export const BankSelect = (
  props: Partial<SelectProps> & { status?: AuthorizableStatus }
): JSX.Element => {
  const { data, status } = useBanksData()
  const { status: bankStatus = 'Approved' } = props

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  const filteredBanks = data.list.filter(({ status }) => status === bankStatus)
  return (
    <Select {...props} className={privateClassNames()}>
      <MenuItem disabled value={undefined}>
        Bank
      </MenuItem>
      {filteredBanks.map(({ _id, bankName, bankAccountNumber }) => (
        <MenuItem key={_id} value={_id} className={privateClassNames()}>
          {bankName} – {bankAccountNumber}
        </MenuItem>
      ))}
    </Select>
  )
}
