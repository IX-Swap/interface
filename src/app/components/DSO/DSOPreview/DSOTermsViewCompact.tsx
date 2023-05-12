import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface DSOTermsViewCompactProps {
  dso: DigitalSecurityOffering
}

export const DSOTermsViewCompact = ({ dso }: DSOTermsViewCompactProps) => {
  const isDebt = dso.capitalStructure === 'Debt'
  const isEquity = dso.capitalStructure === 'Equity'

  const items = [
    {
      label: 'Investment Period',
      value: `${dso.investmentPeriod ?? ''} months`
    },
    !isDebt && {
      label: 'Dividend Yield (%)',
      value: <PercentageNumber value={dso.dividendYield} />
    },
    !isEquity && {
      label: 'Interest Rate',
      value: <PercentageNumber value={dso.interestRate} />
    },
    {
      label: 'Investment Structure',
      value: dso.investmentStructure
    },
    !true && {
      label: 'Gross IRR (%)',
      value: <PercentageNumber value={dso.grossIRR} />
    },
    !isEquity && {
      label: 'Leverage',
      value: <PercentageNumber value={dso.leverage} />
    },
    !isDebt && {
      label: 'Equity Multiple (%)',
      value: <PercentageNumber value={dso.equityMultiple} />
    },
    {
      label: 'Distribution Frequency',
      value: dso.distributionFrequency
    }
  ]

  return <FieldGrid title={'Offering Terms'} items={items.filter(Boolean)} />
}
