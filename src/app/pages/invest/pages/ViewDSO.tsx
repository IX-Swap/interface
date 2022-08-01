import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'
import { DSOInvestorView } from 'app/components/DSO/components/DSOInvestorView'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid, Box } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'

export const ViewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Box width='100%'>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <PageHeader title='Digital Security Offering' />
        </Grid>
        <Grid item xs={12}>
          <RootContainer>
            <DSOInvestorView dso={data} />
          </RootContainer>
        </Grid>
      </Grid>
    </Box>
  )
}
