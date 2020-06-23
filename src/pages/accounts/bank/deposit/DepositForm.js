// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react'
import {
  FormControl,
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'
import NumberFormat from 'react-number-format'

import * as AssetsModule from 'context/assets'
import * as AssetActions from 'context/assets/actions'
import { ASSETS_STATUS } from 'context/assets/types'
import type { Asset } from 'context/assets/types'
import BankDetails from './BankDetails'
import type { Bank } from '../modules/types'

const { AssetsProvider, useAssetsState, useAssetsDispatch } = AssetsModule
const { getAssets } = AssetActions

const useAssetsGetter = () => {
  const mountedRef = useRef(true)
  const aDispatch = useAssetsDispatch()
  const { status, type, assets } = useAssetsState()
  const [asset, setAsset] = useState(null)
  const acceptType = 'Currency'

  useEffect(() => {
    if (status === ASSETS_STATUS.INIT || type !== acceptType) {
      getAssets(aDispatch, {
        ref: mountedRef,
        type: acceptType
      })
    }
  }, [aDispatch, status, type])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return { status, assets, asset, setAsset }
}

const NumberFormatCustom = ({ inputRef, onChange, ...others }: any) => (
  <NumberFormat
    thousandSeparator
    {...others}
    allowEmptyFormatting
    inputMode='numeric'
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange({
        target: {
          name: others.name,
          value: values.value
        }
      })
    }}
    isNumericString
  />
)

const useBankDepositLogic = () => {
  const [amount, setAmount] = useState<string>('')

  const handleChange = (event: { target: { name: string, value: number } }) => {
    setAmount(`${event.target.value}`)
  }

  const deposit = () => {}

  return {
    amount,
    handleChange,
    deposit
  }
}

function BankDepositForm ({
  bank,
  deposit,
  code
}: {
  bank: Bank,
  code: string,
  deposit: (amount: number, asset: Asset) => void,
}) {
  const { amount, handleChange } = useBankDepositLogic()
  const { assets, asset, setAsset } = useAssetsGetter()

  const handleSelectChange = (val) => {
    setAsset(val.target.value)
  }

  return (
    <>
      <Grid container justify='center'>
        <FormControl style={{ minWidth: '75px' }}>
          <InputLabel id='currency-selector-input'>Currency</InputLabel>
          <Select
            labelId='currency-selector'
            id='currency-selector-value'
            value={asset || {}}
            onChange={handleSelectChange}
          >
            {assets.map((item) => (
              <MenuItem key={item._id} value={item}>
                {item.symbol}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {asset && (
          <FormControl style={{ marginLeft: '16px' }}>
            <TextField
              label='Amount'
              autoComplete='off'
              value={amount}
              onChange={handleChange}
              name='numberformat'
              id='formatted-numberformat-input'
              inputProps={{
                symbol: asset.symbol
              }}
              // eslint-disable-next-line
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <Typography variant='caption'>
              Transaction fees may apply
            </Typography>
          </FormControl>
        )}
      </Grid>
      <BankDetails bank={bank} code={code} />
      <Grid container justify='center'>
        {asset && (
          <Box mb={4}>
            <Button
              disabled={!amount}
              variant='contained'
              color='primary'
              onClick={() => deposit(parseFloat(amount), asset)}
            >
              Continue
            </Button>
          </Box>
        )}
      </Grid>
    </>
  )
}

const BankDepositFormWithProvider = ({
  bank,
  deposit,
  code
}: {
  bank: Bank,
  code: string,
  deposit: (amount: number, asset: Asset) => void,
}) => (
  <AssetsProvider>
    <BankDepositForm bank={bank} deposit={deposit} code={code} />
  </AssetsProvider>
)

export default BankDepositFormWithProvider
