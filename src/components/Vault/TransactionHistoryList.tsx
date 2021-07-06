import { Currency } from '@ixswap1/sdk-core'
import dayjs from 'dayjs'
import useTheme from 'hooks/useTheme'
import React, { CSSProperties, MutableRefObject, useCallback, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { TYPE } from 'theme'
import { ChevronElement } from '../ChevronElement'
import { StatusColors, TransactionHistoryStatusText } from './enum'
import { TransactionHistory } from './interfaces'
import { DateColumn, HistoryRowWraper, NameAndSumnColumn, StatusColumn } from './styleds'

function HistoryRow({
  row,
  style,
  key,
  currency,
}: {
  row: TransactionHistory
  style: CSSProperties
  key: any
  currency?: Currency
}) {
  // only show add or remove buttons if not on selected list
  const statusText = TransactionHistoryStatusText[row.status]
  const formattedDate = dayjs(row.date).format('MMM D, YYYY hh:mm')
  const textColor = StatusColors[row.status]
  const [showMore, setShowMore] = useState(false)
  const theme = useTheme()
  return (
    <HistoryRowWraper key={`transaction-history-item-${key}`} style={style}>
      <NameAndSumnColumn>
        <TYPE.subHeader1 color={'text1'}>{row.name}</TYPE.subHeader1>
        <TYPE.subHeader1 color={'text2'}>
          {row.sum}&nbsp;{currency?.symbol}
        </TYPE.subHeader1>{' '}
      </NameAndSumnColumn>

      <StatusColumn>
        <TYPE.subHeader1 color={textColor}>{statusText}</TYPE.subHeader1>
      </StatusColumn>
      <DateColumn>
        <TYPE.subHeader1 color={'text1'}>{formattedDate}</TYPE.subHeader1>
        <ChevronElement showMore={showMore} setShowMore={setShowMore} />
      </DateColumn>
    </HistoryRowWraper>
  )
}

export default function TransactionHistoryList({
  height,
  listRef,
  actions,
  currency,
}: {
  height: number
  listRef?: MutableRefObject<FixedSizeList | undefined>
  actions: TransactionHistory[]
  currency?: Currency
}) {
  const itemData = useMemo(() => {
    return actions
  }, [actions])

  const Row = useCallback(function HistoryRowInner({ data, index, style }) {
    const row: TransactionHistory = data[index]
    console.log({ row })
    if (row) {
      return <HistoryRow style={style} row={row} key={row.date} currency={currency} />
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
