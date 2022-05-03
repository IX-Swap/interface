import { Button } from '@mui/material'
import WalletModal from 'components/WalletModal/WalletModal'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import React, { useState } from 'react'

export const ConnectWalletButton = () => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)
  const { account } = useActiveWeb3React()
  return (
    <>
      {account === undefined && (
        <Button variant='outlined' color='primary' onClick={toggleOpen}>
          Connect Wallet
        </Button>
      )}
      <WalletModal isOpen={isOpen} toggleModal={toggleOpen} />
    </>
  )
}
