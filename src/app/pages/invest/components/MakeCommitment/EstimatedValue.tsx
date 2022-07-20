import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CommitmentFormValues } from 'types/commitment'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'

export interface EstimatedValueProps {
  symbol: string
}

export const EstimatedValue = (props: EstimatedValueProps) => {
  const { watch } = useFormContext<CommitmentFormValues>()
  const value = watch('totalAmount')

  return (
    <LabelledValue
      label='Investment amount:'
      value={formatMoney(value ?? 0, props.symbol)}
    />
  )
}
