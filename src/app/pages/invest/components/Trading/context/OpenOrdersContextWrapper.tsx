import React, { createContext, useState } from 'react'

export const OpenOrdersContext = createContext<{
  isIndexOpen: (index: string) => boolean
  openRow: (index: string) => void
  closeRow: (index: string) => void
} | null>(null)

export const OpenOrdersContextWrapper: React.FC = ({ children }) => {
  const [openOrdersIndices, setOpenOrdersIndices] = useState<{
    [key: string]: boolean
  }>({})
  const isIndexOpen = (index: string) => openOrdersIndices[index]
  const openRow = (index: string) =>
    setOpenOrdersIndices({ ...openOrdersIndices, [index]: true })
  const closeRow = (index: string) =>
    setOpenOrdersIndices({ ...openOrdersIndices, [index]: false })
  return (
    <OpenOrdersContext.Provider value={{ isIndexOpen, openRow, closeRow }}>
      {children}
    </OpenOrdersContext.Provider>
  )
}
