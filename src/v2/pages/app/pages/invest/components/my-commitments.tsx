import React from 'react'
import TableView from '../../../../../components/table-with-pagination'
import { Commitment } from '../../../../../types/commitment'
import storageHelper from '../../../../../helpers/storageHelper'
import columns from './data'
import { Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useStore } from '../context'

const Actions = ({ item, handleSelectCommitment }: { item: Commitment; handleSelectCommitment: (item: Commitment) => void }) => {
  return (
    <>
      <Button color='primary' onClick={() => handleSelectCommitment(item)}>View</Button>
    </>
  )
}

const MyCommitments = () => {
  const history = useHistory()
  const investState = useStore()
  const match = useRouteMatch()

  const handleSelectCommitment = (item: Commitment) => {
    investState.setActiveCommitment(item)
    history.push(`${match.path}view-commitment`)
  }

  return (
    <TableView<Commitment>
      uri={`/issuance/commitments/list/${storageHelper.getUserId()}`}
      name={`commitments-${storageHelper.getUserId()}`}
      columns={columns}
      filter={{ status: '' }}
      hasActions
      actions={(row: Commitment) => <Actions handleSelectCommitment={handleSelectCommitment} item={row} />}
    />
  )
}

export default MyCommitments
