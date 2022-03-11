import { Box, Card, CardContent, LinearProgress } from '@mui/material'
import React from 'react'
import { BlockchainSettingsForm } from 'app/pages/admin/components/BlockchainSettingsForm/BlockchainSettingsForm'
import { BlockchainMetaDataTable } from 'app/pages/admin/components/BlockchainMetaDataTable/BlockchainMetaDataTable'
import { useBlockchainSettings } from 'app/pages/admin/hooks/useBlockchainSettings'
import { BlockchainSettingsPlaceholder } from 'app/pages/admin/components/BlockchainSettingsPlaceholder/BlockchainSettingsPlaceholder'
import { BlockchainInfoList } from 'app/pages/admin/components/BlockchainInfo/BlockchainInfoList'

export const BlockchainSettingsContent = () => {
  const { data, isLoading } = useBlockchainSettings()
  let content: any = <BlockchainSettingsPlaceholder />

  if (isLoading) {
    content = null
  }

  if (data !== undefined) {
    content = (
      <Card elevation={0}>
        <CardContent>
          <BlockchainInfoList networks={data.networks} />
          <Box height={40} />
          <BlockchainSettingsForm decimal={data.decimal} />
          <Box height={40} />
          <BlockchainMetaDataTable data={data.metaDataFields} />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {isLoading && <LinearProgress data-testid='blockchain-settings-loader' />}
      {content}
    </>
  )
}
