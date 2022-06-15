import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { Address } from 'app/pages/identity/types/forms'
import React from 'react'
import { hasValue } from 'helpers/forms'

export const IndividualAddressFields = () => {
  const { isSingPass, singPassData } = useIsSingPass()

  const address = singPassData?.regadd

  const getDisabledFields = () => {
    if (address === undefined || !isSingPass) {
      return undefined
    }

    const fields: Array<keyof Address> = []
    for (const [key, value] of Object.entries(address)) {
      if (hasValue(value)) {
        fields.push(key as any)
      }
    }

    return fields
  }

  return <AddressFields disabledFields={getDisabledFields()} />
}
