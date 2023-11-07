import React, { useState, useEffect } from 'react'
import { Button, Divider, Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import ERC20_ABI from 'abis/erc20.json'
// import { LabelledValue } from 'components/LabelledValue'
import { DepositSecurityTokenField as SecurityToken } from 'app/pages/accounts/pages/security-tokens/Deposit/DepositSecurityTokenField'
import { DepositMethod } from './DepositMethod/DepositMethod'
import { WalletAddress } from './WalletAddress'
import { DepositAmount } from './DepositAmount'
// import { Network } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Network'
// import { Warning } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Warning'
import { isEmpty } from 'lodash'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useSnackbar } from 'hooks/useSnackbar'
import { useDepositSTO } from 'app/pages/accounts/hooks/useDepositSTO'
import { ClearFormDialog } from '../ClearFormDialog'
import { ConfirmDepositDiaglog } from './ConfirmDepositDialog'

export const DepositFormFields: React.FC = () => {
  const [clearFormConfirmationVisible, setClearFormConfirmationVisible] =
    useState(false)
  const [depositConfirmationVisible, setDepositConfirmationVisible] =
    useState(false)
  const { library, account, deactivate } = useWeb3React()
  const [isLoading, setIsLoading] = useState(false)
  const { data: registeredWallets, isLoading: isFetchingAddresses } =
    useWalletAddresses()
  const [depositSTO] = useDepositSTO()
  const { watch, reset } = useFormContext()
  const token = watch('token')
  const tokenAddress = token?.tokenAddress
  const [tokenBalance, setTokenBalance] = useState('0')
  const depositAddress = watch('depositAddress')
  const depositMethod = watch('depositMethod')
  const walletAddress = watch('walletAddress')
  const chainId = watch('chainId')
  const network = watch('network')
  const amount = watch('amount')
  const { showSnackbar } = useSnackbar()

  const hasSelectedToken = !isEmpty(token)
  const hasSelectedDepositMethod = !isEmpty(depositMethod)
  const hasConnectedWallet = !isEmpty(walletAddress)
  const isNetworkSupported = !isEmpty(network)
  const networksMatched = chainId === token?.network?.chainId
  const isWalletRegistered =
    !(registeredWallets === undefined && isFetchingAddresses) &&
    registeredWallets.find(
      (registeredWallet: WithdrawalAddress) =>
        registeredWallet.address === walletAddress
    ) !== undefined

  const inSufficientBalance = tokenBalance < amount

  const hasError =
    !hasSelectedToken ||
    !hasSelectedDepositMethod ||
    !hasConnectedWallet ||
    !isNetworkSupported ||
    !networksMatched ||
    !isWalletRegistered ||
    inSufficientBalance ||
    amount === undefined ||
    amount <= 0

  //   const QRCodeURL = data?.depositQRCodeUrl

  const fetchTokenBalance = async () => {
    if (library != null && account != null) {
      try {
        setIsLoading(true)

        const provider = new ethers.providers.JsonRpcProvider(
          network?.rpcEndpoint
        )
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ERC20_ABI,
          provider
        )

        const balance = await tokenContract.balanceOf(account)
        setTokenBalance(ethers.utils.formatUnits(balance, 'ether'))

        setIsLoading(false)

        console.log('tokenBalance', balance)
      } catch (error) {
        console.error('Error fetching token balance:', error)
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isNetworkSupported && networksMatched) fetchTokenBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, account, network])

  const clearForm = () => {
    reset()
    deactivate()
  }

  async function sendToken() {
    try {
      setIsLoading(true)

      const signer = library.getSigner()
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
      const depositAmount = String(amount)

      const tx = await tokenContract.transfer(
        depositAddress,
        ethers.utils.parseEther(depositAmount),
        { gasLimit: 5000000 }
      )
      const deposit = await tx.wait()

      await depositSTO({
        from: walletAddress,
        to: depositAddress,
        amount: depositAmount,
        assetId: token?._id,
        txHash: deposit.transactionHash
      })

      clearForm()

      setIsLoading(false)
    } catch (error) {
      console.error(error)
      showSnackbar(error.message, 'error')
      setIsLoading(false)
    }
  }

  return (
    <>
      {(isFetchingAddresses || isLoading) && <LoadingIndicator />}
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <SecurityToken />

        {hasSelectedToken && (
          <>
            <DepositMethod />

            {hasSelectedDepositMethod && hasConnectedWallet && (
              <>
                <WalletAddress
                  networksMatched={networksMatched}
                  isWalletRegistered={isWalletRegistered}
                />

                {isNetworkSupported && networksMatched && (
                  <DepositAmount
                    tokenBalance={tokenBalance}
                    isBalanceSufficient={!inSufficientBalance}
                  />
                )}

                {/* <Network /> */}

                {/* <LabelledValue label='Address' value={address} /> */}

                {/* <img src={QRCodeURL} alt='QR Code' /> */}
                {/* <Warning /> */}
                {/* <Button
                    onClick={handleCopy}
                    variant='contained'
                    color='primary'
                    disabled={address === undefined}
                    style={{ width: '100%' }}
                >
                    Copy Address
                </Button> */}
              </>
            )}
          </>
        )}
      </Box>

      <Divider sx={{ marginY: 5 }} />

      <Box display={'flex'} gap={3}>
        <Button
          onClick={() => setClearFormConfirmationVisible(true)}
          variant='outlined'
          color='primary'
          disableElevation
          disabled={!hasSelectedToken}
          sx={{ width: '100%', paddingY: 2 }}
        >
          Clear Form
        </Button>
        <Button
          onClick={() => setDepositConfirmationVisible(true)}
          variant='contained'
          color='primary'
          disableElevation
          disabled={hasError}
          sx={{ width: '100%', paddingY: 2 }}
        >
          Confirm
        </Button>
      </Box>

      <ClearFormDialog
        open={clearFormConfirmationVisible}
        close={() => setClearFormConfirmationVisible(false)}
        clearForm={clearForm}
      />

      <ConfirmDepositDiaglog
        open={depositConfirmationVisible}
        close={() => setDepositConfirmationVisible(false)}
        confirm={sendToken}
        depositMethod={depositMethod}
        walletAddress={walletAddress}
        network={network?.name}
        token={token}
        depositAmount={amount}
      />
    </>
  )
}
