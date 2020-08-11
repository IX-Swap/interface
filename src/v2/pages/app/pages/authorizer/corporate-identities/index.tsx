import React from 'react'
import BaseView from '../base'
import columns from './data'
import CorporateIdentityForm from '../../../components/identity-forms/corporate'

const CorporateIdentities = () => {
  return (
    <BaseView
      title='Authorize Corporate Identity'
      uri='/identity/corporates/list'
      name='authorizerCorporatesList'
      columns={columns}
      onView={row => (
        <CorporateIdentityForm
          identity={row}
          editMode={false}
          useOwnEmail={false}
        />
      )}
    />
  )
}

export default CorporateIdentities
