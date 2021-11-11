import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import {
  BlockchainAddressVariant,
  WithdrawalAddressFormValues
} from 'types/withdrawalAddress'
import { TypedField } from 'components/form/TypedField'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { Radios } from 'components/form/Radios'
import { CreateWalletFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletFields'
import { ConnectWalletFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/ConnectWalletFields'

const radios: Array<{ label: string; value: BlockchainAddressVariant }> = [
  {
    label: 'Connect to Wallet',
    value: 'connect'
  },
  {
    label: 'Input Withdrawal Address',
    value: 'create'
  }
]

export const WAFormFields = () => {
  const { control, watch } = useFormContext<WithdrawalAddressFormValues>()
  const variant = watch('variant')
  const isCreateWallet = variant === 'create'
  const isConnectWallet = variant === 'connect'

  return (
    <>
      <Grid item>
        <TypedField
          customRenderer
          control={control}
          component={Radios}
          name='variant'
          label='Wallet Type'
          items={radios}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        />
      </Grid>

      <Grid item>
        <TypedField
          control={control}
          component={NetworkSelect}
          name='network'
          label='Blockchain Network'
        />
      </Grid>

      {isCreateWallet && <CreateWalletFields />}
      {isConnectWallet && <ConnectWalletFields />}
    </>
  )
}
