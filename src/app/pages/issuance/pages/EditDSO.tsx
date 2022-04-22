import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { useParams } from 'react-router-dom'
import { DSO } from 'app/pages/issuance/components/DSO'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const EditDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <PageHeader title={data.tokenName} />
      </Grid>

      <Grid item>
        <VSpacer size='medium' />
      </Grid>

      <Grid item>
        <DSO dsoId={dsoId} issuerId={issuerId} isEditing />
      </Grid>
    </Grid>
  )
}
