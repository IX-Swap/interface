import { Box, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/BanksList/MobileMenu.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useContext, useMemo } from 'react'
import { Bank } from 'types/bank'
import { Icon } from 'ui/Icons/Icon'
import { Actions } from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'

export const MobileMenu = ({ items }: { items: Bank[] }) => {
  const context = useContext(ActiveElementContext)
  const open = context?.hasOpenIndices
  const classes = useStyles()
  const openIndex = context?.openIndex
  const { isTablet } = useAppBreakpoints()

  const selectedItem = useMemo(
    () => items.filter(item => item._id === openIndex)?.[0],
    [openIndex, items]
  )
  if (selectedItem === undefined) {
    return null
  }
  const onClose = () => {
    if (openIndex !== undefined) {
      context?.toggleRow(openIndex)
    }
  }

  return (
    <>
      {isTablet && (
        <Drawer
          anchor='bottom'
          open={open}
          onClose={onClose}
          PaperProps={{ sx: { backgroundColor: 'transparent' } }}
        >
          <Box className={classes.drawer}>
            <Box className={classes.titleRow}>
              <Typography
                variant='subtitle2'
                fontWeight={600}
                className={classes.header}
              >
                {selectedItem.currency.symbol}
              </Typography>
              <IconButton onClick={onClose} size='medium'>
                <Icon name='close' />
              </IconButton>
            </Box>
            <Grid flexDirection='column'>
              <Grid display='flex' flexDirection={'column'} gap={2}>
                <Actions item={selectedItem} />
              </Grid>
              <Box mb={2} />
            </Grid>
          </Box>
        </Drawer>
      )}
    </>
  )
}
