import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/authorizer/offerings/columns'
import DigitalSecurity from 'v2/app/components/digital-security'
import { Dso } from 'v2/types/dso'

export const Offerings: React.FC = () => (
  <BaseView
    title='Authorize Issuance'
    uri='/issuance/dso/list'
    name='authorizerDsoList'
    columns={columns}
    renderView={renderDSOView}
  />
)

export const renderDSOView = (d: Dso): JSX.Element => (
  <DigitalSecurity dso={d} editMode={false} />
)
