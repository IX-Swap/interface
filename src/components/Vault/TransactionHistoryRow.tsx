import { Currency } from '@ixswap1/sdk-core'
import { ReactComponent as Info } from 'assets/images/info.svg'
import dayjs from 'dayjs'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from 'rebass'
import { AppDispatch } from 'state'
import { useToggleTransactionModal } from 'state/application/hooks'
import { LogItem, setLogItem } from 'state/eventLog/actions'
import { TYPE } from 'theme'
import { ActionHistoryStatus, ActionTypeText, getActionStatusText, getStatusColor } from './enum'
import { DateColumn, DateDesktop, HistoryRowWraper, IconColumn, NameAndSumColumn, StatusColumn } from './styleds'

interface Props {
  row: LogItem
  key: any
  currency?: Currency
  icon: () => React.ReactElement
}
export const TransactionHistoryRow = ({ row, key, icon }: Props) => {
  const status = (row?.params?.status as ActionHistoryStatus) ?? ActionHistoryStatus.PENDING
  const statusText = getActionStatusText(row.type, status)
  const formattedDate = dayjs(row.createdAt).format('MMM D, YYYY HH:mm')
  const textColor = getStatusColor(row.type, status)
  const toggle = useToggleTransactionModal()
  const dispatch = useDispatch<AppDispatch>()

  const openModal = useCallback(() => {
    dispatch(setLogItem({ logItem: row }))
    toggle()
  }, [toggle, dispatch, row])
  return (
    <HistoryRowWraper key={`history-item-${key}`} onClick={() => openModal()}>
      <NameAndSumColumn>
        <TYPE.subHeader1 color={'text1'}>{ActionTypeText[row.type]}</TYPE.subHeader1>
        {row?.params?.amount && <TYPE.subHeader1 color={'text2'}>{row?.params?.amount}</TYPE.subHeader1>}
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
        <Box marginLeft="1rem" display="flex" justifyContent="center">
          <IconWrapper size={20}>
            <Info />
          </IconWrapper>
        </Box>
      </DateColumn>
    </HistoryRowWraper>
  )
}
