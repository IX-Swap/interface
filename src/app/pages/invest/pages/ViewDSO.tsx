import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'
import { DSOInvestorView } from 'app/components/DSO/components/DSOInvestorView'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@material-ui/core'

export const ViewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title={data.tokenName} />
      </Grid>
      <Grid item xs={12}>
        <DSOInvestorView dso={data} />
      </Grid>
    </Grid>
  )
}
