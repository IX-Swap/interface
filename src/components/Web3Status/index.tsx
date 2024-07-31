import React, { useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { Connector } from '@web3-react/types'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'

import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import MetaMaskIcon from '../../assets/images/metamask.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { metaMask } from '../../connectors/metaMask'
import { walletConnectV2 } from '../../connectors/walletConnectV2'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import { ButtonSecondary, PinnedContentButton } from '../Button'
import Loader from '../Loader'
import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'
import { useETHBalances } from 'state/wallet/hooks'
import { useNativeCurrency } from 'hooks/useNativeCurrencyName'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { coinbaseWallet } from 'connectors/coinbaseWallet'

function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

// eslint-disable-next-line react/prop-types
export function StatusIcon({ connector }: { connector: Connector }) {
  if (connector === metaMask) {
    return (
      <IconWrapper size={16}>
        <img src={MetaMaskIcon} alt="Metamask" />
      </IconWrapper>
    )
  } else if (connector === walletConnectV2) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={'WalletConnect'} />
      </IconWrapper>
    )
  } else if (connector === coinbaseWallet) {
    return (
      <IconWrapper size={16}>
        <img src={CoinbaseWalletIcon} alt={'CoinbaseWallet'} />
      </IconWrapper>
    )
  }

  return null
}

function Web3StatusInner() {
  const { account, connector } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length
  const toggleWalletModal = useWalletModalToggle()

  const connectWallet = () => {
    const { ym } = window
    ym(84960586, 'reachGoal', 'headerConnectWalletClicked')
    toggleWalletModal()
  }
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const nativeCurrency = useNativeCurrency()

  if (account) {
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        {!hasPendingTransactions && connector && <StatusIcon connector={connector} />}
        {hasPendingTransactions ? (
          <RowBetween>
            <Text style={{ margin: '4px 13px 4px 0' }}>
              <Trans>{pending?.length} Pending</Trans>
            </Text>{' '}
            <Loader stroke="white" />
          </RowBetween>
        ) : (
          <Text style={{ margin: '4px 13px 4px 5px', width: '100%' }}>{ENSName || shortenAddress(account)}</Text>
        )}
        <AccountElement style={{ pointerEvents: 'auto' }}>
          {account && userEthBalance ? (
            <Trans>
              {formatAmount(+(userEthBalance?.toSignificant(4) || 0))} {nativeCurrency}
            </Trans>
          ) : null}
        </AccountElement>

        <ChevronElement />
      </Web3StatusConnected>
    )
  } else {
    return (
      <StyledPinnedContentButton
        style={{ padding: '5px 20px' }}
        className="connect-button"
        id="connect-wallet"
        onClick={connectWallet}
      >
        <Text>
          <Trans>Connect Wallet</Trans>
        </Text>
      </StyledPinnedContentButton>
    )
  }
}

export default function Web3Status() {
  const { isActive, account } = useWeb3React()
  const contextNetwork = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

  if (!contextNetwork.isActive && !isActive) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0;
  border: none;
  opacity: unset;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  outline: none;
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background: ${({ theme }) => theme.bg25};
  opacity: ${({ pending }) => (pending ? '0.7' : '1')};
  padding: 10px 5px 10px 10px;
  color: ${({ theme }) => theme.black};
  // font-weight: 600;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #e6e6ff;

  ${({ theme }) => theme.mediaWidth.upToMedium`
     padding: 8px 3px 8px 20px;
     z-index: 0;
  `};
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  width: fit-content;
  font-weight: 600;
  line-height: 18px;
`

const AccountElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;
  :focus {
    border: 1px solid blue;
  }
`

const StyledPinnedContentButton = styled(PinnedContentButton)`
  width: 100%;
  margin-left: 35px;
  margin-right: 35px;
  padding: 10px 40px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 100%;
  margin-left: 0px;
  margin-right: 0px;
  padding: 10px 40px;
  `};
`

const ChevronElement = styled(ChevronDown)`
  margin-left: 10px;
  height: 20px;
  min-width: 20px;
  color: ${({ theme }) => theme.text1};
  > svg {
    height: 20px;
    min-width: 20px;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`
