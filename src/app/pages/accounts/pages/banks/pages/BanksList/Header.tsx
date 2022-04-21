import React from 'react'
import { Grid, Button } from '@mui/material'
import { BanksRoute } from '../../router/config'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { history } from 'config/history'

export const Header = () => {
  return (
    <Grid item container xs={12} justifyContent='flex-end'>
      <TwoFADialogWrapper>
        {({ enable2Fa, showDialog }) => (
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={() => {
              if (enable2Fa !== true) {
                showDialog()
              } else {
                history.push(BanksRoute.create)
              }
            }}
          >
            Add Bank Account
          </Button>
        )}
      </TwoFADialogWrapper>
    </Grid>
  )
}
