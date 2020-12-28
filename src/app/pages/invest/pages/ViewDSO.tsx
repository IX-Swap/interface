import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { InvestLink } from 'app/pages/invest/components/InvestLink'
import { useDSORouter } from 'app/pages/invest/routers/dsoRouter'
import { DSOView } from 'app/components/DSO/DSOView'

export const ViewDSO = () => {
  const {
    params: { dsoId, issuerId }
  } = useDSORouter()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid direction='column'>
      <Grid item container justify='flex-end'>
        <InvestLink />
      </Grid>
      <Grid item>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <DSOView data={data} />
      </Grid>
    </Grid>
  )
}
