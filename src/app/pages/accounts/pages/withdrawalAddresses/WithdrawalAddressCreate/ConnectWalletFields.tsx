import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { TypedField } from 'components/form/TypedField'
import { WalletSelect } from 'components/form/WalletSelect'
import { Grid } from '@material-ui/core'

export const ConnectWalletFields = () => {
  const { control } = useFormContext<WithdrawalAddressFormValues>()

  return (
    <>
      <Grid item>
        <TypedField
          component={WalletSelect}
          name='wallet'
          label='Select Wallet'
          control={control}
        />
      </Grid>
    </>
  )
}
