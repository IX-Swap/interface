import React, { useEffect } from 'react'
import { useStore } from '../../context/identity'
import { useIsAuthorizer, useIsAdmin } from '../../helpers/acl'
import { useObserver } from 'mobx-react'
import EditableField from 'v2/components/form/EditableField'
import { MenuItem } from '@material-ui/core'

const CorporateSelector = () => {
  const identityStore = useStore()
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()

  useEffect(() => {
    identityStore.getAccessibleCorporateIdentities(isAuthorizer, isAdmin)
  }, [identityStore, isAuthorizer, isAdmin])

  return useObserver(() => {
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
        {identityStore.accessibleCorporates?.map(e => {
          return (
            <MenuItem value={e._id} key={e._id}>
              {e.companyLegalName}
            </MenuItem>
          )
        })}
      </EditableField>
    )
  })
}

export default CorporateSelector
