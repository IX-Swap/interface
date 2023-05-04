import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'
import React from 'react'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface OfferingTermsProps {
  investmentPeriod: number
  dividendYield: number
  investmentStructure: string
  grossIrr: number
  equityMultiple: number
  distributionFrequency: string
  leverage: number
  interestRate: number
  capitalStructure: string
}

export const OfferingTerms = ({
  investmentPeriod,
  dividendYield,
  investmentStructure,
  grossIrr,
  equityMultiple,
  distributionFrequency,
  leverage,
  interestRate,
  capitalStructure
}: OfferingTermsProps) => {
  const isDebt = capitalStructure === 'Debt'
  const isEquity = capitalStructure === 'Equity'

  const items = [
    {
      label: 'Investment Period',
      value: `${investmentPeriod} months`
    },

    !isDebt && {
      label: 'Dividend Yield (%)',
      value: <PercentageNumber value={dividendYield} />
    },
    !isDebt && {
      label: 'Gross IRR (%)',
      value: <PercentageNumber value={grossIrr} />
    },
    !isDebt && {
      label: 'Equity Multiple',
      value: <PercentageNumber value={equityMultiple} />
    },
    !isEquity && {
      label: 'Interest Rate',
      value: <PercentageNumber value={interestRate} />
    },
    !isEquity && {
      label: 'Leverage',
      value: <PercentageNumber value={leverage} />
    },
    {
      label: 'Investment Structure',
      value: investmentStructure
    },
    {
      label: 'Distribution Frequency',
      value: distributionFrequency
    }
  ]

  return <FieldGrid title={'Offering Terms'} items={items.filter(Boolean)} />
}
