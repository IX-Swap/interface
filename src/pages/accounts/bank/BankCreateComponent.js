import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  CircularProgress
} from '@material-ui/core'

import { 
  useAccountDispatch,
  useAccountState,
  getBankAccounts,
  createBankAccount
} from 'context/AccountContext'

import {
  useAssetsDispatch,
  useAssetsState,
  getAssets,
  ASSETS_STATUS
} from 'context/AssetsContext'

export default function BankCreateComponent (props) {
  const bankDispatch = useAccountDispatch()
  const {
    currencies,
    assetsReady,
    getBankList,
    bankState,
    handleSelectChange,
    assetId,
    symbol
  } = useBankCreateLogic()

  const history = useHistory()
  const [bankAccountName, setBankAccountName] = useState('')
  const [bankAddress, setBankAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  })
  const [bankAccountHolderName, setBankAccountHolderName] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const [bankAccountNumber, setBankAccountNumber] = useState('')

  const handleClickSubmit = () => {
    const payload = {
      bankName: bankAccountName,
      bankAddress: bankAddress,
      accountHolderName: bankAccountHolderName,
      swiftCode: swiftCode,
      bankAccountNumber: bankAccountNumber,
      assetId: assetId
    }

    createBankAccount(bankDispatch, payload)
      .then(() => {
        getBankList()
        setTimeout(() => {
          history.push('/accounts')
        }, 1000)
      })
      .catch()
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item lg={9}>
        <Paper>
          <Grid item sm={12} md={12} lg={12}>
            <Box mt={3} p={3}>
              <Typography variant='h3'>Setup Bank Account</Typography>
            </Box>
          </Grid>

          <Grid container>
            <Grid item lg={12}>
              <Box ml={3} mt={3}>
                <Typography variant='h5'>Account Info</Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-name'>Bank Name</InputLabel>
                  <Input
                    id='bank-name'
                    onChange={e => {
                      setBankAccountName(e.target.value)
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-holder-name-input'>
                    Account Holder Name
                  </InputLabel>
                  <Input
                    id='account-holder-name-input'
                    onChange={e => {
                      setBankAccountHolderName(e.target.value)
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item sm={12} md={12} lg={3}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel id='currency-selector-input'>Currency</InputLabel>
                  <Select
                    fullWidth
                    labelId='currency-selector'
                    id='currency-selector-value'
                    value={symbol}
                    onChange={handleSelectChange}
                  >
                    {assetsReady
                      ? currencies.map((item, index) => (
                          <MenuItem key={item.id} value={index}>
                            {item.symbol}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-account-number-input'>
                    Bank Account Number
                  </InputLabel>

                  <Input
                    id='bank-account-number-input'
                    type='number'
                    onChange={e => {
                      setBankAccountNumber(e.target.value)
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={3}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='swift-code-input'>Swift Code</InputLabel>
                  <Input
                    id='swift-code-input'
                    type='number'
                    onChange={e => {
                      setSwiftCode(e.target.value)
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={12} lg={12}>
              <Box ml={3} mt={3}>
                <Typography variant='h5'>Bank Address</Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-line1-input'>
                    Line 1
                  </InputLabel>
                  <Input
                    id='bank-address-line1-input'
                    onChange={e => {
                      setBankAddress({
                        ...bankAddress,
                        line1: e.target.value
                      })
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-line2-input'>
                    Line 2
                  </InputLabel>
                  <Input
                    id='bank-address-line2-input'
                    onChange={e => {
                      setBankAddress({
                        ...bankAddress,
                        line2: e.target.value
                      })
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-city-input'>
                    City
                  </InputLabel>
                  <Input
                    id='bank-address-city-input'
                    onChange={e => {
                      setBankAddress({ ...bankAddress, city: e.target.value })
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-state-input'>
                    State
                  </InputLabel>
                  <Input
                    id='bank-address-state-input'
                    onChange={e => {
                      setBankAddress({
                        ...bankAddress,
                        state: e.target.value
                      })
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid container>
              <Grid item sm={12} md={12} lg={6}>
                <Box ml={3} m={1}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='bank-address-country-input'>
                      Country
                    </InputLabel>
                    <Input
                      id='bank-address-country-input'
                      onChange={e => {
                        setBankAddress({
                          ...bankAddress,
                          country: e.target.value
                        })
                      }}
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item sm={12} md={12} lg={5}>
                <Box ml={3} m={1}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='bank-address-postal-code-input'>
                      Postal Code
                    </InputLabel>
                    <Input
                      id='bank-address-postalcode-input'
                      onChange={e => {
                        setBankAddress({
                          ...bankAddress,
                          postalCode: e.target.value
                        })
                      }}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box m={3} p={3}>
              {!bankState.isLoading ? (
                <FormControl>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClickSubmit}
                  >
                    Submit
                  </Button>
                </FormControl>
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

function useBankCreateLogic () {
  const assetsDispatch = useAssetsDispatch()
  const bankListDispatch = useAccountDispatch()
  const bankState = useAccountState()
  const [assetId, setAssetId] = useState('')
  const [symbol, setSymbol] = useState('')

  const { status: assetsStatus, assets } = useAssetsState()

  // const currencies = assetsReady ? assets.list.map(asset => asset.symbol) : ''

  const assetsReady = ![ASSETS_STATUS.INIT].includes(assetsStatus)
  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.INIT) {
      getAssets(assetsDispatch)
    }
  }, [assetsStatus, assetsDispatch])

  const currencies = assets.list
    ? assets.list.map((asset, i) => {
        if (asset.type === 'currency') {
          return { id: i, symbol: asset.symbol, assetId: asset._id }
        }
        return 0
      })
    : []
      console.log('currencies: ', currencies)
  const getBankList = () => getBankAccounts(bankListDispatch)

  const handleSelectChange = ev => {
    ev.preventDefault()
    setSymbol(ev.target.value)
    currencies.map(c => {
      if (c.id === ev.target.value) setAssetId(c.assetId)
      return 0
    })
  }

  return {
    currencies,
    assetsReady,
    getBankList,
    bankState,
    handleSelectChange,
    assetId,
    symbol
  }
}
