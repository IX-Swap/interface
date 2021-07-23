import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import dayjs from 'dayjs'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React, { CSSProperties } from 'react'
import { Box } from 'rebass'
import { LogItem } from 'state/eventLog/actions'
import { TYPE } from 'theme'
import { shortenAddress } from '../../utils'
import { ChevronElement } from '../ChevronElement'
import { ActionHistoryStatus, ActionTypes, ActionTypeText, StatusColors, TransactionHistoryStatusText } from './enum'
import {
  DateColumn,
  DateDesktop,
  DateMobile,
  HistoryDetailsWrapper,
  HistoryRowWraper,
  IconColumn,
  NameAndSumColumn,
  RowAndDetailsWrapper,
  StatusColumn,
  TransparentWrapper,
} from './styleds'

interface Props {
  row: LogItem
  style: CSSProperties
  key: any
  show: boolean
  toggleShow: () => void
  currency?: Currency
  icon: () => React.ReactElement
}
export const TransactionHistoryRow = ({ row, style, key, toggleShow, show, currency, icon }: Props) => {
  const status = (row?.params?.status as ActionHistoryStatus) ?? ActionHistoryStatus.PENDING
  const statusText = TransactionHistoryStatusText[status]
  const formattedDate = dayjs(row.createdAt).format('MMM D, YYYY hh:mm')
  const textColor = StatusColors[status]
  return (
    <TransparentWrapper style={style}>
      <RowAndDetailsWrapper showMore={show} onClick={() => toggleShow()}>
        <HistoryRowWraper key={`history-item-${key}`}>
          <NameAndSumColumn>
            <TYPE.subHeader1 color={'text1'}>{ActionTypeText[row.type]}</TYPE.subHeader1>
            <TYPE.subHeader1 color={'text2'}>
              {row?.params?.amount}&nbsp;{currency?.symbol}
            </TYPE.subHeader1>{' '}
          </NameAndSumColumn>
          <Column></Column>
          <StatusColumn>
            <TYPE.subHeader1 color={textColor}>{statusText}</TYPE.subHeader1>
          </StatusColumn>
          <IconColumn>
            <Box marginLeft="9px" display="flex" justifyContent="center">
              <IconWrapper size={20}>{icon()}</IconWrapper>
            </Box>
          </IconColumn>
          <DateColumn>
            <DateDesktop>
              <TYPE.subHeader1 color={'text1'}>{formattedDate}</TYPE.subHeader1>
            </DateDesktop>
            <ChevronElement showMore={show} setShowMore={() => toggleShow()} />
          </DateColumn>
        </HistoryRowWraper>
        {show && (
          <HistoryDetailsWrapper>
            <DateMobile>
              <TYPE.subHeader1 color={'text1'}>{formattedDate}</TYPE.subHeader1>
            </DateMobile>
            {row.type === ActionTypes.WITHDRAW && row?.params?.toAddress && (
              <TYPE.subHeader1 color={'text2'}>
                <b>
                  <Trans>Sent to:</Trans>&nbsp;
                </b>
                {shortenAddress(row?.params?.toAddress)}
              </TYPE.subHeader1>
            )}
            {row.type === ActionTypes.DEPOSIT && row?.params?.fromAddress && (
              <Column style={{ gap: '6px', alignItems: 'flex-end' }}>
                <TYPE.subHeader1 color={'text2'}>
                  <b>
                    <Trans>Deposit from:</Trans>&nbsp;
                  </b>
                  {shortenAddress(row?.params?.fromAddress)}
                </TYPE.subHeader1>
                {
                  <TYPE.subHeader1 color={'text2'}>
                    <b>
                      <Trans>{currency?.symbol} sent to:</Trans>&nbsp;
                    </b>
                    {row?.params?.toAddress && shortenAddress(row?.params?.toAddress)}
                  </TYPE.subHeader1>
                }
              </Column>
            )}
          </HistoryDetailsWrapper>
        )}
      </RowAndDetailsWrapper>
    </TransparentWrapper>
  )
}
