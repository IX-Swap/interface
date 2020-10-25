import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { InvestLink } from 'v2/app/pages/invest/components/InvestLink'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'
import { DSOView } from 'v2/app/components/DSO/DSOView'

export const InvestOfferingView = () => {
  const {
    params: { dsoId, issuerId }
  } = useOfferingsRouter()
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
