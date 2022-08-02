import { Box, Button, IconButton } from '@mui/material'
import { InvestRoute } from 'app/pages/invest/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Launch as LaunchIcon } from '@mui/icons-material'

export interface ActionsProps {
  item: any
}

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    fontSize: 14,
    maxWidth: 90,
    height: 40,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.button.bgLight,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  }
}))

export const Actions = ({ item }: ActionsProps) => {
  const classes = useStyles()
  return (
    <Box display={'flex'} alignItems={'center'}>
      <IconButton
        component={AppRouterLinkComponent}
        to={InvestRoute.viewListing}
        params={{
          userId: item.listing.createdBy,
          listingId: item.listing._id
        }}
        size='small'
        sx={{ marginRight: 6 }}
      >
        <LaunchIcon color='disabled' />
      </IconButton>
      <Button
        className={classes.button}
        component={AppRouterLinkComponent}
        variant={'contained'}
        to={InvestRoute.exchange}
        params={{
          pairId: item._id
        }}
        size='small'
      >
        Trade
      </Button>
    </Box>
  )
}
