import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { TypedField } from 'components/form/TypedField'
import { WalletSelect } from 'components/form/WalletSelect'
import { Box, Grid, TextField } from '@material-ui/core'
import { privateClassNames } from 'helpers/classnames'

export const WAConnectFields = () => {
  const { control, watch } = useFormContext<WithdrawalAddressFormValues>()
  const network = watch('network')
  const address = watch('address')
  const hasNetwork = network !== undefined
  const hasAddress = address !== undefined
  const addressDisplay = hasAddress ? 'initial' : 'none'

  return (
    <>
      {hasNetwork && (
        <Grid item>
          <TypedField
            control={control}
            component={WalletSelect}
            name='wallet'
            label='Select Wallet'
            disabled={hasAddress}
            variant='outlined'
          />
        </Grid>
      )}

      <Grid component={Box} item display={addressDisplay}>
        <TypedField
          className={privateClassNames()}
          component={TextField}
          variant='outlined'
          name='address'
          label='Wallet Address'
          control={control}
          disabled
        />
      </Grid>
    </>
  )
}
