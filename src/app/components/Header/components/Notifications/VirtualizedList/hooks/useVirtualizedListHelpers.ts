import { useContext, useRef, useLayoutEffect } from 'react'
import { VirtualizedListContext } from 'app/components/Header/components/Notifications/VirtualizedList/VirtualizedList'

export const useVirtualizedListItemHelpers = (index: number, gap: number) => {
  const listContext = useContext(VirtualizedListContext)
  const itemRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    listContext?.setItemSize(
      index,
      (itemRef?.current?.offsetHeight ?? 65) + gap
    )
  }, [index]) // eslint-disable-line

  return {
    ref: itemRef
  }
}
