import React, { useRef } from 'react'
import { columns } from 'app/pages/admin/components/AdminIdentityList/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { AdminIdentity } from 'types/adminIdentity'
import { ViewIdentityAction } from 'app/pages/admin/components/AdminIdentityList/ViewIdentityAction'

export const AdminIdentityList = () => {
  const ref = useRef(null)

  return (
    <TableView<AdminIdentity>
      innerRef={ref}
      uri={identityURL.stats.list}
      name={identityQueryKeys.getAdminIdentityList}
      columns={columns}
      hasActions
      actions={({ item }) => (
        <ViewIdentityAction
          identityType={item.type}
          createdById={item.createdBy._id}
          userId={item.user._id}
        />
      )}
    />
  )
}
