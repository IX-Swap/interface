import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@material-ui/core'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { AuthorizableStatus } from 'types/util'
import { privateClassNames } from 'helpers/classnames'
import { useFormError } from 'hooks/useFormError'

export const BankSelect = (
  props: Partial<SelectProps> & { status?: AuthorizableStatus } & {
    helperText?: string
  }
): JSX.Element => {
  const { data, status } = useBanksData()
  const { hasError, error } = useFormError(props.name ?? '')
  const {
    status: bankStatus = 'Approved',
    label,
    value,
    helperText,
    ...rest
  } = props

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  const filteredBanks = data.list.filter(({ status }) => status === bankStatus)
  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel shrink={value !== undefined && value !== null}>
        {label}
      </InputLabel>
      <Select {...rest} value={value} className={privateClassNames()}>
        <MenuItem disabled value={undefined}>
          Bank
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
