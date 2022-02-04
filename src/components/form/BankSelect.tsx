import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { AuthorizableStatus } from 'types/util'
import { privateClassNames } from 'helpers/classnames'
import { useFormError } from 'hooks/useFormError'
import { ValidCurrency } from 'helpers/types'

interface BankSelectProps extends Partial<SelectProps> {
  helperText?: string
  currency?: ValidCurrency
  status?: AuthorizableStatus
}

export const BankSelect = (props: BankSelectProps) => {
  const { data, isLoading } = useBanksData()
  const { hasError, error } = useFormError(props.name ?? '')
  const {
    status: bankStatus = 'Approved',
    label,
    value,
    helperText,
    ...rest
  } = props

  if (isLoading || data === undefined) return null

  const filteredBanks = data.list.filter(
    ({ status, currency }) =>
      status === bankStatus &&
      (props.currency !== undefined ? currency.symbol === props.currency : true)
  )

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel shrink={value !== undefined && value !== null}>
        {label}
      </InputLabel>
      <Select {...rest} value={value} className={privateClassNames()}>
        <MenuItem disabled value={undefined}>
          {filteredBanks.length > 0 ? 'Bank' : 'No available banks'}
        </MenuItem>
        {filteredBanks.map(({ _id, bankName, bankAccountNumber }) => (
          <MenuItem key={_id} value={_id} className={privateClassNames()}>
            {bankName} – {bankAccountNumber}
          </MenuItem>
        ))}
      </Select>

      {!hasError && helperText !== undefined ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : null}

      {hasError && <FormHelperText error>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
