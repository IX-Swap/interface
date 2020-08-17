import React from 'react'
import { useIsAccredited } from '../../../../../../../../helpers/acl'
import { Grid, Box, Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'

const BanksListHeader = () => {
  const isAccredited = useIsAccredited()
  const hasApproved = true
  const match = useRouteMatch()
  const history = useHistory()

  return (
    <Grid item container xs={12} justify='flex-end'>
      {isAccredited && hasApproved && (
        <Box pr={4}>
          <Button
            variant='contained'
            color='primary'
            style={{ marginRight: '8px' }}
            onClick={() => {
              history.push(`${match.path}deposit`)
            }}
          >
            Deposit
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push(`${match.path}withdraw`)
            }}
          >
            Withdraw
          </Button>
        </Box>
      )}
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          history.push(`${match.path}create`)
        }}
      >
        ADD BANK ACCOUNT
      </Button>
    </Grid>
  )
}

export default BanksListHeader
