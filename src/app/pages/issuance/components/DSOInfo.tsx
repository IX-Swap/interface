import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { DSONameAndStructure } from 'app/pages/invest/components/DSOTable/DSONameAndStructure'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { useParams } from 'react-router-dom'
import { DisabledStatus } from 'app/pages/issuance/components/DisabledStatus'

export const DSOInfo = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)

  if (data === undefined) {
    return null
  }

  return (
    <Grid
      container
      justifyContent='center'
      direction='column'
      alignItems='center'
    >
      <Grid item container spacing={1} justifyContent='center'>
        <Grid item>
          <AuthorizableStatus status={data.status} compact={false} />
        </Grid>
        <Grid item>
          <DisabledStatus disabled={data.disabled} />
        </Grid>
      </Grid>
      <Box py={2.25} />
      <DSONameAndStructure dso={data} tokenName={data.tokenName} />
    </Grid>
  )
}
