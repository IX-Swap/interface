import { Box, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/BanksList/MobileMenu.styles'
import React, { useContext, useMemo } from 'react'
import { Icon } from 'ui/Icons/Icon'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { NewAction } from 'app/pages/authorizer/components/NewAction'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Launch as LaunchIcon } from '@mui/icons-material'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { ReactComponent as TradeIcon } from './trade-icon.svg'

export interface MobileMenuProps {
  items: any[]
}

export const MobileMenu = (props: MobileMenuProps) => {
  const context = useContext(ActiveElementContext)
  const open = context?.hasOpenIndices
  const classes = useStyles()
  const openIndex = context?.openIndex

  const { items } = props

  const selectedItem = useMemo(
    () => items.filter(item => item._id === openIndex)?.[0],
    [openIndex, items]
  )
  if (selectedItem === undefined) {
    return null
  }

  const actionsPropsList = [
    {
      label: 'Learn More',
      icon: <LaunchIcon color='disabled' />,
      onClick: () =>
        history.push(
          generatePath(InvestRoute.viewListing, {
            userId: selectedItem.listing.createdBy,
            listingId: selectedItem.listing._id
          })
        )
    },
    {
      label: 'Trade',
      icon: <TradeIcon />,
      onClick: () =>
        history.push(
          generatePath(InvestRoute.exchange, {
            pairId: selectedItem._id
          })
        )
    }
  ]

  const onClose = () => {
    if (openIndex !== undefined) {
      context?.toggleRow(openIndex)
    }
  }

  return (
    <>
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
              {selectedItem.name}
            </Typography>
            <IconButton onClick={onClose} size='medium'>
              <Icon name='close' />
            </IconButton>
          </Box>
          <Grid flexDirection='column'>
            <Grid display='flex' flexDirection={'column'} gap={2}>
              {actionsPropsList.map(actionProps => (
                <NewAction {...actionProps} />
              ))}
            </Grid>
            <Box mb={2} />
          </Grid>
        </Box>
      </Drawer>
    </>
  )
}
