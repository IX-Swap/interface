import React from 'react'
import { LabelledValue } from 'v2/components/LabelledValue'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'

export const DSOCorporateName = () => {
  const { FormValue } = useTypedForm()
  const { data, isLoading } = useAllCorporateIdentities()

  return (
    <FormValue name='corporate'>
      {corporateId => (
        <LabelledValue
          label='Corporate'
          value={isLoading ? '...' : data.map[corporateId].companyLegalName}
        />
      )}
    </FormValue>
  )
}
