/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IdentityAddress } from 'v2/types/identity'

export const convertAddressToString = (
  address: IdentityAddress | undefined
) => {
  if (address === undefined) {
    return ''
  }

  const {
    line1,
    line2,
    city,
    postalCode,
    state,
    country,
    countryOfResidence
  } = address
  return `${line1} ${line2 ?? ''} ${city} ${postalCode ?? ''} ${state} ${
    country ?? countryOfResidence ?? ''
  }`
}
