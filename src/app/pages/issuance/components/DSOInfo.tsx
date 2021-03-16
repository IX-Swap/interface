import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { DSONameAndStructure } from 'app/pages/invest/components/DSOTable/DSONameAndStructure'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { DisabledStatus } from 'app/pages/issuance/components/DisabledStatus'

export const DSOInfo = () => {
  const {
    params: { dsoId, issuerId }
  } = useIssuanceRouter()

  const { data } = useDSOById(dsoId, issuerId)

  if (data === undefined) {
    return null
  }

  return (
    <Grid container justify='center' direction='column' alignItems='center'>
      <Grid item container spacing={1} justify='center'>
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
