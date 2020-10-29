import { useState } from 'react'

export interface UseSelectionHelperArgs<TItem extends any> {
  itemComparator: (a: TItem, b: TItem) => boolean
}

export interface UseSelectionHelperReturnType<TItem> {
  selectedCount: number
  hasSelected: boolean
  selected: TItem[]
  selectItem: (item: TItem) => void
  deselectItem: (item: TItem) => void
  isItemSelected: (item: TItem) => boolean
  toggle: (item: TItem) => void
  resetSelection: () => void
}

export const useSelectionHelper = <TItem = any>(
  args: UseSelectionHelperArgs<TItem>
) => {
  const { itemComparator } = args
  const [selected, setSelected] = useState<TItem[]>([])

  const selectItem = (item: TItem) =>
    setSelected(prevSelected => [...prevSelected, item])

  const deselectItem = (a: TItem) =>
    setSelected(prevSelected => prevSelected.filter(b => !itemComparator(a, b)))

  const isItemSelected = (a: TItem) =>
    selected.findIndex(b => itemComparator(a, b)) !== -1

  const toggle = (item: TItem) =>
    isItemSelected(item) ? deselectItem(item) : selectItem(item)

  const resetSelection = () => setSelected([])

  return {
    selectedCount: selected.length,
    hasSelected: selected.length > 0,
    selected,
    selectItem,
    deselectItem,
    isItemSelected,
    resetSelection,
    toggle
  }
}
