import { useContext, useRef, useEffect, useLayoutEffect } from 'react'
import { VirtualizedListContext } from 'v2/components/VirtualizedList/VirtualizedList'

export const useVirtualizedListItemHelpers = (index: number, gap: number) => {
  const listContext = useContext(VirtualizedListContext)
  const itemRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    listContext?.setItemSize(index, (itemRef?.current?.offsetHeight ?? 65) + gap)
  }, [index])

  return {
    ref: itemRef
  }
}
