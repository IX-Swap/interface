import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { TypedField } from 'components/form/TypedField'
import { WalletSelect } from 'components/form/WalletSelect'
import { Grid, Input } from '@material-ui/core'
import { privateClassNames } from 'helpers/classnames'

export const WAConnectFields = () => {
  const { control, watch } = useFormContext<WithdrawalAddressFormValues>()
  const network = watch('network')
  const address = watch('address')
  const hasNetwork = network !== undefined
  const hasAddress = address !== undefined

  return (
    <>
      {hasNetwork && (
        <Grid item>
          <TypedField
            component={WalletSelect}
            name='wallet'
            label='Select Wallet'
            control={control}
            disabled={hasAddress}
          />
        </Grid>
      )}

      <Grid item style={{ display: hasAddress ? 'flex' : 'none' }}>
        <TypedField
          className={privateClassNames()}
          component={Input}
          name='address'
          label='Wallet Address'
          control={control}
          disabled
        />
      </Grid>
    </>
  )
}
