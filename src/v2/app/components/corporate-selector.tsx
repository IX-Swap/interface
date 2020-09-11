import React from 'react'
// import { useIsAuthorizer, useIsAdmin } from 'v2/helpers/acl'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import EditableField from 'v2/components/form/EditableField'
import { MenuItem } from '@material-ui/core'

const CorporateSelector = () => {
  const { data, status } = useAllCorporateIdentities()
  // const isAdmin = useIsAdmin()
  // const isAuthorizer = useIsAuthorizer()

  if (status === 'loading') {
    return null
  }

  return (
    <EditableField
      name='corporate'
      label='Corporate'
      margin='normal'
      required
      type='select'
      editMode
    >
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
    </EditableField>
  )
}

export default CorporateSelector
