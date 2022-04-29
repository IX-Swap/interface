import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { renderValue } from 'helpers/forms'
import { ValidCurrency } from 'helpers/types'
import React from 'react'
import { Bank } from 'types/bank'
import { AuthorizableStatus } from 'types/util'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select, SelectProps } from 'ui/Select/Select'
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
  const renderName = (value: any) => {
    return renderValue({
      value,
      list: filteredBanks,
      extractor: ({ bankName, bankAccountNumber }: Bank) =>
        `${bankName} – ${bankAccountNumber}`
    })
  }
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select {...rest} label={undefined} renderValue={renderName}>
        <SelectItem disabled value={undefined}>
          {filteredBanks.length > 0 ? 'Bank' : 'No available banks'}
        </SelectItem>
        {filteredBanks.map(({ _id, bankName, bankAccountNumber }) => (
          <SelectItem key={_id} value={_id}>
            {bankName} – {bankAccountNumber}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}

BankSelect.displayName = 'Select_BankSelect'
