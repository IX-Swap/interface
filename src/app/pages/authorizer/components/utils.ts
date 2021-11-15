/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Address } from 'app/pages/identity/types/forms'

export const convertAddressToString = (address: Address | undefined) => {
  if (address === undefined) {
    return ''
  }

  const { line1, line2, city, postalCode, state, country, countryOfResidence } =
    address
  return `${line1} ${line2 ?? ''} ${city} ${postalCode ?? ''} ${state} ${
    country ?? countryOfResidence ?? ''
  }`
}
