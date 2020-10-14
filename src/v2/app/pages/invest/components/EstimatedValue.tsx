import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CommitmentFormValues } from 'v2/types/commitment'
import { LabelledValue } from 'v2/components/LabelledValue'
import { formatMoney } from 'v2/helpers/numbers'

export interface EstimatedValueProps {
  symbol: string
}

export const EstimatedValue = (props: EstimatedValueProps) => {
  const { watch } = useFormContext<CommitmentFormValues>()
  const value = watch('totalAmount')

  return (
    <LabelledValue
      label='Estimated Value'
      value={formatMoney(value, props.symbol)}
    />
  )
}
