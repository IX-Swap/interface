import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { InvestLink } from 'app/pages/invest/components/InvestLink'
import { DSOView } from 'app/components/DSO/DSOView'
import { useParams } from 'react-router-dom'

export const ViewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
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
