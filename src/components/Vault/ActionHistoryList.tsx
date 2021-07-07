import { Currency } from '@ixswap1/sdk-core'
import { Line } from 'components/Line'
import { useWindowSize } from 'hooks/useWindowSize'
import React, { MutableRefObject, useCallback, useMemo, useState } from 'react'
import { VariableSizeList as List } from 'react-window'
import { MEDIA_WIDTHS } from 'theme'
import { ActionHistoryRow } from './ActionHistoryRow'
import { ActionTypes, isAction } from './enum'
import { ActionHistory, TransactionHistory } from './interfaces'
import { Break, StatusIcons } from './styleds'
import { TransactionHistoryRow } from './TransactionHistoryRow'

const BREAK_LINE = 'BREAK'
const STANDART_ROW = 26
const BREAK_HEIGHT = 70
type BreakLine = typeof BREAK_LINE
function isBreakLine(x: unknown): x is BreakLine {
  return x === BREAK_LINE
}

type Sizes = { [index: number]: number }

export default function ActionHistoryList({
  height,
  listRef,
  actions,
  transactions,
  currency,
}: {
  height: number
  listRef?: MutableRefObject<List | undefined>
  actions: ActionHistory[]
  transactions: TransactionHistory[]
  currency?: Currency
}) {
  const { width = 0 } = useWindowSize()
  const ACTION_VISIBLE = width < MEDIA_WIDTHS.upToMedium ? 150 : 105
  const TRANSACTION_VISIBLE = width < MEDIA_WIDTHS.upToMedium ? 160 : 125
  const itemData: (ActionHistory | TransactionHistory | BreakLine)[] = useMemo(() => {
    return [...actions, BREAK_LINE, ...transactions]
  }, [actions, transactions])

  const [sizes, setSizes] = useState<Sizes>(
    itemData.reduce<Sizes>((acc, item, i) => {
      acc[i] = isBreakLine(item) ? BREAK_HEIGHT : STANDART_ROW
      return acc
    }, {})
  )
  const Row = useCallback(
    function HistoryRowInner({ data, index, style, toggleShow }) {
      const row: ActionHistory | TransactionHistory | BreakLine = data[index]
      const show = sizes[index] > STANDART_ROW

      if (row) {
        if (isBreakLine(row)) {
          return (
            <Break style={style}>
              <Line />
            </Break>
          )
        }
        const statusIcon = StatusIcons[row.status]
        if ('sum' in row) {
          return (
            <TransactionHistoryRow
              style={style}
              row={row}
              key={row.date}
              toggleShow={() => toggleShow(index)}
              show={show}
              currency={currency}
              icon={statusIcon}
            />
          )
        }
        return (
          <ActionHistoryRow
            style={style}
            row={row}
            key={row.date}
            toggleShow={() => toggleShow(index)}
            show={show}
            icon={statusIcon}
          />
        )
      }
      return null
    },
    [sizes, currency]
  )

  const itemKey = useCallback((index: number, data: typeof itemData) => {
    const item = data[index]
    return isBreakLine(item) ? item : item.date
  }, [])

  const getSize = useCallback(
    (i: number) => {
      return sizes[i] || STANDART_ROW
    },
    [sizes]
  )
  const toggleShow = (index: number) => {
    if (listRef && listRef?.current) {
      listRef.current.resetAfterIndex(index)
    }
    const row = itemData[index]
    if (!isBreakLine(row)) {
      const visibleHeight =
        isAction(row.type) || row.type === ActionTypes.WITHDRAW ? ACTION_VISIBLE : TRANSACTION_VISIBLE
      setSizes({ ...sizes, [index]: sizes[index] > STANDART_ROW ? STANDART_ROW : visibleHeight })
    }
  }
  return (
    <List
      height={height}
      ref={listRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={getSize}
      itemKey={itemKey}
    >
      {(props) => <Row {...props} toggleShow={toggleShow} />}
    </List>
  )
}
