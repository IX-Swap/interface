import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const PreviewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title={data.tokenName} />
      </Grid>
      <RootContainer>
        <Grid item lg={12} container direction='column'>
          <DSOPreview data={data} />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
