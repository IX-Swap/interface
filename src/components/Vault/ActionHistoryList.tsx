import Column from 'components/Column'
import dayjs from 'dayjs'
import useTheme from 'hooks/useTheme'
import React, { CSSProperties, MutableRefObject, useCallback, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { TYPE } from 'theme'
import { ChevronElement } from '../ChevronElement'
import { ActionHistoryStatusText, StatusColors } from './enum'
import { ActionHistory } from './interfaces'
import {
  ActionNameColumn,
  DateColumn,
  HistoryDetailsWrapper,
  HistoryRowWraper,
  RowAndDetailsWrapper,
  StatusColumn,
} from './styleds'

function HistoryRow({ row, style, key }: { row: ActionHistory; style: CSSProperties; key: any }) {
  // only show add or remove buttons if not on selected list
  const statusText = ActionHistoryStatusText[row.status]
  const formattedDate = dayjs(row.date).format('MMM D, YYYY hh:mm')
  const textColor = StatusColors[row.status]
  const [showMore, setShowMore] = useState(false)
  const theme = useTheme()
  return (
    <RowAndDetailsWrapper showMore={showMore}>
      <HistoryRowWraper key={`history-item-${key}`} style={style}>
        <ActionNameColumn>
          <TYPE.subHeader1 color={'text1'}>{row.name}</TYPE.subHeader1>
        </ActionNameColumn>
        <Column></Column>
        <StatusColumn>
          <TYPE.subHeader1 color={textColor}>{statusText}</TYPE.subHeader1>
        </StatusColumn>
        <DateColumn>
          <TYPE.subHeader1 color={'text1'}>{formattedDate}</TYPE.subHeader1>
          <ChevronElement showMore={showMore} setShowMore={setShowMore} />
        </DateColumn>
      </HistoryRowWraper>
      {showMore && <HistoryDetailsWrapper>Lorem ipsum</HistoryDetailsWrapper>}
    </RowAndDetailsWrapper>
  )
}

export default function ActionHistoryList({
  height,
  listRef,
  actions,
}: {
  height: number
  listRef?: MutableRefObject<FixedSizeList | undefined>
  actions: ActionHistory[]
}) {
  const itemData = useMemo(() => {
    return actions
  }, [actions])

  const Row = useCallback(function HistoryRowInner({ data, index, style }) {
    const row: ActionHistory = data[index]
    console.log({ row })
    if (row) {
      return <HistoryRow style={style} row={row} key={row.date} />
    } else {
      return null
    }
  }, [])

  const itemKey = useCallback((index: number, data: typeof itemData) => {
    const item = data[index]
    return item.date
  }, [])

  return (
    <FixedSizeList
      height={height}
      ref={listRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={26}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}
