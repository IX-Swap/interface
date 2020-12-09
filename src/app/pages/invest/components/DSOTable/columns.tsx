import React from 'react'
import { TableColumn } from 'types/util'
import { CorporateIdentity } from 'types/identity'
import { DSONameAndStructure } from './DSONameAndStructure'
import { DigitalSecurityOffering, DSOInsight, DSOTableColumn } from 'types/dso'
import { PriceWithCurrency } from './PriceWithCurrency'
import { DSORaised } from './DSORaised'

export const renderDSONameAndStructure = (
  c: CorporateIdentity,
  dso: DigitalSecurityOffering
) => <DSONameAndStructure corporate={c} dso={dso} />

export const renderPriceWithCurrency = (
  price: string,
  dso: DigitalSecurityOffering
) => <PriceWithCurrency price={price} currency={dso.currency.symbol} />

export const renderDSORaised = (
  i: DSOInsight,
  dso: DigitalSecurityOffering
) => <DSORaised insight={i} dso={dso} />

export const columns: Array<TableColumn<
  DigitalSecurityOffering,
  DSOTableColumn
>> = [
  {
    key: 'favorite',
    label: ''
  },
  {
    key: 'corporate',
    label: 'Offer Name',
    render: renderDSONameAndStructure
  },
  {
    key: 'insight',
    label: 'Status',
    render: renderDSORaised
  },
  {
    key: 'pricePerUnit',
    label: 'Price',
    render: renderPriceWithCurrency,
    align: 'right'
  },
  {
    key: 'totalFundraisingAmount',
    label: 'Raising',
    render: renderPriceWithCurrency,
    align: 'right'
  },
  {
    key: 'minimumInvestment',
    label: 'Minimum',
    render: renderPriceWithCurrency,
    align: 'right'
  },
  {
    key: 'distributionFrequency',
    label: 'Distribution Frequency'
  }
]
