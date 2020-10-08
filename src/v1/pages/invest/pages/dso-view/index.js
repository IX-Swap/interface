import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'
import DsoInformation from 'v1/components/Dso/DsoInformation'
import PageTitle from 'v1/components/PageTitle'

import { snackbarService } from 'uno-material-ui'
import { useInvestState, useInvestDispatch } from '../../modules'
import { toggleEditMode } from '../../modules/actions'
import { downloadFile } from './modules/actions'

const DsoView = () => {
  const dispatch = useInvestDispatch()
  const { dso } = useInvestState()
  const history = useHistory()

  // TODO: Fetch instead on redirecting
  if (!dso) {
    return <Redirect to='/invest' />
  }

  const onClickDocument = async (document: Document) => {
    try {
      await downloadFile(dso._id, document)
    } catch (error) {
      snackbarService.showSnackbar(error.message, 'error')
      console.log(error)
    }
  }

  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <DsoInformation
        dso={dso}
        headerButtonAction={() => {
          toggleEditMode(dispatch, true)
          history.push('/invest/commit')
        }}
        headerButtonText='InvestRoot'
        onClickDocument={onClickDocument}
      />
    </Container>
  )
}

export default DsoView
