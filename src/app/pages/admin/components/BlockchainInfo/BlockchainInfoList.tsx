import React from 'react'
import { BlockchainSettings } from 'types/blockchain'
import { BlockchainInfo } from 'app/pages/admin/components/BlockchainInfo/BlockchainInfo'
import { Grid } from '@mui/material'

interface BlockchainInfoListProps {
  networks: BlockchainSettings['networks']
}

export const BlockchainInfoList = ({ networks }: BlockchainInfoListProps) => {
  return (
    <Grid container spacing={2}>
      {networks.map(network => (
        <Grid item xs={12} md={6}>
          <BlockchainInfo key={network.name} network={network} />
        </Grid>
      ))}
    </Grid>
  )
}
