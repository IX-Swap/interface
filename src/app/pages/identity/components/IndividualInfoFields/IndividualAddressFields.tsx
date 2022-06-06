import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { Address } from 'app/pages/identity/types/forms'
import React from 'react'

export const IndividualAddressFields = () => {
  const { isSingPass, individualIdentity } = useIsSingPass()

  const getDisabledFields = () => {
    if (individualIdentity?.address === undefined || !isSingPass) {
      return undefined
    }

    const fields: Array<keyof Address> = ['city']
    for (const [key, value] of Object.entries(individualIdentity?.address)) {
      if (value !== undefined && value.trim() !== '') {
        fields.push(key as any)
      }
    }

    return fields
  }

  return <AddressFields disabledFields={getDisabledFields()} />
}
