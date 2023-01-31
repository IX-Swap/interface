import { TableHeader, TableRow } from 'components/LaunchpadIssuance/utils/tables'
import { Centered } from 'components/LaunchpadMisc/styled'
import { CountRow, IssuanceTable, Raw } from 'components/LaunchpadMisc/tables'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import React from 'react'
import { WhitelistWallet } from 'state/issuance/types'
import { EmptyTable } from './EmptyTable'

export interface WhitelistWalletTableProps {
  items: WhitelistWallet[]
  loading: boolean
  actions: React.FC<{ onAction: () => void }>
  onAction: (walletAddress: string) => void
}

export const WhitelistWalletTable = ({ items, loading, actions, onAction }: WhitelistWalletTableProps) => {
  const Actions = actions
  return (
    <>
      {!loading && items?.length === 0 && <EmptyTable />}

      {items?.length > 0 && (
        <IssuanceTable>
          <TableHeader>
            <Raw>Name</Raw>
            <Raw>Wallet Address</Raw>
            <Raw></Raw>
          </TableHeader>

          {loading && (
            <Centered>
              <Loader />
            </Centered>
          )}

          {!loading &&
            items.map(({ id, fullName, walletAddress }) => (
              <TableRow key={id}>
                <Raw>{fullName}</Raw>
                <CountRow>{walletAddress}</CountRow>
                <Actions onAction={() => onAction(walletAddress)} />
              </TableRow>
            ))}
        </IssuanceTable>
      )}
    </>
  )
}
