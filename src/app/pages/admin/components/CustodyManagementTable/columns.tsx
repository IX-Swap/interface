import React from 'react'
import { TableColumn } from 'types/util'
import { getTimeAgoFromString } from 'helpers/dates'
import { CustodyAccountsListItem } from 'types/custodyAccount'
import { WalletAddressField } from 'app/pages/admin/components/CustodyManagementTable/WalletAddressField'

export const renderWalletAddress = (address: string) => {
  if (address === '' || address === null || address === undefined) {
    return '-'
  }
  return <WalletAddressField address={address} />
}

export const renderCustodianName = (type: string) => {
  if (type === 'INVESTAX') {
    return 'InvestaX'
  }
  return type
}

export const columns: Array<TableColumn<CustodyAccountsListItem>> = [
  {
    key: 'assignedAt',
    label: 'Assigned',
    render: getTimeAgoFromString
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'name',
    label: 'Investor'
  },
  {
    key: 'type',
    label: 'Custodian',
    render: renderCustodianName
  },
  {
    key: 'walletAddress',
    label: 'Wallet Address',
    render: renderWalletAddress
  },
  {
    key: 'accountId',
    label: 'Account ID'
  }
]
