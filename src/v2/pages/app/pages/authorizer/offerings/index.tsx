import React from 'react'
import BaseView from '../base'
import columns from './data'
import DigitalSecurity from '../../../components/digital-security'

const Offerings = () => {
  return (
    <BaseView
      title='Authorize Issuance'
      uri='/issuance/dso/list'
      name='authorizerDsoList'
      columns={columns}
      onView={(row) => <DigitalSecurity dso={row} editMode={false} />}
    />
  )
}

export default Offerings
