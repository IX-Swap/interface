import { Box, Grid } from '@mui/material'
import { useTreasuryWallet } from 'app/pages/authorizer/hooks/useTreasuryWallet'
import { CustodyForm } from 'app/pages/authorizer/pages/TokenDeployment/CustodyForm'
import { DeployTokenButton } from 'app/pages/issuance/components/DeployTokenButton'
import { DeployTokenMessagesList } from 'app/pages/issuance/components/DeployTokenMessagesList'
import { useDeployToken } from 'app/pages/issuance/hooks/useDeployToken'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export interface TokenDeploymentViewProps {
  data: DigitalSecurityOffering
}

export const TokenDeploymentView = ({ data }: TokenDeploymentViewProps) => {
  const { deploy, isInitializing, isDeploying, isDeployed } = useDeployToken(
    data._id
  )

  const { data: walletData } = useTreasuryWallet(
    data.network?.networkCode,
    data._id
  )

  const items = [
    {
      label: 'Network',
      value: data.network?.name
    },
    {
      label: 'Token Symbol',
      value: data.tokenSymbol
    },
    {
      label: 'Currency',
      value: data.currency.symbol
    },
    {
      label: 'Capital Structure',
      value: data.capitalStructure
    },
    {
      label: 'Minimum Amount',
      value: data.minimumInvestment
    },
    {
      label: 'Market Type',
      value: data.marketType
    },
    {
      label: 'Assigned Custody',
      value: undefined
    },
    {
      label: 'Treasury Wallet Balance',
      value:
        walletData !== undefined
          ? `${data.network?.nativeCurrency.symbol ?? ''} ${
              walletData.balance ?? walletData?.ownerBalance ?? ''
            }`
          : undefined
    },
    {
      label: 'Decimals',
      value: data.decimalPlaces
    }
  ]

  return (
    <>
      <Box ml={3} mt={3} mb={2}>
        <FieldGrid items={items} />
      </Box>

      <FieldContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormSectionHeader title={'Deploy Token'} />
          </Grid>
          {data.deploymentInfo !== undefined || isDeployed ? (
            <Grid item xs={12}>
              <CustodyForm />
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <DeployTokenButton
                isInitializing={isInitializing}
                isDeployed={isDeployed}
                isDeploying={isDeploying}
                deploymentInfo={data.deploymentInfo}
                onClick={deploy}
                hideTextStatus
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <DeployTokenMessagesList
              isInitializing={isInitializing}
              fixedHeight={400}
            />
          </Grid>
        </Grid>
      </FieldContainer>
    </>
  )
}
