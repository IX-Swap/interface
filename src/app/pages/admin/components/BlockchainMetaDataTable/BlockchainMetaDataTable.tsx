import { TableView } from 'components/TableWithPagination/TableView'
import React from 'react'
import { columns } from './columns'
import { BlockchainSettings } from 'types/blockchain'

interface BlockchainMetaDataTableProps {
  data: BlockchainSettings['metaDataFields']
}

export const BlockchainMetaDataTable = ({
  data
}: BlockchainMetaDataTableProps) => (
  <TableView columns={columns} fakeItems={data ?? undefined} />
)
