import { useMemo } from 'react'
import { useWithdrawalAddresses } from './useWithdrawalAddresses'

export const useWithdrawalAddressAdded = (address?: string) => {
  const { data } = useWithdrawalAddresses({})

  return useMemo(() => {
    if (address === undefined) {
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
