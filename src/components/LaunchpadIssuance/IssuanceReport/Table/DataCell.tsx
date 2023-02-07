import PlainCopy from 'components/PlainCopy/PlainCopy'
import { IssuanceDataExtract } from 'state/issuance/types'
import { shortenAddress } from 'utils'
import { formatCurrency } from 'utils/money'
import { shortenEmail } from 'utils/strings'
import { OverflowRaw } from './styled'
import { ValueOrTick } from './ValueOrTick'
import React from 'react'

interface DataCellProps {
  investment: IssuanceDataExtract
  field: keyof IssuanceDataExtract
}
export const DataCell = ({ investment, field }: DataCellProps) => {
  const fieldValue = String(investment[field] ?? '')
  if (['walletAddress', 'email'].includes(field)) {
    const value = field === 'walletAddress' ? shortenAddress(fieldValue) : shortenEmail(fieldValue)
    return (
      <PlainCopy toCopy={String(investment[field])}>
        <ValueOrTick>{value}</ValueOrTick>
      </PlainCopy>
    )
  }
  let value = fieldValue
  if (field === 'investmentAmount') value = formatCurrency(fieldValue, '$')
  if (field === 'stage') value = fieldValue === 'sale' ? 'Sale' : 'Pre-Sale'
  if (field === 'accredited') value = fieldValue === '1' ? 'Yes' : 'No'
  return (
    <OverflowRaw key={field}>
      <ValueOrTick>{value}</ValueOrTick>
    </OverflowRaw>
  )
}
