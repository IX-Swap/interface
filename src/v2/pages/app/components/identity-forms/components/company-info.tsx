// @flow
import React from 'react'
import { MenuItem } from '@material-ui/core'
import { CorporateFields } from '../../../../../types/identity'
import EditableField from '../../../../../components/form/editable-field'
import { renderMenu } from '../../../../../helpers/rendering'
import { COUNTRIES_OPTS } from '../const'

interface CompanyInformationProps {
  corporate?: Partial<CorporateFields> & { walletAddress: string }
  useOwnEmail: boolean
  rootName?: string
  editMode: boolean
}

const CompanyInformation = ({
  corporate = { walletAddress: '' },
  editMode
}: CompanyInformationProps) => {
  return (
    <>
      <EditableField
        name='companyLegalName'
        label='Company Name'
        size={6}
        editMode={editMode}
        value={corporate.companyLegalName}
      />
      <EditableField
        name='registrationNumber'
        label='Company Registration Number'
        size={6}
        value={corporate.registrationNumber}
        editMode={editMode}
      />
      <EditableField
        name='countryOfFormation'
        label='Country of Formation'
        size={6}
        value={corporate.countryOfFormation}
        type='select'
        editMode={editMode}
      >
        <MenuItem disabled value={undefined}>
          Country
        </MenuItem>
        {renderMenu(COUNTRIES_OPTS)}
      </EditableField>
      <EditableField
        name='dateOfIncorporation'
        label='Date of Incorporation'
        size={6}
        value={corporate.dateOfIncorporation}
        type='date'
        editMode={editMode}
      />
      <EditableField
        editMode={editMode}
        name='walletAddress'
        label='Digital Security Wallet Address'
        value={corporate.walletAddress || ''}
      />
    </>
  )
}

export default CompanyInformation
