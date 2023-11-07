import React, { useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken } from 'polished'
import { Activity } from 'react-feather'
import styled, { css } from 'styled-components'

// import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
// import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
// import PortisIcon from '../../assets/images/portisIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { injected, walletconnect } from '../../connectors'
import { NetworkContextName } from '../../constants/misc'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import { ButtonSecondary, PinnedContentButton } from '../Button'
import Identicon from '../Identicon'
import Loader from '../Loader'
import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'
import { IXSBalance } from 'components/Header/IXSBalance'
import { useETHBalances } from 'state/wallet/hooks'
import { useNativeCurrency } from 'hooks/useNativeCurrencyName'
import { formatAmount } from 'utils/formatCurrencyAmount'

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
  padding: 8px 18px;
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
  padding: 0px 18px;

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.bgG1};
      color: ${({ theme }) => theme.text1};
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background: ${({ theme }) => theme.config.text?.main || theme.bg25};
  opacity: ${({ pending }) => (pending ? '0.7' : '1')};
  padding: 10px 5px 10px 10px;
  color: ${({ theme }) => theme.black};
  // font-weight: 600;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #e6e6ff;

  ${({ theme }) => theme.mediaWidth.upToMedium`
     padding: 8px 3px 8px 20px;
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

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
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

const BalanceText = styled(Text)`
  // background: ${({ theme }) => theme.bgG2};
  color: ${({ theme }) => theme.text2};
  font-weight: 600;
  font-size: 12px;
  opacity: ${({ theme }) => (theme.config.background ? '1' : '0.5')};
  border-radius: 0 0 40px 40px;
  padding: 0 18px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
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

function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return <Identicon />
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={'WalletConnect'} />
      </IconWrapper>
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
      </Web3StatusConnected>
    )
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text style={{ margin: '4px 0px 4px 13px' }}>
          {error instanceof UnsupportedChainIdError ? <Trans>Wrong Network</Trans> : <Trans>Error</Trans>}
        </Text>
      </Web3StatusError>
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
  // return null
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
