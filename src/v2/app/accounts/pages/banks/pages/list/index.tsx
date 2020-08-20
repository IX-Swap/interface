import React from 'react'
import TableView from 'v2/components/TableWithPagination'
import storageHelper from 'v2/helpers/storageHelper'
import columns from 'v2/app/accounts/pages/banks/pages/list/data'
import { Paper, Button, Grid, ButtonGroup } from '@material-ui/core'
import { Bank } from 'v2/types/bank'
import { useStore } from 'v2/app/accounts/pages/banks/store'
import { useRouteMatch, useHistory } from 'react-router-dom'
import BanksListHeader from 'v2/app/accounts/pages/banks/pages/list/components/header'

const Actions = ({
  item,
  handleSelectBank
}: {
  item: Bank
  handleSelectBank: (item: Bank, type: 'view' | 'edit') => void
}) => {
  return (
    <ButtonGroup>
      <Button color='primary' onClick={() => handleSelectBank(item, 'edit')}>
        Edit
      </Button>
      <Button color='primary' onClick={() => handleSelectBank(item, 'view')}>
        View
      </Button>
    </ButtonGroup>
  )
}

const Banks = () => {
  const store = useStore()
  const match = useRouteMatch()
  const history = useHistory()

  const handleSelectBank = (item: Bank, type: 'view' | 'edit') => {
    store.setActiveBank(item)
    history.push(`${match.path}${type}`)
  }

  return (
    <Grid container component={Paper} spacing={4} direction='column'>
      <Grid item>
        <BanksListHeader />
      </Grid>
      <Grid item>
        <TableView<Bank>
          uri={`/accounts/banks/list/${storageHelper.getUserId()}`}
          name={`banks-${storageHelper.getUserId()}`}
          columns={columns}
          filter={{ status: '' }}
          hasActions
          actions={({ item }) => (
            <Actions handleSelectBank={handleSelectBank} item={item} />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default Banks
