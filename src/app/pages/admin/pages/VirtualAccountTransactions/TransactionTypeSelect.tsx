import React from 'react'
import { SelectProps } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { Select } from 'ui/Select/Select'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const TRANSACTION_TYPES = [
  {
    label: 'Credit',
    value: 'Credit'
  },
  {
    label: 'Debit',
    value: 'Debit'
  }
]

export interface TransactionTypeSelectProps extends TypedSelectProps {}

export const TransactionTypeSelect = (props: TransactionTypeSelectProps) => {
  const { label = 'Transaction Type', name, ...rest } = props

  return (
    <>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select {...(rest as SelectProps)} displayEmpty>
        {renderSelectItems(TRANSACTION_TYPES)}
      </Select>
    </>
  )
}
TransactionTypeSelect.displayName = 'Select_TransactionTypeSelect'
