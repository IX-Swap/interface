import { Currency } from '@ixswap1/sdk-core'
import dayjs from 'dayjs'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React from 'react'
import { Box } from 'rebass'
import { LogItem } from 'state/eventLog/actions'
import { TYPE } from 'theme'
import { ActionHistoryStatus, ActionTypeText, StatusColors, TransactionHistoryStatusText } from './enum'
import { DateColumn, DateDesktop, HistoryRowWraper, IconColumn, NameAndSumColumn, StatusColumn } from './styleds'

interface Props {
  row: LogItem
  key: any
  currency?: Currency
  icon: () => React.ReactElement
}
export const TransactionHistoryRow = ({ row, key, currency, icon }: Props) => {
  const status = (row?.params?.status as ActionHistoryStatus) ?? ActionHistoryStatus.PENDING
  const statusText = TransactionHistoryStatusText[status]
  const formattedDate = dayjs(row.createdAt).format('MMM D, YYYY hh:mm')
  const textColor = StatusColors[status]
  return (
    <HistoryRowWraper key={`history-item-${key}`}>
      <NameAndSumColumn>
        <TYPE.subHeader1 color={'text1'}>{ActionTypeText[row.type]}</TYPE.subHeader1>
        <TYPE.subHeader1 color={'text2'}>{row?.params?.amount}</TYPE.subHeader1>{' '}
      </NameAndSumColumn>
      <StatusColumn>
        <IconColumn>
          <Box marginRight="8px" display="flex" justifyContent="center">
            <IconWrapper size={20}>{icon()}</IconWrapper>
          </Box>
        </IconColumn>
        <TYPE.subHeader1 color={textColor}>{statusText}</TYPE.subHeader1>
      </StatusColumn>
      <DateColumn>
        <DateDesktop>
          <TYPE.subHeader1 color={'text1'}>{formattedDate}</TYPE.subHeader1>
        </DateDesktop>
        {/* <ChevronElement showMore={show} setShowMore={() => toggleShow()} /> */}
      </DateColumn>
    </HistoryRowWraper>
  )
}
