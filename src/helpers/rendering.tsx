/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { Chip, Grid, MenuItem } from '@material-ui/core'
import draftToHtml from 'draftjs-to-html'
import pdfIcon from 'assets/icons/documents/pdf.svg'
import docxIcon from 'assets/icons/documents/docx.svg'
import txtIcon from 'assets/icons/documents/txt.svg'
import unknownIcon from 'assets/icons/documents/unknown.svg'
import { Maybe } from 'types/util'
import { WalletAddress } from 'app/components/WalletAddress'
import { DSOFavorite } from 'app/components/DSOFavorite'
import { DigitalSecurityOffering } from 'types/dso'
import { formatMoney } from './numbers'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Commitment } from 'types/commitment'
import { Order } from 'types/order'
import { OrderStatus } from 'app/pages/exchange/components/PastOrderTable/OrderStatus'
import { Side } from 'app/pages/exchange/components/TradeHistoryTable/Side'
import { dsoQueryKeys } from 'config/queryKeys'
import { sanitize } from 'dompurify'
import { formatDateToMMDDYY, formatTime } from 'helpers/dates'

export const renderMenuItems = (
  items: Array<{ label: string; value: string | number }>
): JSX.Element[] => {
  return items.map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ))
}

export const renderCommitmentMoney = (a: number, row: Commitment) =>
  formatMoney(a, row.currency.numberFormat.currency)

export const renderCommitmentAvatar = (_: any, row: Commitment) => (
  <DSOLogo dsoId={row.dso._id} size={40} />
)

export const renderDSOFavorite = (
  _: any,
  dso: DigitalSecurityOffering
): JSX.Element => (
  <DSOFavorite
    dependentQueryKeys={[
      dsoQueryKeys.getPromoted,
      dsoQueryKeys.getApprovedList
    ]}
    dso={dso}
  />
)

export const renderAddressColumn = (address: string): JSX.Element => (
  <WalletAddress address={address} />
)

export const wysiwygToHtml = (draft: string): string => {
  return draftToHtml(JSON.parse(sanitize(draft)))
}

export const renderOrderStatus = (status: Order['status']) => {
  return <OrderStatus status={status} />
}

export const renderPercentage = (value?: Maybe<Number>) => {
  // TODO: remove when backend is fixed
  if (value === null || value === undefined || value === 0) {
    return undefined
  }

  return <span>{Number.parseFloat(`${value}`) * 100} %</span>
}

export const renderMonths = (value: string | number | undefined | null) =>
  value !== undefined ? `${value} months` : undefined

export const renderMarketType = (marketType: string) => {
  return marketType === '' ? 'Both' : marketType
}

export const documentIcons = {
  pdf: pdfIcon,
  txt: txtIcon,
  docx: docxIcon,
  unknown: unknownIcon
}

export const renderSide = (side: 'BID' | 'ASK') => <Side side={side} />

export const renderDistributionStatus = (
  status: 'approved' | 'pending' | 'rejected' | 'complete'
) => {
  const colorMap = {
    approved: {
      main: '#8DCA82',
      bg: '#EEF7F1'
    },
    pending: {
      main: '#6739B6',
      bg: '#EEE4FF'
    },
    rejected: {
      main: '#D20000',
      bg: '#F4CECE'
    },
    complete: {
      main: '#767676',
      bg: '#E3E3E3'
    }
  }
  return (
    <Chip
      color='secondary'
      size='small'
      label={status === 'pending' ? 'pending aproval' : status}
      style={{
        textTransform: 'uppercase',
        fontWeight: 600,
        color: colorMap[status].main,
        backgroundColor: colorMap[status].bg
      }}
    />
  )
}

export const renderDateAndTimeField = (date: any) => {
  return (
    <Grid container direction={'column'}>
      <Grid item data-testid={'date'}>
        {formatDateToMMDDYY(date)}
      </Grid>
      <Grid item data-testid={'time'} style={{ color: '#AAAAAA' }}>
        {formatTime(date)}
      </Grid>
    </Grid>
  )
}
