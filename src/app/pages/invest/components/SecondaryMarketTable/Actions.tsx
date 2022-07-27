import { Button } from '@mui/material'
import { InvestRoute } from 'app/pages/invest/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { makeStyles } from '@mui/styles'
export interface ActionsProps {
  item: any
}

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    fontSize: 14,
    maxWidth: 90,
    height: 40,
    color: '#4C88FF',
    backgroundColor: 'rgba(76, 136, 255, 0.16)',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  }
}))

export const Actions = ({ item }: ActionsProps) => {
  const classes = useStyles()
  return (
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
  )
}
