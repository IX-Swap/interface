import React from 'react'
import {
  columns,
  compactColumns
} from 'app/pages/authorizer/pages/corporateAccreditations/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

export const CorporateAccreditations: React.FC = () => (
  <AuthorizerList
    title='Authorize Corporate Accreditation Applications'
    uri='/identity/accreditation/corporate/list'
    name={authorizerQueryKeys.getCorporateAccreditations}
    columns={columns}
    compactColumns={compactColumns}
  />
)
