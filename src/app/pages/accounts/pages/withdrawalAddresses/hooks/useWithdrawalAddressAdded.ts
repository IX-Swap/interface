import { isEmptyString } from 'helpers/strings'
import { useMemo } from 'react'
import { useWithdrawalAddresses } from './useWithdrawalAddresses'

export const useWithdrawalAddressAdded = (address?: string | null) => {
  const { data } = useWithdrawalAddresses({})

  return useMemo(() => {
    if (isEmptyString(address)) {
      return false
    }
    const filteredAddresses = data.list.filter(
      ({ status }) => status === 'Approved'
    )
    const found = filteredAddresses.filter(
      addressItem => addressItem.address === address
    )
    return found?.[0] !== undefined
  }, [address, data.list])
}
