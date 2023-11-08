import React from 'react'
import { Box, Button, FormControl, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectProps } from 'ui/Select/Select'
import { Autocomplete } from 'ui/Select/Autocomplete/Autocomplete'
import { renderAddressColumn } from 'helpers/rendering'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AccountsRoute } from '../router/config'

export const WalletAddressSelect = React.forwardRef((props: SelectProps) => {
  const { data, isLoading } = useWalletAddresses()

  const hasData = !isLoading && data !== undefined && data?.length > 0
  const options = !hasData
    ? []
    : data?.map((wallet: WithdrawalAddress) => ({
        label: wallet.label,
        render: (
          <Box
            display={'flex'}
            width={'100%'}
            alignItems='center'
            justifyContent={'space-between'}
            gap={1}
          >
            <Typography>{wallet.label}</Typography>
            <Typography color='tooltip.color'>
              {renderAddressColumn(wallet.address, false)}
            </Typography>
          </Box>
        ),
        value: wallet
      }))

  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel>{props.label}</InputLabel>

      <Box display={'flex'} alignItems={'end'} gap={2}>
        <Autocomplete
          {...props}
          placeholder={
            hasData ? props.placeholder : 'You do not have a wallet address'
          }
          options={options}
          disabled={isLoading || !hasData}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ width: '250px', paddingX: 1, paddingY: 1.5 }}
          disableElevation
          component={AppRouterLinkComponent}
          to={AccountsRoute.withdrawalAddresses}
        >
          <Add sx={{ marginRight: 1 }} />
          Wallet Address
        </Button>
      </Box>
    </FormControl>
  )
})
WalletAddressSelect.displayName = 'Select_ WalletAddressSelect'
