import React from 'react'
import { Grid } from '@mui/material'
import { DSO } from 'app/pages/issuance/components/DSO'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const ViewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title={data.tokenName} />
      </Grid>
      <Grid item>
        <DSO dsoId={dsoId} issuerId={issuerId} showAuthorizations showSidebar />
      </Grid>
    </Grid>
  )
}
