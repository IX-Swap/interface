import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { Commitment } from 'v2/types/commitment'
import storageHelper from 'v2/helpers/storageHelper'
import columns from 'v2/app/pages/invest/components/data'
import { Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useStore } from 'v2/app/pages/invest/context'

const Actions = ({
  item,
  handleSelectCommitment
}: {
  item: Commitment
  handleSelectCommitment: (item: Commitment) => void
}) => {
  return (
    <>
      <Button color='primary' onClick={() => handleSelectCommitment(item)}>
        View
      </Button>
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
      hasActions
      actions={({ item }) => (
        <Actions handleSelectCommitment={handleSelectCommitment} item={item} />
      )}
    />
  )
}

export default MyCommitments
