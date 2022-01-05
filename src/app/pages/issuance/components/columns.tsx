import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { TableColumn } from 'types/util'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Grid } from '@material-ui/core'
import { renderPriceWithCurrency } from 'app/pages/invest/components/DSOTable/columns'

export const renderDSOLogo = (dsoId: string) => (
  <Grid container justifyContent='center' alignItems='center'>
    <DSOLogo dsoId={dsoId} size={70} />
  </Grid>
)
export const columns: Array<TableColumn<DigitalSecurityOffering>> = [
  {
    key: '_id',
    label: '',
    render: renderDSOLogo,
    align: 'center'
  },
  {
    key: 'tokenName',
    label: 'Name'
  },
  {
    key: 'pricePerUnit',
    label: 'Price',
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
    key: 'capitalStructure',
    label: 'Capital Structure'
  },
  {
    key: 'distributionFrequency',
    label: 'Distribution Frequency'
  },
  {
    key: 'status',
    label: 'Status'
  }
]
