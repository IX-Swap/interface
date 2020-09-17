import React from 'react'
import { useStore } from 'v2/app/pages/invest/context'
import { useObserver } from 'mobx-react'
import { DSO } from 'v2/app/components/DSO/DSO'
import { Redirect } from 'react-router-dom'
import { DigitalSecurityOffering as IDSO } from 'v2/types/dso'
import { Box, Container } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'

const DsoView = ({ dso }: { dso: IDSO }) => {
  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <DSO dso={dso} />
    </Container>
  )
}

const MemoedDsoView = React.memo(DsoView)

const InvestViewDso = () => {
  const dsoState = useStore()

  return useObserver(() =>
    dsoState.selectedDso !== undefined ? (
      <MemoedDsoView dso={dsoState.selectedDso} />
    ) : (
      <Redirect to='../' />
    )
  )
}

export default InvestViewDso
