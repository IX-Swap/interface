//
import React, { useState, useEffect, useRef } from 'react'
import { INVESTAX_BANK } from 'config'
import RouteProps from 'react-router-dom'
import { Typography, Box } from '@material-ui/core'
import storage from 'services/storageHelper'

import BankDepositForm from './DepositForm'
import DepositConfirmation from './DepositConfirmation'

import DepositList from './list'

const useGenericBankLogic = () => {
  const [amount, setAmount] = useState(0)
  const [asset, setAsset] = useState(null)
  const mountedRef = useRef(true)
  const [isConfirmation, setIsConfirmation] = useState(false)

  const deposit = (toDeposit, mAsset) => {
    setAmount(toDeposit)
    setIsConfirmation(true)
    setAsset(mAsset)
  }

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return {
    asset,
    setAsset,
    deposit,
    amount,
    isConfirmation,
    setIsConfirmation
  }
}

function BankDepositComponent ({ code }) {
  const { deposit, amount, isConfirmation, asset } = useGenericBankLogic()

  // $FlowFixMe
  const investaxBank = { ...INVESTAX_BANK }

  let toRender = (
    <BankDepositForm
      bank={investaxBank}
      code={code}
      deposit={(toDeposit, mAsset) => deposit(toDeposit, mAsset)}
    />
  )

  if (isConfirmation && asset) {
    toRender = (
      <DepositConfirmation
        bank={investaxBank}
        amount={amount}
        transactionCode={code}
        asset={asset}
      />
    )
  }

  return (
    <>
      <Box m={4}>
        <Typography variant='h3'>Deposit Cash</Typography>
      </Box>
      {toRender}

      <Box m={4}>
        <Typography variant='h3'>Recent Deposits</Typography>
      </Box>
      <Box m={4}>
        <DepositList />
      </Box>
    </>
  )
}

function BankDepositHolder ({ match }) {
  const { bankId } = match.params
  const code = storage.generateRandom(8, 'A#')

  return <BankDepositComponent bankId={bankId} code={code} />
}

export default BankDepositHolder
