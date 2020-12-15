import React from 'react'
import { Grid } from '@material-ui/core'
import { AssetInfo } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo'
import { Preview } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { Setup } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { observer } from 'mobx-react'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { DisplayNone } from 'app/components/DisplayNone'
import { SuccessView } from 'app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'app/pages/accounts/pages/banks/components/ResetButton'

export const WithdrawView: React.FC = observer(() => {
  const { isSetup, isSuccess, isPreview, clear } = useDepositStore()

  useUnmountCallback(clear)

  return (
    <Grid container justify='center'>
      <Grid item xs={5} container direction='column' spacing={2}>
        <Grid item>{(isSetup || isPreview) && <AssetInfo />}</Grid>
        <Grid item>
          {(isSetup || isPreview) && (
            <DisplayNone when={isPreview}>
              <Setup />
            </DisplayNone>
          )}
        </Grid>
        {isPreview && (
          <Grid item>
            <Preview />
          </Grid>
        )}
        {isSuccess && (
          <>
            <Grid item>
              <SuccessView title='Withdrawal Successful' />
            </Grid>
            <Grid item>
              <ResetButton fullWidth>Make Another Withdrawal</ResetButton>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
})
