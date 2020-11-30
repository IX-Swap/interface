import React, { createContext, PropsWithChildren, useContext } from 'react'
import {
  useSelectionHelper,
  UseSelectionHelperArgs,
  UseSelectionHelperReturnType
} from 'hooks/useSelectionHelper'

const SelectionHelperContext = createContext<
  UseSelectionHelperReturnType<any> | undefined
>(undefined)

export interface SelectionHelperProps<TItem>
  extends UseSelectionHelperArgs<TItem> {}

export const SelectionHelper = <TItem,>(
  props: PropsWithChildren<SelectionHelperProps<TItem>>
) => {
  const { children, ...rest } = props
  const selectionHelper = useSelectionHelper<TItem>(rest)

  return (
    <SelectionHelperContext.Provider value={selectionHelper}>
      {children}
    </SelectionHelperContext.Provider>
  )
}

export const useSelectionHelperContext = <TItem,>() => {
  const selectionHelper = useContext(SelectionHelperContext)

  if (selectionHelper === undefined) {
    throw new Error(
      'useSelectionHelperContext must be used inside of SelectionHelper component'
    )
  }

  return selectionHelper as UseSelectionHelperReturnType<TItem>
}
