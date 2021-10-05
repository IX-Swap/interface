import { Box, Grid, Typography } from '@material-ui/core'
import { useTreasuryWallet } from 'app/pages/authorizer/hooks/useTreasuryWallet'
import { CustodyForm } from 'app/pages/authorizer/pages/TokenDeployment/CustodyForm'
import { DeployTokenButton } from 'app/pages/issuance/components/DeployTokenButton'
import { DeployTokenMessagesList } from 'app/pages/issuance/components/DeployTokenMessagesList'
import { useDeployToken } from 'app/pages/issuance/hooks/useDeployToken'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Network' value={data.network?.name} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Token Symbol ' value={data.tokenSymbol} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Currency' value={data.currency.symbol} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Capital Structure'
          value={data.capitalStructure}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Minimum Amount' value={data.minimumInvestment} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Market Type' value={data.marketType} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Assigned Custody' value={undefined} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Treasury Wallet Balance'
          value={
            walletData !== undefined
              ? `${data.network?.nativeCurrency.symbol ?? ''} ${
                  walletData.balance ?? ''
                }`
              : undefined
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Box p={2} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h3'>Deploy Token</Typography>
      </Grid>
      {data.deploymentInfo === undefined ? (
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
      ) : (
        <Grid item xs={12}>
          <CustodyForm />
        </Grid>
      )}
      <Grid item xs={12}>
        <DeployTokenMessagesList
          isInitializing={isInitializing}
          fixedHeight={400}
        />
      </Grid>
    </Grid>
  )
}
