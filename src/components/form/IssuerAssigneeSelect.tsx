import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'

interface Assignee {
  companyLegalName: string
}

export const IssuerAssigneeSelect = (props: any) => {
  // const { data } = useIssuerAssignee()
  const { data } = useAllCorporates({ all: true, status: 'Approved' })

  const setIssuerValue = (event: any, value: any) => {
    console.log(value)
    sessionStorage.setItem('issuerId', value?.user?._id)
  }

  const renderdOptions = data.list.map(data => {
    return data
  })

  return (
    <Autocomplete
      disablePortal
      id='Select_IssuerAssigneeSelect'
      options={renderdOptions}
      getOptionLabel={(option: Assignee) => option.companyLegalName}
      onChange={setIssuerValue}
      ListboxProps={{
        style: {
          boxShadow: '0px 80px 80px rgba(162, 172, 191, 0.16)',
          border: '1px solid #EDF2FA',
          borderRadius: '8px',
          fontSize: '16px'
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          label='Issuer Assignee'
          placeholder='Select Issuer Assignee'
          InputProps={{
            ...params.InputProps,
            disableUnderline: false
          }}
        />
      )}
    />
  )
}

IssuerAssigneeSelect.displayName = 'Select_IssuerAssigneeSelect'
