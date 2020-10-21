import React from 'react'
// import { useIsAuthorizer, useIsAdmin } from 'v2/helpers/acl'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { MenuItem, Select } from '@material-ui/core'
import { queryStatusRenderer } from './renderUtils'

export const CorporateSelect = (props: {}) => {
  const { data, status } = useAllCorporateIdentities()
  // const isAdmin = useIsAdmin()
  // const isAuthorizer = useIsAuthorizer()

  queryStatusRenderer(status)

  return (
    <Select {...props} style={{ minWidth: 100 }}>
      <MenuItem disabled value={undefined}>
        Corporate
      </MenuItem>
      {data.list.map(({ _id, companyLegalName }) => {
        return (
          <MenuItem value={_id} key={_id}>
            {companyLegalName}
          </MenuItem>
        )
      })}
    </Select>
  )
}
