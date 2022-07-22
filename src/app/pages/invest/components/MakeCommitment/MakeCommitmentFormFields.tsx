import { Button, Grid } from '@mui/material'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { AddressSelect } from 'app/pages/invest/components/MakeCommitment/AddressSelect'
import { EstimatedValue } from 'app/pages/invest/components/MakeCommitment/EstimatedValue'
import { NumberOfUnits } from 'app/pages/invest/components/MakeCommitment/NumberOfUnits'
import { OTPFIeld } from 'app/pages/invest/components/MakeCommitment/OTPField'
import { UnitPrice } from 'app/pages/invest/components/MakeCommitment/UnitPrice'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { Asset } from 'types/asset'

export interface MakeCommitmentFormFieldsProps {
  dsoCurrency: Asset
  isCampaign?: boolean
  decimalScale?: number
}

export const MakeCommitmentFormFields = ({
  isCampaign,
  decimalScale,
  dsoCurrency
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
          isCampaign={isCampaign}
          dsoDecimalScale={decimalScale}
          dsoCurrencyId={dsoCurrency._id}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <UnitPrice />
      </Grid>
      <Grid item xs={12} md={8}>
        <OTPFIeld />
      </Grid>
      <Grid item xs={12} md={4} alignSelf='center'>
        <EstimatedValue
          symbol={dsoCurrency.symbol}
          dsoCurrencyId={dsoCurrency._id}
        />
      </Grid>
    </Grid>
  )
}
