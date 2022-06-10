import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'
import { DSOInvestorView } from 'app/components/DSO/components/DSOInvestorView'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'

export const ViewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title={data.tokenName} />
      </Grid>
      <RootContainer>
        <Grid item xs={12} pl={3}>
          <DSOInvestorView dso={data} />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
