/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { MenuItem } from '@material-ui/core'
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
import { OrderStatus } from 'app/pages/exchange/market/components/PastOrderTable/OrderStatus'
import { Side } from 'app/pages/invest/components/TradeHistoryTable/Side'

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
): JSX.Element => <DSOFavorite dso={dso} />

export const renderAddressColumn = (address: string): JSX.Element => (
  <WalletAddress address={address} />
)

export const wysiwygToHtml = (draft: string): string => {
  return draftToHtml(JSON.parse(draft))
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

export const documentIcons = {
  pdf: pdfIcon,
  txt: txtIcon,
  docx: docxIcon,
  unknown: unknownIcon
}

export const renderSide = (side: 'BID' | 'ASK') => <Side side={side} />
