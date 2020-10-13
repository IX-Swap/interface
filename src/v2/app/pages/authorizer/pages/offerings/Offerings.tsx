import React from 'react'
import { AuthorizerTable as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerTable'
import { columns } from 'v2/app/pages/authorizer/pages/offerings/columns'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { AuthorizerView } from '../../components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'

export const Offerings: React.FC = () => (
  <BaseView
    title='Authorize IssuanceRoot'
    uri='/issuance/dso/list'
    name='authorizerDsoList'
    columns={columns}
    renderView={renderDSOView}
  />
)

export const renderDSOView = (d: DigitalSecurityOffering): JSX.Element => (
  <AuthorizerView
    title='About This Offering'
    data={d}
    feature={DataroomFeature.offerings}
  >
    <DSOForm data={d} isEditing={false} />
  </AuthorizerView>
)
