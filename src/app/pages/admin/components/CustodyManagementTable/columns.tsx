import React from 'react'
import { TableColumn } from 'types/util'
import { VAAuditOutboundItem } from 'types/virtualAccount'
import { WalletAddressField } from 'app/pages/admin/components/CustodyManagementTable/WalletAddressField'

export const renderWalletAddress = (address: string) => {
  if (address === '' || address === null) {
    return '-'
  }
  return <WalletAddressField address={address} />
}

export const columns: Array<TableColumn<VAAuditOutboundItem>> = [
  {
    key: 'assigned',
    label: 'Assigned'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'investor',
    label: 'Investor'
  },
  {
    key: 'custodian',
    label: 'Custodian'
  },
  {
    key: 'walletAddress',
    label: 'Wallet Address',
    render: renderWalletAddress
  },
  {
    key: 'accountID',
    label: 'Account ID'
  }
]
