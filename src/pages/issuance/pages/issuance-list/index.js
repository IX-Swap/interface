// @flow
import React from 'react'
import { Container, Paper, Box } from '@material-ui/core'
import DsoList from 'components/Dso/DsoList'
import type { Dso } from 'context/dso/types'
import { useHistory } from 'react-router-dom'
import storage from 'services/storageHelper'
import { useIssuanceDispatch } from '../../modules'
import { setSelectedDso } from '../../modules/actions'

const IssuanceList = () => {
  const issuanceDispatch = useIssuanceDispatch()
  const history = useHistory()

  const onClickView = (dso: Dso) => {
    setSelectedDso(issuanceDispatch, dso)

    history.push('/issuance/view')
  }

  return (
    <Container>
      <Box component={Paper} p={4}>
        <DsoList onClickView={onClickView} user={storage.getUserId()} />
      </Box>
    </Container>
  )
}

export default IssuanceList
