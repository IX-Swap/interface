import React from 'react'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Grid } from '@mui/material'
import {
  renderPriceWithCurrency,
  renderSettings
} from 'app/pages/invest/components/DSOTable/columns'
import { HeadCellWithSort } from 'ui/UIKit/TablesKit/components/HeadCellWithSort/HeadCellWithSort'
import { renderListingStatus } from 'helpers/tables'

export const renderDSOLogo = (dsoId: string) => (
  <Grid container alignItems='center'>
    <DSOLogo dsoId={dsoId} size={32} />
  </Grid>
)

export const columns = [
  {
    label: 'Logo',
    key: '_id',
    render: renderDSOLogo
  },
  {
    label: <HeadCellWithSort label={'Name'} field={'tokenName'} />,
    key: 'tokenName'
  },
  {
    key: 'pricePerUnit',
    label: <HeadCellWithSort label={'Price'} field={'pricePerUnit'} />,
    render: renderPriceWithCurrency
  },
  {
    key: 'minimumInvestment',
    label: <HeadCellWithSort label={'Minimum'} field={'minimumInvestment'} />,
    render: renderPriceWithCurrency
  },
  {
    key: 'capitalStructure',
    label: (
      <HeadCellWithSort
        label={'Capital Structure'}
        field={'capitalStructure'}
      />
    )
  },
  {
    key: 'distributionFrequency',
    label: (
      <HeadCellWithSort
        label={'Distribution'}
        field={'distributionFrequency'}
      />
    )
  },
  {
    key: '_id',
    label: 'Settings',
    render: renderSettings
  },
  {
    key: 'status',
    label: <HeadCellWithSort label={'Status'} field={'status'} />,
    render: renderListingStatus
  }
]

export const compactColumns = [
  //   {
  //     label: 'Pair',
  //     key: '_id'
  //   },
  {
    label: 'Logo',
    key: '_id',
    render: renderDSOLogo
  },
  {
    label: 'Name',
    key: 'tokenName'
  },
  {
    key: 'pricePerUnit',
    label: 'Price',
    render: renderPriceWithCurrency
  },
  {
    key: 'minimumInvestment',
    label: 'Minimum',
    render: renderPriceWithCurrency
  },
  {
    key: 'capitalStructure',
    label: 'Capital Structure'
  },
  {
    key: 'distributionFrequency',
    label: 'Distribution'
  },
  {
    key: '_id',
    label: 'Settings',
    render: renderSettings
  },
  {
    key: 'status',
    label: 'Status',
    render: renderListingStatus
  }
]
