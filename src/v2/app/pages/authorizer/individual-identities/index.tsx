import React from 'react'
import BaseView from '../base'
import columns from './data'
import IndividualIdentityForm from '../../../components/identity-forms/individual'

const IndividualIdentities = () => {
  return (
    <BaseView
      title='Authorize Individual Identity'
      uri='/identity/individuals/list'
      name='authorizerIntdividualIdentitesList'
      idKey='user._id'
      columns={columns}
      onView={row => (
        <IndividualIdentityForm
          identity={row}
          editMode={false}
          useOwnEmail={false}
        />
      )}
    />
  )
}

export default IndividualIdentities
