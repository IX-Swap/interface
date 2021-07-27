import dayjs from 'dayjs'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React from 'react'
import { Box } from 'rebass'
import { LogItem } from 'state/eventLog/actions'
import { TYPE } from 'theme'
import { ActionHistoryStatus, ActionHistoryStatusText, ActionTypeText, StatusColors } from './enum'
import { ActionNameColumn, DateColumn, DateDesktop, HistoryRowWraper, IconColumn, StatusColumn } from './styleds'

interface Props {
  row: LogItem
  key: any
  icon: () => React.ReactElement
}

const dateFormat = 'MMM D, YYYY HH:mm'

export const ActionHistoryRow = ({ row, key, icon }: Props) => {
  const statusText = ActionHistoryStatusText[row?.params?.status ?? ActionHistoryStatus.PENDING]
  const formattedDate = dayjs(row.createdAt).format(dateFormat)
  const textColor = StatusColors[row?.params?.status ?? ActionHistoryStatus.PENDING]

  return (
    <HistoryRowWraper key={`history-item-${key}`}>
      <ActionNameColumn>
        <TYPE.subHeader1 color={'text1'}>{ActionTypeText[row.type]}</TYPE.subHeader1>
      </ActionNameColumn>
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
