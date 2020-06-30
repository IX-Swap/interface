import React from 'react'
import EditableField from '../../../../../components/form/editable-field'
import { IndentityFinancials } from '../../../../../types/identity'

const Financials = ({ identity, editMode }: { editMode: boolean; identity: Partial<IndentityFinancials & {walletAddress?: string}> }) => {
  return (
    <>
      <EditableField
        editMode={editMode}
        name='occupation'
        label='Occupation'
        value={identity.occupation}
      />
      <EditableField
        editMode={editMode}
        name='employer'
        label='Employer'
        value={identity.employer}
      />
      <EditableField
        editMode={editMode}
        name='employmentStatus'
        label='Employment Status'
        value={identity.employmentStatus}
      />
      <EditableField
        editMode={editMode}
        name='industryOfEmployment'
        label='Industry'
        value={identity.industryOfEmployment}
      />
      <EditableField
        editMode={editMode}
        name='walletAddress'
        label='Digital Security Wallet Address'
        value={identity.walletAddress ?? ''}
      />
      <EditableField
        editMode={editMode}
        name='annualIncome'
        label='Annual Income'
        value={identity.annualIncome}
      />
      <EditableField
        editMode={editMode}
        name='houseHoldIncome'
        label='Household Income'
        value={identity.houseHoldIncome}
      />
      <EditableField
        editMode={editMode}
        name='sourceOfWealth'
        label='Source of Income'
        value={identity.sourceOfWealth}
      />
      <EditableField
        editMode={editMode}
        name='bankName'
        label='Bank Name'
        value={identity.bankName}
      />
      <EditableField
        editMode={editMode}
        name='bankAccountName'
        label='Name of Bank Account'
        value={identity.bankAccountName}
      />
      <EditableField
        editMode={editMode}
        name='bankAccountNumber'
        label='Bank Account Number'
        value={identity.bankAccountNumber}
      />
      <EditableField
        editMode={editMode}
        name='toArrangeCustody'
        label='I would like InvestaX to arrange digital security custody'
        type='check'
        size={12}
        value={identity.toArrangeCustody}
      />
    </>
  )
}

export default Financials
