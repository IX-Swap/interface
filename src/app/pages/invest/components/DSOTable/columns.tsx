import React from 'react'
import { TableColumn } from 'types/util'
import { DSONameAndStructure } from './DSONameAndStructure'
import { DigitalSecurityOffering, DSOInsight, DSOTableColumn } from 'types/dso'
import { PriceWithCurrency } from './PriceWithCurrency'
import { DSORaised } from './DSORaised'
import { renderDSOFavorite } from 'helpers/rendering'
import { formatDateToMMDDYY } from 'helpers/dates'
import { addSymbol, formatMoney } from 'helpers/numbers'

export const renderDSONameAndStructure = (
  tokenName: string,
  dso: DigitalSecurityOffering
) => <DSONameAndStructure tokenName={tokenName} dso={dso} />

export const renderPriceWithCurrency = (
  price: number,
  dso: DigitalSecurityOffering
) => <PriceWithCurrency price={price} currency={dso.currency?.symbol} />

export const renderDSOStatus = (
  i: DSOInsight,
  dso: DigitalSecurityOffering
) => <DSORaised insight={i} dso={dso} />

const abbreviateNumber = (
  value: number | null,
  symbol?: string,
  right?: boolean
) => {
  // https://stackoverflow.com/a/60980688

  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    // @ts-expect-error
    notation: 'compact',
    compactDisplay: 'short'
  })

  const num = formatter.format(value ?? 0)

  return addSymbol(num, symbol, right)
}

const renderTotalFundraisingAmount = (
  i: DSOInsight,
  dso: DigitalSecurityOffering
) => {
  return abbreviateNumber(dso.totalFundraisingAmount, dso.currency.symbol)
}

const renderMinimumInvestment = (
  i: DSOInsight,
  dso: DigitalSecurityOffering
) => {
  return formatMoney(dso.minimumInvestment, dso.currency.symbol)
}

const renderExpectedReturn = (i: DSOInsight, dso: DigitalSecurityOffering) => {
  return (dso !== undefined && dso.capitalStructure === 'Debt'
    ? dso.interestRate ?? 0
    : dso.grossIRR ?? 0
  )
    .toString()
    .concat('%')
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
