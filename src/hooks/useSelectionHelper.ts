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
  getIsItemSelected: (item: TItem) => boolean
  getIsItemsSelected: (items: TItem[]) => boolean
  getIsIndeterminate: (items: TItem[]) => boolean
  toggle: (item: TItem) => void
  toggleAll: (items: TItem[]) => void
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

  const getIsItemSelected = (a: TItem) =>
    selected.findIndex(b => itemComparator(a, b)) !== -1

  const getIsItemsSelected = (items: TItem[]) =>
    selected.length === items.length

  const getIsIndeterminate = (items: TItem[]) =>
    selected.length > 0 && selected.length < items.length

  const toggle = (item: TItem) =>
    getIsItemSelected(item) ? deselectItem(item) : selectItem(item)

  const toggleAll = (items: TItem[]) => {
    selected.length > 0 ? resetSelection() : setSelected(items)
  }

  const resetSelection = () => setSelected([])

  return {
    selectedCount: selected.length,
    hasSelected: selected.length > 0,
    selected,
    selectItem,
    deselectItem,
    getIsItemSelected,
    getIsItemsSelected,
    getIsIndeterminate,
    resetSelection,
    toggle,
    toggleAll
  }
}
