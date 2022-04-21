import { Button, ButtonProps } from '@mui/material'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { history } from 'config/history'
import { safeGeneratePath } from 'helpers/router'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'

export interface DSOInvestButtonProps extends ButtonProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestButton = ({ dso }: DSOInvestButtonProps) => {
  const { user } = useAuth()
  const isInvestButtonDisabled = dso.createdBy === user?._id
  const params = { dsoId: dso._id, issuerId: dso.user }

  return (
    <TwoFADialogWrapper>
      {({ enable2Fa, showDialog }) => (
        <Button
          variant='contained'
          disabled={isInvestButtonDisabled}
          disableElevation
          onClick={() => {
            if (enable2Fa !== true) {
              showDialog()
            } else {
              history.push(
                safeGeneratePath(InvestRoute.makeInvestment, params),
                params
              )
            }
          }}
        >
          Invest
        </Button>
      )}
    </TwoFADialogWrapper>
  )
}
