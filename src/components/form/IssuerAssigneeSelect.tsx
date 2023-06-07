import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useIssuerAssignee } from 'app/pages/issuance/hooks/UseIssuerAssignee'

interface Assignee {
  name: string
  _id: string
}

export const IssuerAssigneeSelect = (props: any) => {
  const { data } = useIssuerAssignee()

  const setIssuerValue = (event: any, value: any) => {
    sessionStorage.setItem('issuerId', value._id)
  }

  return (
    <Autocomplete
      id='Select_IssuerAssigneeSelect'
      options={data?.data}
      getOptionLabel={(option: Assignee) => option.name}
      onChange={setIssuerValue}
      ListboxProps={{
        style: {
          boxShadow: '0px 80px 80px rgba(162, 172, 191, 0.16)',
          border: '1px solid #EDF2FA',
          borderRadius: '8px'
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          label='Issuer Assignee'
          placeholder='Select Issuer Assignee'
          InputProps={{
            ...params.InputProps
          }}
        />
      )}
    />
  )
}

IssuerAssigneeSelect.displayName = 'Select_IssuerAssigneeSelect'
