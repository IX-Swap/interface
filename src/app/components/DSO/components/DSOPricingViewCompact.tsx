import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { addSymbol, formatMoney } from 'helpers/numbers'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface DSOPricingViewCompactProps {
  dso: DigitalSecurityOffering
}

export const DSOPricingViewCompact = ({ dso }: DSOPricingViewCompactProps) => {
  const currency = dso.currency.symbol
  const totalFundraisingAmount =
    dso.totalFundraisingAmount !== null
      ? addSymbol(dso.totalFundraisingAmount, currency, true)
      : ''
  const minimumInvestment =
    dso.minimumInvestment !== null
      ? addSymbol(dso.minimumInvestment, dso.tokenSymbol, true)
      : ''
  const totalUnits =
    dso.totalFundraisingAmount !== null
      ? addSymbol(
          dso.totalFundraisingAmount / dso.pricePerUnit,
          dso.tokenSymbol,
          true
        )
      : 0
  const minimumInvestmentPrice =
    dso.minimumInvestment !== null
      ? formatMoney(dso.minimumInvestment * dso.pricePerUnit, currency, true)
      : 0

  const items = [
    {
      label: 'Unit Price',
      value: formatMoney(dso.pricePerUnit, currency, true)
    },
    {
      label: 'Minimum Cash Investment',
      value: minimumInvestmentPrice
    },
    {
      label: 'Minimum Token Invesment',
      value: minimumInvestment
    },
    {
      label: 'Total Units',
      value: totalUnits
    },
    {
      label: 'Total Fundraising Amount',
      value: totalFundraisingAmount
    }
  ]

  return <FieldGrid title={'Pricing'} items={items} />
}
