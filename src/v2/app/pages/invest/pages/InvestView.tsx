import React from 'react'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { Box, Container } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useParams } from 'react-router-dom'
import { useDSOById } from '../hooks/useDSOById'

const InvestView = () => {
  const { dsoId, issuerId } = useParams<{
    dsoId: string
    issuerId: string
  }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Container>
      <PageTitle title={'Page title'} subPage />
      <Box mb={4} />
      <DSOForm data={data} />
    </Container>
  )
}

export default InvestView
