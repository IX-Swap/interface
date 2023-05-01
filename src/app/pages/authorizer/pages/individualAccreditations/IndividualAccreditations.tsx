import React from 'react'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'
import { columns, compactColumns } from './columns'

export const IndividualAccreditations: React.FC = () => (
  <AuthorizerList
    title='Authorize Individual Accreditation Applications'
    uri='/identity/accreditation/individual/list'
    name={authorizerQueryKeys.getIndividualAccreditations}
    columns={columns}
    compactColumns={compactColumns}
  />
)
