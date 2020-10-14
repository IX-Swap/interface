import React from 'react'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useDSOById } from '../hooks/useDSOById'
import { Grid } from '@material-ui/core'
import { InvestLink } from 'v2/app/pages/invest/components/InvestLink'
import { VSpacer } from 'v2/components/VSpacer'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'

export const InvestOfferingView = () => {
  const {
    params: { dsoId, issuerId }
  } = useOfferingsRouter()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading) {
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
        <DSOForm data={data} />
      </Grid>
    </Grid>
  )
}
