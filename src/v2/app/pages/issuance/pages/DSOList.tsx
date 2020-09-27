import React from 'react'
import { Container, Paper, Box } from '@material-ui/core'
import { DSOList as DSOListComponent } from 'v2/app/components/DSO/components/DSOList'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { IssuanceRoute } from 'v2/app/pages/issuance/router'

export const DSOList = () => {
  const { user } = useAuth()

  return (
    <Container>
      <Paper square>
        <Box p={4}>
          <DSOListComponent
            filter={{}}
            user={user ?? null}
            viewURL={IssuanceRoute.view}
          />
        </Box>
      </Paper>
    </Container>
  )
}
