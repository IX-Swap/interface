import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/pages/authorizer/pages/offerings/columns'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'

export const Offerings: React.FC = () => (
  <BaseView
    title='Authorize Issuance'
    uri='/issuance/dso/list'
    name='authorizerDsoList'
    columns={columns}
    renderView={renderDSOView}
  />
)

export const renderDSOView = (d: DigitalSecurityOffering): JSX.Element => (
  <DSOForm dso={d} isEditing={false} />
)
