/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { Grid, MenuItem } from '@mui/material'
import draftToHtml from 'draftjs-to-html'
import pdfIcon from 'assets/icons/documents/pdf2.svg'
import docxIcon from 'assets/icons/documents/docx.svg'
import txtIcon from 'assets/icons/documents/txt.svg'
import unknownIcon from 'assets/icons/documents/unknown.svg'
import { WalletAddress } from 'app/components/WalletAddress'
import { DSOFavorite } from 'app/components/DSOFavorite'
import { DigitalSecurityOffering } from 'types/dso'
import { formatMoney } from './numbers'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Commitment } from 'types/commitment'
import { Order, OrderSide } from 'types/order'
import { OrderStatus } from 'app/pages/exchange/components/PastOrderTable/OrderStatus'
import { Side } from 'app/pages/exchange/components/TradeHistoryTable/Side'
import { dsoQueryKeys } from 'config/queryKeys'
import { sanitize } from 'dompurify'
import { formatDateToMMDDYY, formatTime } from 'helpers/dates'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const renderMenuItems = (
  items: Array<{ label: string; value: string | number }>
): JSX.Element[] => {
  return items.map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ))
}

export const renderSelectItems = (
  items: Array<{ label: string; value: string | number }>
): JSX.Element[] => {
  return items.map(({ value, label }) => (
    <SelectItem key={value} value={value}>
      {label}
    </SelectItem>
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

export const renderMarketType = (marketType: string) => {
  return marketType === '' ? 'Both' : marketType
}

export const documentIcons = {
  pdf: pdfIcon,
  txt: txtIcon,
  docx: docxIcon,
  unknown: unknownIcon
}

export const renderSide = (side: OrderSide) => <Side side={side} />

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

export const renderPartOfEmail = (email: string | undefined) => {
  if (email === undefined || email.length < 1) {
    return ''
  }
  const [firstPart, secondPart] = email.split('@')
  return firstPart.slice(0, 3) + '***@' + secondPart
}
