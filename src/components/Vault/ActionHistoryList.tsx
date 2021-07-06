import React, { MutableRefObject, useCallback, useMemo } from 'react'
import { FixedSizeList } from 'react-window'
import { ActionHistoryRow } from './ActionHistoryRow'
import { ActionHistory } from './interfaces'

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
      return <ActionHistoryRow style={style} row={row} key={row.date} />
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
