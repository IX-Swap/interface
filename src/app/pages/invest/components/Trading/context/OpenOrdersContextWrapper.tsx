import React, { createContext, useState } from 'react'

export const OpenOrdersContext = createContext<{
  isIndexOpen: (index: string) => boolean
  toggleRow: (index: string) => void
  hasOpenIndices: boolean
  openIndex?: string
} | null>(null)

export const OpenOrdersContextWrapper: React.FC = ({ children }) => {
  const [openOrdersIndices, setOpenOrdersIndices] = useState<{
    [key: string]: boolean
  }>({})
  const isIndexOpen = (index: string) => openOrdersIndices[index]
  const hasOpenIndices =
    Object.keys(openOrdersIndices).filter(index => openOrdersIndices[index])
      .length > 0
  const openIndex = Object.keys(openOrdersIndices).filter(
    index => openOrdersIndices[index]
  )?.[0]
  const openRow = (index: string) =>
    setOpenOrdersIndices({ ...openOrdersIndices, [index]: true })
  const closeRow = (index: string) =>
    setOpenOrdersIndices({ ...openOrdersIndices, [index]: false })
  const toggleRow = (index: string) => {
    if (isIndexOpen(index)) {
      closeRow(index)
    } else {
      openRow(index)
    }
  }
  return (
    <OpenOrdersContext.Provider
      value={{ isIndexOpen, toggleRow, hasOpenIndices, openIndex }}
    >
      {children}
    </OpenOrdersContext.Provider>
  )
}
