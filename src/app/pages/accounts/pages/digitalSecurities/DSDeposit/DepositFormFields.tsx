import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { useSnackbar } from 'hooks/useSnackbar'
import { LabelledValue } from 'components/LabelledValue'
import { TokensField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/TokensField'
import { Network } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Network'
import { Warning } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Warning'
import { useDepositAddress } from 'app/pages/accounts/hooks/useDepositAddress'
import { useFormContext } from 'react-hook-form'
import { LayoutWrapper } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/LayoutWrapper'

export const DepositFormFields: React.FC = () => {
  const { watch } = useFormContext()
  const tokenSymbol = watch('token')

  const { data } = useDepositAddress(tokenSymbol)
  const address = data?.deposit_address
  const QRCodeURL = data?.depositQRCodeUrl

  const snackbar = useSnackbar()
  const handleCopy = async () => {
    await navigator.clipboard.writeText(address ?? '')
    snackbar.showSnackbar('Copied to clipboard', 'info')
  }

  return (
    <>
      <Grid item xs={12}>
        <TokensField />
      </Grid>

      <LayoutWrapper>
        <Network />
      </LayoutWrapper>
      <LayoutWrapper>
        <LabelledValue label='Address' value={address ?? '-'} />
      </LayoutWrapper>
      {QRCodeURL !== undefined && (
        <LayoutWrapper>
          <img src={QRCodeURL} alt='QR Code' />
        </LayoutWrapper>
      )}

      <LayoutWrapper>
        <Warning />
      </LayoutWrapper>
      <LayoutWrapper>
        <Button
          onClick={handleCopy}
          variant='contained'
          color='primary'
          disabled={address === undefined}
          style={{ width: '100%' }}
        >
          Copy Address
        </Button>
      </LayoutWrapper>
    </>
  )
}
