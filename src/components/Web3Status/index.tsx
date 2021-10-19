import { t, Trans } from '@lingui/macro'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken } from 'polished'
import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { Activity } from 'react-feather'
import styled, { css } from 'styled-components'
import { DesktopAndTablet } from 'theme'
// import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
// import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
// import PortisIcon from '../../assets/images/portisIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { injected, walletconnect } from '../../connectors'
import { NetworkContextName } from '../../constants/misc'
import useENSName from '../../hooks/useENSName'
import { useHasSocks } from '../../hooks/useSocksBalance'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import { ButtonSecondary } from '../Button'
import Identicon from '../Identicon'
import Loader from '../Loader'
import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'

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
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  outline: none;
  :focus,
  :hover,
  :active,
  :focus-within,
  :target,
  :visited,
  :focus-visible {
    border: 0;
    outline: none;
    box-shadow: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background: ${({ theme }) => theme.bgG1};
  border: none;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.text1};
  font-weight: 600;
  border-radius: 40px;
  padding: 1px 7px;

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.bgG1};
      color: ${({ theme }) => theme.text1};
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background: ${({ theme }) => theme.bgG1};
  opacity: ${({ pending }) => (pending ? '0.7' : '1')};
  padding-right: 10px;
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 3px 0.5rem;
  font-size: 14px;
  width: fit-content;
  font-weight: 500;
  line-height: 17px;
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Sock() {
  return (
    <span role="img" aria-label={t`has socks emoji`} style={{ marginTop: -4, marginBottom: -4 }}>
      🧦
    </span>
  )
}

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return (
      <DesktopAndTablet>
        <Identicon />
      </DesktopAndTablet>
    )
  } else if (connector === walletconnect) {
    return (
      <DesktopAndTablet>
        <IconWrapper size={16}>
          <img src={WalletConnectIcon} alt={'WalletConnect'} />
        </IconWrapper>
      </DesktopAndTablet>
    )
  }
  // else if (connector === walletlink) {
  //   return (
  //     <IconWrapper size={16}>
  //       <img src={CoinbaseWalletIcon} alt={'CoinbaseWallet'} />
  //     </IconWrapper>
  //   )
  // }
  // else if (connector === fortmatic) {
  //   return (
  //     <IconWrapper size={16}>
  //       <img src={FortmaticIcon} alt={'Fortmatic'} />
  //     </IconWrapper>
  //   )
  // } else if (connector === portis) {
  //   return (
  //     <IconWrapper size={16}>
  //       <img src={PortisIcon} alt={'Portis'} />
  //     </IconWrapper>
  //   )
  // }
  return null
}

function Web3StatusInner() {
  const { account, connector, error } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length
  const hasSocks = useHasSocks()
  const toggleWalletModal = useWalletModalToggle()

  const connectWallet = () => {
    const { ym } = window
    ym(84960586, 'reachGoal', 'headerConnectWalletClicked')
    toggleWalletModal()
  }

  if (account) {
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        {hasPendingTransactions ? (
          <RowBetween>
            <Text>
              <Trans>{pending?.length} Pending</Trans>
            </Text>{' '}
            <Loader stroke="white" />
          </RowBetween>
        ) : (
          <>
            {hasSocks ? <Sock /> : null}
            <Text>{ENSName || shortenAddress(account)}</Text>
          </>
        )}
        {!hasPendingTransactions && connector && <StatusIcon connector={connector} />}
      </Web3StatusConnected>
    )
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>{error instanceof UnsupportedChainIdError ? <Trans>Wrong Network</Trans> : <Trans>Error</Trans>}</Text>
      </Web3StatusError>
    )
  } else if (!isMobile) {
    return (
      <Web3StatusConnect id="connect-wallet" onClick={connectWallet} faded={!account}>
        <Text style={{ fontWeight: 600 }}>
          <Trans>Connect Wallet</Trans>
        </Text>
      </Web3StatusConnect>
    )
  }
  return null
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
