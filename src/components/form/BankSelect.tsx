import React from 'react'
import { SelectProps, TextFieldProps } from '@mui/material'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { AuthorizableStatus } from 'types/util'
import { ValidCurrency } from 'helpers/types'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

interface BankSelectProps extends Partial<SelectProps> {
  currency?: ValidCurrency
  status?: AuthorizableStatus
}

export const BankSelect = (props: BankSelectProps) => {
  const { data, isLoading } = useBanksData()
  const { status: bankStatus = 'Approved', ...rest } = props

  if (isLoading || data === undefined) return null

  const filteredBanks = data.list.filter(
    ({ status, currency }) =>
      status === bankStatus &&
      (props.currency !== undefined ? currency.symbol === props.currency : true)
  )

  return (
    <TextFieldSelect {...(rest as TextFieldProps)}>
      <SelectItem disabled value={undefined}>
        {filteredBanks.length > 0 ? 'Bank' : 'No available banks'}
      </SelectItem>
      {filteredBanks.map(({ _id, bankName, bankAccountNumber }) => (
        <SelectItem key={_id} value={_id}>
          {bankName} – {bankAccountNumber}
        </SelectItem>
      ))}
    </TextFieldSelect>
  )
}

BankSelect.displayName = 'TextField_BankSelect'
