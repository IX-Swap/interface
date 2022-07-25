import { Box, Button, Grid } from '@mui/material'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { AddressSelect } from 'app/pages/invest/components/MakeCommitment/AddressSelect'
import { DownloadDocumentButton } from 'app/pages/invest/components/MakeCommitment/DownloadDocumentButton'
import { EstimatedValue } from 'app/pages/invest/components/MakeCommitment/EstimatedValue'
import { NumberOfUnits } from 'app/pages/invest/components/MakeCommitment/NumberOfUnits'
import { OTPFIeld } from 'app/pages/invest/components/MakeCommitment/OTPField'
import { ToC } from 'app/pages/invest/components/MakeCommitment/ToC'
import { UnitPrice } from 'app/pages/invest/components/MakeCommitment/UnitPrice'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Divider } from 'ui/Divider'

export interface MakeCommitmentFormFieldsProps {
  dso: DigitalSecurityOffering
}

export const MakeCommitmentFormFields = ({
  dso
}: MakeCommitmentFormFieldsProps) => {
  const { isTablet } = useAppBreakpoints()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <AddressSelect />
      </Grid>
      <Grid item xs={12} md={5}>
        <Button
          variant='outlined'
          href={AccountsRoute.withdrawalAddressesCreate}
          target='_blank'
          size='large'
          fullWidth
          sx={{
            marginTop: isTablet ? 0 : '26px'
          }}
        >
          Add Your Metamask Wallet
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberOfUnits
          isCampaign={dso.isCampaign}
          dsoDecimalScale={dso.deploymentInfo?.decimals}
          symbol={dso.currency.symbol}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <UnitPrice />
      </Grid>
      <Grid item xs={12} md={8}>
        <OTPFIeld />
      </Grid>
      <Grid item xs={12} md={4} alignSelf='center'>
        <EstimatedValue symbol={dso.currency.symbol} />
      </Grid>
      <Grid item xs={12}>
        <Box
          width='100%'
          pt={{
            xs: 0,
            md: 2
          }}
        >
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <ToC isCampaign={dso.isCampaign} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DownloadDocumentButton dso={dso} />
      </Grid>
    </Grid>
  )
}
