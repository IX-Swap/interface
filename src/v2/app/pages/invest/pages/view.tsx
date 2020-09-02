import React from 'react'

import { useStore } from 'v2/app/pages/invest/context'
import { useObserver } from 'mobx-react'
import DigitalSecurity from 'v2/app/components/digital-security'
import { Redirect } from 'react-router-dom'
import { Dso } from 'v2/types/dso'
import { Box, Container } from '@material-ui/core'
import PageTitle from 'v2/app/components/page-title'

const DsoView = ({ dso }: { dso: Dso }) => {
  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <DigitalSecurity dso={dso} />
    </Container>
  )
}

const MemoedDsoView = React.memo(DsoView)

const InvestViewDso = () => {
  const dsoState = useStore()

  return useObserver(() =>
    dsoState.selectedDso ? (
      <MemoedDsoView dso={dsoState.selectedDso} />
    ) : (
      <Redirect to='../' />
    )
  )
}

export default InvestViewDso
