import React, { createContext, useCallback, useEffect, useRef } from 'react'
import {
  ListChildComponentProps,
  VariableSizeList,
  VariableSizeListProps
} from 'react-window'

export interface VirtualizedListSizeMap {
  [key: number]: number
}

export interface VirtualizedListProps
  extends Omit<VariableSizeListProps, 'itemSize' | 'children' | 'height'> {
  itemComponent: (props: ListChildComponentProps) => JSX.Element
}

export const VirtualizedListContext = createContext<{
  setItemSize: (index: number, size: number) => void
} | null>(null)

export const VirtualizedList = (props: VirtualizedListProps) => {
  const { itemComponent, ...rest } = props
  const sizeMap = useRef<VirtualizedListSizeMap>({})
  const setItemSize = useCallback((index: number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [index]: size }
  }, [])
  const getItemSize = useCallback((index: number) => {
    return sizeMap.current[index] ?? 65
  }, [])

  const getListSize = useCallback(() => {
    return sizeMap.current[0] + sizeMap.current[1] + sizeMap.current[2]
  }, [])

  const listRef = useRef<VariableSizeList>(null)
  const updateList = () => {
    listRef?.current?.resetAfterIndex(0)
  }

  useEffect(() => {
    updateList()
  }, [])

  return (
    <VirtualizedListContext.Provider value={{ setItemSize }}>
      <VariableSizeList
        {...rest}
        ref={listRef}
        width='100%'
        height={getListSize()}
        itemSize={getItemSize}
        onScroll={() => {
          updateList()
        }}
      >
        {itemComponent}
      </VariableSizeList>
    </VirtualizedListContext.Provider>
  )
}
