import { Grid } from '@material-ui/core'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { Radios } from 'components/form/Radios'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import {
  BlockchainAddressVariant,
  WithdrawalAddressFormValues
} from 'types/withdrawalAddress'
import React from 'react'

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

export const WABaseFields = () => {
  const { control, watch } = useFormContext<WithdrawalAddressFormValues>()
  const wallet = watch('wallet')
  const hasWallet = wallet !== undefined

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
          disabled={hasWallet}
          variant='outlined'
        />
      </Grid>
    </>
  )
}
