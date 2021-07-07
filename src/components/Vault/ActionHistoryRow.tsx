import Column from 'components/Column'
import dayjs from 'dayjs'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React, { CSSProperties } from 'react'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { ChevronElement } from '../ChevronElement'
import { ActionHistoryStatusText, ActionTypeText, StatusColors } from './enum'
import { ActionHistory } from './interfaces'
import {
  ActionNameColumn,
  DateColumn,
  DateDesktop,
  DateMobile,
  HistoryDetailsWrapper,
  HistoryRowWraper,
  IconColumn,
  RowAndDetailsWrapper,
  StatusColumn,
  TransparentWrapper,
} from './styleds'

interface Props {
  row: ActionHistory
  style: CSSProperties
  key: any
  show: boolean
  toggleShow: () => void
  icon: () => React.ReactElement
}

const dateFormat = 'MMM D, YYYY hh:mm'

export const ActionHistoryRow = ({ row, style, key, toggleShow, show, icon }: Props) => {
  const statusText = ActionHistoryStatusText[row.status]
  const formattedDate = dayjs(row.date).format(dateFormat)
  const textColor = StatusColors[row.status]

  return (
    <TransparentWrapper style={style}>
      <RowAndDetailsWrapper showMore={show} onClick={() => toggleShow()}>
        <HistoryRowWraper key={`history-item-${key}`}>
          <ActionNameColumn>
            <TYPE.subHeader1 color={'text1'}>{ActionTypeText[row.type]}</TYPE.subHeader1>
          </ActionNameColumn>
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
            <Column style={{ gap: '6px', alignItems: 'flex-end' }}>
              <DateMobile>
                <TYPE.subHeader1 color={'text1'}>{formattedDate}</TYPE.subHeader1>
              </DateMobile>
              <TYPE.subHeader1 color={'text1'}>Lorem ipsum</TYPE.subHeader1>
            </Column>
          </HistoryDetailsWrapper>
        )}
      </RowAndDetailsWrapper>
    </TransparentWrapper>
  )
}
