import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useWeb3React } from '@web3-react/core'
import cn from 'classnames'
import {
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormControl
} from '@mui/material'
import { useConnectWallet } from '../../withdrawalAddresses/WithdrawalAddressCreate/ConnectWallet'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { TypedField } from 'components/form/TypedField'
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'
import { useStyles } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect.styles'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { useAllNetworks } from '../../withdrawalAddresses/hooks/useAllNetworks'

export const DEPOSIT_METHODS = [...Object.values(SUPPORTED_WALLETS)]

export const DepositMethod = () => {
  const classes = useStyles()
  const { account, chainId } = useWeb3React()
  const { connectWallet } = useConnectWallet()
  const { control, watch, setValue } = useFormContext()
  const depositMethod = watch('depositMethod')
  const { data: chains } = useAllNetworks()

  const getNetwork = (chainId?: number) =>
    chains?.find(chain => chain.chainId === chainId)

  useEffect(
    () => {
      const network = getNetwork(chainId)

      setValue('walletAddress', account)
      setValue('chainId', chainId)
      setValue('network', network)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, chainId]
  )

  return (
    <FormControl>
      <InputLabel>Deposit Method</InputLabel>
      <Grid container alignItems='center'>
        <Grid item xs>
          <TypedField
            customRenderer
            component={RadioGroup}
            name='depositMethod'
            control={control}
            defaultValue={''}
          >
            <Grid container display={'flex'} gap={1.5}>
              {DEPOSIT_METHODS.map(wallet => {
                const isSelected = depositMethod === wallet.key

                return (
                  <Grid
                    item
                    flexGrow={1}
                    flexBasis={0}
                    className={cn(classes.button, {
                      [classes.active]: isSelected
                    })}
                    onClick={async () => {
                      await connectWallet(wallet.key)
                      setValue('depositMethod', wallet.key)
                    }}
                  >
                    <FormControlLabel
                      label={
                        <Box display={'flex'} alignItems={'center'} gap={1}>
                          <Typography
                            color={isSelected ? 'inherit' : 'tooltip.color'}
                          >{`${wallet.name} Wallet`}</Typography>
                          <img
                            src={wallet.iconURL}
                            alt={wallet.name}
                            width={'20'}
                            height={'20'}
                          />
                        </Box>
                      }
                      value={wallet.key}
                      control={<UIRadio />}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </TypedField>
          <input {...control.register('walletAddress')} hidden />
          <input {...control.register('chainId')} hidden />
          <input {...control.register('network')} hidden />
        </Grid>
      </Grid>
    </FormControl>
  )
}
