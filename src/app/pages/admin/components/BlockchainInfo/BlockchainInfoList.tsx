import React from 'react'
import { BlockchainSettings } from 'types/blockchain'
import { BlockchainInfo } from 'app/pages/admin/components/BlockchainInfo/BlockchainInfo'

interface BlockchainInfoListProps {
  networks: BlockchainSettings['networks']
}

export const BlockchainInfoList = ({ networks }: BlockchainInfoListProps) => {
  return (
    <>
      {networks.map(network => (
        <BlockchainInfo key={network.name} network={network} />
      ))}
    </>
  )
}
