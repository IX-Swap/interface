import React from 'react'
import { DSO } from 'v2/app/components/DSO/DSO'
import { Box, Container } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useParams } from 'react-router-dom'
import { useDSOById } from '../hooks/useDSOById'

const InvestView = () => {
  const { offeringId, issuerId } = useParams<{
    offeringId: string
    issuerId: string
  }>()
  const { isLoading, data } = useDSOById(offeringId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Container>
      <PageTitle title={'Page title'} subPage />
      <Box mb={4} />
      <DSO dso={data} />
    </Container>
  )
}

export default InvestView
