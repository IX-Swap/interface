import React from 'react'
import { TableColumn } from 'types/util'
import { DSONameAndStructure } from './DSONameAndStructure'
import { DigitalSecurityOffering, DSOInsight, DSOTableColumn } from 'types/dso'
import { PriceWithCurrency } from './PriceWithCurrency'
import { DSORaised } from './DSORaised'
import { renderDSOFavorite } from 'helpers/rendering'
import { formatDateToMMDDYY } from 'helpers/dates'
import { abbreviateNumber, formatMoney } from 'helpers/numbers'

export const renderDSONameAndStructure = (
  tokenName: string,
  dso: DigitalSecurityOffering,
  size?: number
) => <DSONameAndStructure tokenName={tokenName} dso={dso} size={size} />

export const renderPriceWithCurrency = (
  price: number,
  dso: DigitalSecurityOffering
) => <PriceWithCurrency price={price} currency={dso.currency?.symbol} />

export const renderDSOStatus = (
  i: DSOInsight,
  dso: DigitalSecurityOffering
) => <DSORaised insight={i} dso={dso} />

export const renderTotalFundraisingAmount = (
  raising: number,
  dso: DigitalSecurityOffering
) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short'
  })
  return abbreviateNumber(raising, dso.currency.symbol, false, formatter)
}

export const renderMinimumInvestment = (
  minimumInvestment: number,
  dso: DigitalSecurityOffering
) => {
  return formatMoney(minimumInvestment, dso.currency.symbol)
}

export const renderExpectedReturn = (
  interestRate: number,
  dso: DigitalSecurityOffering
) => {
  const result =
    dso !== undefined && dso.capitalStructure === 'Debt'
      ? dso.interestRate ?? 0
      : dso.grossIRR ?? 0
  return (result * 100).toFixed(2).toString().concat('%')
}

export const columns: Array<
  TableColumn<DigitalSecurityOffering, DSOTableColumn>
> = [
  {
    key: 'favorite',
    label: '',
    render: renderDSOFavorite
  },
  {
    key: 'tokenName',
    label: 'Offer Name',
    render: renderDSONameAndStructure,
    headAlign: 'left',
    align: 'left'
  },
  {
    key: 'completionDate',
    label: 'Closing Date',
    render: formatDateToMMDDYY,
    headAlign: 'left',
    align: 'left'
  },
  {
    key: 'totalFundraisingAmount',
    label: 'Raising',
    render: renderTotalFundraisingAmount,
    headAlign: 'left',
    align: 'left'
  },
  {
    key: 'minimumInvestment',
    label: 'Min. Investment',
    render: renderMinimumInvestment,
    headAlign: 'left',
    align: 'left'
  },
  {
    key: 'distributionFrequency',
    label: 'Distribution Frequency'
  },
  {
    key: 'interestRate',
    label: 'Expected Return',
    render: renderExpectedReturn
  }
]

export const defaultSelectedColumns: Record<DSOTableColumn, boolean> = {
  tokenName: true,
  completionDate: true,
  distributionFrequency: true,
  favorite: true,
  insight: true,
  minimumInvestment: true,
  pricePerUnit: true,
  totalFundraisingAmount: true,
  interestRate: true
}
