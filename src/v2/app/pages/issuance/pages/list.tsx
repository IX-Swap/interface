import React from 'react'
import { Container, Paper, Box, Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { DSOList } from 'v2/app/components/DSO/DSOList'
import { useStore } from 'v2/app/pages/issuance/context'
import storageHelper from 'v2/helpers/storageHelper'

const InvestList = () => {
  const state = useStore()
  const history = useHistory()
  const match = useRouteMatch()

  const handleRowClick = (dso: DigitalSecurityOffering) => {
    state.selectDso(dso)
    history.push(`${match.path}view`)
  }

  const handleAdd = () => {
    history.push(`${match.path}add`)
  }

  return (
    <Container>
      <Paper square>
        <Box p={4}>
          <DSOList
            user={storageHelper.getUserId()}
            handleRowClick={handleRowClick}
          >
            <Button
              style={{ minWidth: '100px' }}
              variant='contained'
              color='primary'
              onClick={handleAdd}
            >
              Add
            </Button>
          </DSOList>
        </Box>
      </Paper>
    </Container>
  )
}

export default InvestList
