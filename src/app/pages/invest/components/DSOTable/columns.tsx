import React from 'react'
import { TableColumn } from 'types/util'
import { CorporateIdentity } from 'types/identity'
import { DSONameAndStructure } from './DSONameAndStructure'
import { DigitalSecurityOffering, DSOInsight } from 'types/dso'
import { PriceWithCurrency } from './PriceWithCurrency'
import { DSORaised } from './DSORaised'
import { renderDSOFavorite } from 'helpers/rendering'

export const renderDSONameAndStructure = (
  c: CorporateIdentity,
  dso: DigitalSecurityOffering
) => <DSONameAndStructure corporate={c} dso={dso} />

export const renderPriceWithCurrency = (
  price: number,
  dso: DigitalSecurityOffering
) => <PriceWithCurrency price={price} currency={dso.currency.symbol} />

export const renderDSOStatus = (
  i: DSOInsight,
  dso: DigitalSecurityOffering
) => <DSORaised insight={i} dso={dso} />

export const columns: Array<TableColumn<DigitalSecurityOffering>> = [
  {
    key: 'favorite',
    label: '',
    render: renderDSOFavorite
  },
  {
    key: 'corporate',
    label: 'Offer Name',
    render: renderDSONameAndStructure
  },
  {
    key: 'insight',
    label: 'Status',
    render: renderDSOStatus
  },
  {
    key: 'pricePerUnit',
    label: 'Price',
    render: renderPriceWithCurrency,
    headAlign: 'right',
    align: 'right'
  },
  {
    key: 'totalFundraisingAmount',
    label: 'Raising',
    render: renderPriceWithCurrency,
    headAlign: 'right',
    align: 'right'
  },
  {
    key: 'minimumInvestment',
    label: 'Minimum',
    render: renderPriceWithCurrency,
    headAlign: 'right',
    align: 'right'
  },
  {
    key: 'distributionFrequency',
    label: 'Distribution Frequency'
  }
]
