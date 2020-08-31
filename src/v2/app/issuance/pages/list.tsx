import React from 'react'
import { Container, Paper, Box, Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Dso } from 'v2/types/dso'
import OfferingsList from 'v2/app/components/digital-security/list'
import { useStore } from 'v2/app/issuance/context'
import storageHelper from 'v2/helpers/storageHelper'

const InvestList = () => {
  const state = useStore()
  const history = useHistory()
  const match = useRouteMatch()

  const handleRowClick = (dso: Dso) => {
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
          <OfferingsList
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
          </OfferingsList>
        </Box>
      </Paper>
    </Container>
  )
}

export default InvestList
