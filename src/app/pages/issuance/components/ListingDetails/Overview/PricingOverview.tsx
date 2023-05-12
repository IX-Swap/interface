import { formatAmount } from 'helpers/numbers'
import React from 'react'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface PricingOverviewProps {
  minTradeAmount: number
  maxTradeAmount: number
  raisedAmount: number
}

export const PricingOverview = ({
  minTradeAmount,
  maxTradeAmount,
  raisedAmount
}: PricingOverviewProps) => {
  const items = [
    {
      label: 'Min Trade Amount',
      value: formatAmount(minTradeAmount)
    },
    {
      label: 'Max Trade Amount',
      value: formatAmount(maxTradeAmount)
    },
    {
      label: 'Raised Amount',
      value: formatAmount(raisedAmount)
    }
  ]

  return <FieldGrid title={'Pricing'} items={items} />
}
