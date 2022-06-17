import { Drawer, Hidden } from '@mui/material'
import React, { useContext } from 'react'
import { OpenOrdersContext } from '../../context/OpenOrdersContextWrapper'

export const MobileNestedOrders = () => {
  const context = useContext(OpenOrdersContext)
  const open = context?.hasOpenIndices
  const openIndex = context?.openIndex
  const onClose = () => {
    if (openIndex !== undefined) {
      context?.toggleRow(openIndex)
    }
  }
  return (
    <Hidden mdUp>
      <Drawer anchor='bottom' open={open} onClose={onClose}>
        HERE
      </Drawer>
    </Hidden>
  )
}
