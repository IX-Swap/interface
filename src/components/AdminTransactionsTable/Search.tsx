import React, { ChangeEvent } from 'react'
import { t } from '@lingui/macro'

import { Input as SearchInput } from 'pages/AdminKyc/Search'
import { useAdminState, useFetchBrokerDealerSwaps } from 'state/admin/hooks'
import { isAddress } from 'utils'

let timer = null as any

export const AdminTransactionsTableSearch = () => {
  const {
    brokerDealerSwaps: { offset },
  } = useAdminState()
  const getBrokerDealerSwaps = useFetchBrokerDealerSwaps()

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (isAddress(value) || value === '') {
      clearTimeout(timer)
      timer = setTimeout(() => getBrokerDealerSwaps({ page: 1, offset, search: value }), 250)
    }
  }

  return <SearchInput placeholder={t`Search for Wallet`} onChange={onSearchChange} />
}
