import { Button, ButtonProps } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { useStyles } from 'app/components/DSO/components/DSOContainer.styles'
export interface DSOInvestButtonProps extends ButtonProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestButton = ({ dso }: DSOInvestButtonProps) => {
  const { user } = useAuth()
  const isInvestButtonDisabled =
    dso.createdBy === user?._id || dso?.disableInvestInCampaign === true
  const classes = useStyles()
  return (
    <Button
      variant='contained'
      disabled={isInvestButtonDisabled}
      disableElevation
      className={classes.button}
      component={AppRouterLinkComponent}
      to={InvestRoute.makeInvestment}
      params={{ dsoId: dso._id, issuerId: dso.user }}
    >
      Invest
    </Button>
  )
}
