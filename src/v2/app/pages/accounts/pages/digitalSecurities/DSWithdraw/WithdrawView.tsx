import React from 'react'
import { Grid } from '@material-ui/core'
import { AssetInfo } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo'
import { Preview } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { Setup } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { observer } from 'mobx-react'
import { useUnmountCallback } from 'v2/hooks/useUnmountCallback'
import { DisplayNone } from 'v2/app/components/DisplayNone'
import { VSpacer } from 'v2/components/VSpacer'

export const WithdrawView: React.FC = observer(() => {
  const { isPreview, clear } = useDepositStore()

  useUnmountCallback(clear)

  return (
    <Grid container justify='center'>
      <Grid item xs={5} container direction='column'>
        <Grid item>
          <AssetInfo />
        </Grid>
        <Grid item>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <DisplayNone when={isPreview}>
            <Setup />
          </DisplayNone>
          {isPreview && <Preview />}
        </Grid>
      </Grid>
    </Grid>
  )
})
