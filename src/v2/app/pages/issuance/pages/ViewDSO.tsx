import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Container } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export const ViewDSO = () => {
  const { dsoId } = useParams<{
    dsoId: string
  }>()
  const { isLoading, data } = useDSOById(dsoId)
  const { routes } = useIssuanceRouter()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Container>
      <PageTitle title={data.tokenName} subPage />
      <Button>
        <AppRouterLink to={routes.edit} params={{ dsoId }}>
          Edit
        </AppRouterLink>
      </Button>
      <Box mb={4} />
      <DSOForm dso={data} />
    </Container>
  )
}
