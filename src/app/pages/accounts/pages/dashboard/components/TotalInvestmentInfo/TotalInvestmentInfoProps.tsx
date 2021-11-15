import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Launch } from '@material-ui/icons'
import { useStyles } from './TotalInvestmentInfo.styles'
import { formatMoney } from 'helpers/numbers'

export interface TotalInvestmentInfoProps {
  value: number
  currencySymbol: string
}

export const TotalInvestmentInfo = ({
  value,
  currencySymbol
}: TotalInvestmentInfoProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Box>
        <Typography variant={'body1'} className={classes.label}>
          Total Investment:
        </Typography>
        <Typography variant={'body1'} className={classes.label}>
          {formatMoney(value, currencySymbol)}
        </Typography>
      </Box>
      <Box>
        <AppRouterLink
          to={InvestRoute.landing}
          color='primary'
          underline='hover'
          variant='body1'
          className={classes.button}
        >
          <Typography variant={'body1'} className={classes.buttonText}>
            View All
          </Typography>
          <Box px={1} />
          <Launch color='disabled' />
        </AppRouterLink>
      </Box>
    </Box>
  )
}
