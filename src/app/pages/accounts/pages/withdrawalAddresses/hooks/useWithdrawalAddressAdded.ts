import { isEmptyString } from 'helpers/strings'
import { useMemo } from 'react'
import { useWithdrawalAddresses } from './useWithdrawalAddresses'

export const useWithdrawalAddressAdded = (address?: string | null) => {
  const { data } = useWithdrawalAddresses({})

  return useMemo(() => {
    if (isEmptyString(address)) {
      return { found: false, label: '' }
    }
    const filteredAddresses = data.list.filter(
      ({ status }) => status === 'Approved'
    )
    const found = filteredAddresses.filter(
      addressItem => addressItem.address === address
    )
    return { found: found?.[0] !== undefined, label: found?.[0]?.label ?? '' }
  }, [address, data.list])
}
