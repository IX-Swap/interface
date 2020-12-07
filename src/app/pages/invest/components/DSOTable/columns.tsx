import React from 'react'
import { TableColumn } from 'types/util'
import { CorporateIdentity } from 'types/identity'
import { DSOName } from './DSOName'
import { DigitalSecurityOffering, DSOInsightType } from 'types/dso'
import { PriceWithCurrency } from './PriceWithCurrency'
import { DSOInsight } from './DSOInsight'

export const columns: Array<TableColumn<DigitalSecurityOffering>> = [
  {
    key: 'favorite',
    label: ''
  },
  {
    key: 'corporate',
    label: 'Offer Name',
    render: (c: CorporateIdentity, dso: DigitalSecurityOffering) => (
      <DSOName corporate={c} dso={dso} />
    )
  },
  {
    key: 'insight',
    label: 'Status',
    render: (i: DSOInsightType, dso: DigitalSecurityOffering) => (
      <DSOInsight insight={i} dso={dso} />
    )
  },
  {
    key: 'pricePerUnit',
    label: 'Price',
    render: (price: string, dso: DigitalSecurityOffering) => (
      <PriceWithCurrency price={price} currency={dso.currency.symbol} />
    ),
    align: 'right'
  },
  {
    key: 'totalFundraisingAmount',
    label: 'Raising',
    render: (price: string, dso: DigitalSecurityOffering) => (
      <PriceWithCurrency price={price} currency={dso.currency.symbol} />
    ),
    align: 'right'
  },
  {
    key: 'minimumInvestment',
    label: 'Minimum',
    render: (price: string, dso: DigitalSecurityOffering) => (
      <PriceWithCurrency price={price} currency={dso.currency.symbol} />
    ),
    align: 'right'
  },
  {
    key: 'distributionFrequency',
    label: 'Distribution Frequency'
  }
]
