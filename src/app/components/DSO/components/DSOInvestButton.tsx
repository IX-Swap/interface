import { Button, ButtonProps } from '@mui/material'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useStyles } from 'app/components/DSO/components/DSOInvestButton.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
export interface DSOInvestButtonProps extends ButtonProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestButton = ({ dso }: DSOInvestButtonProps) => {
  const { user } = useAuth()
  const { isTablet } = useAppBreakpoints()
  const params = { dsoId: dso._id, issuerId: dso.user }
  const isInvestButtonDisabled = dso.createdBy === user?._id
  const classes = useStyles()
  return (
    <TwoFADialogWrapper>
      <Button
        variant='contained'
        disabled={isInvestButtonDisabled}
        disableElevation
        className={classes.button}
        component={AppRouterLinkComponent}
        to={InvestRoute.makeInvestment}
        params={params}
        size='large'
        fullWidth={isTablet}
      >
        Invest
      </Button>
    </TwoFADialogWrapper>
  )
}
