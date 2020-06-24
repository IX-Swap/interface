import React from 'react'
import BaseView from '../base'
import columns from './data'
import { useHistory } from 'react-router-dom'

const Offerings = () => {
  const history = useHistory()
  return (
    <BaseView
      title='Authorize Commitment'
      uri='/issuance/commitments/list'
      name='authorizerCommitmentsList'
      columns={columns}
      onView={(row) => {
        history.push({
          pathname: '/authorizer/commitments/view',
          state: {
            commitment: row
          }
        })
        return <span>hi</span>
      }}
    />
  )
}

export default Offerings
