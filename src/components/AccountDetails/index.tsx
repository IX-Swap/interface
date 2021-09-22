import { Trans } from '@lingui/macro'
import React, { useCallback, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from 'rebass'
import { ThemeContext } from 'styled-components'
// import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import { ReactComponent as ExternalBright } from '../../assets/images/external-bright.svg'
// import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
// import PortisIcon from '../../assets/images/portisIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { injected, walletconnect } from '../../connectors'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import { useActiveWeb3React } from '../../hooks/web3'
import { AppDispatch } from '../../state'
import { clearAllTransactions } from '../../state/transactions/actions'
import { LinkStyledButton, TYPE } from '../../theme'
import { shortenAddress } from '../../utils'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import Identicon from '../Identicon'
import Row, { AutoRow } from '../Row'
import Copy from './Copy'
import {
  AccountControl,
  AccountGroupingRow,
  AccountSection,
  AddressLink,
  CloseColor,
  CloseIcon,
  HeaderRow,
  IconWrapper,
  IconWrapperWithBg,
  InfoCard,
  LowerSection,
  // MainWalletAction,
  TransactionListWrapper,
  UpperSection,
  WalletAction,
  YourAccount,
} from './styleds'
import Transaction from './Transaction'

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </TransactionListWrapper>
  )
}

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch<AppDispatch>()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return (
      <Box style={{ opacity: 0.7, display: 'flex' }}>
        <TYPE.description2>
          <Trans>Connected with {name}</Trans>
        </TYPE.description2>
      </Box>
    )
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={33}>
          <Identicon size={33} />
        </IconWrapper>
      )
    } else if (connector === walletconnect) {
      return (
        <IconWrapper size={33}>
          <img src={WalletConnectIcon} alt={'WalletConnect logo'} />
        </IconWrapper>
      )
    }
    // else if (connector === walletlink) {
    //   return (
    //     <IconWrapper size={33}>
    //       <img src={CoinbaseWalletIcon} alt={'Coinbase Wallet logo'} />
    //     </IconWrapper>
    //   )
    // } else if (connector === fortmatic) {
    //   return (
    //     <IconWrapper size={33}>
    //       <img src={FortmaticIcon} alt={'Fortmatic logo'} />
    //     </IconWrapper>
    //   )
    // } else if (connector === portis) {
    //   return (
    //     <>
    //       <IconWrapper size={33}>
    //         <img src={PortisIcon} alt={'Portis logo'} />
    //         <MainWalletAction
    //           onClick={() => {
    //             portis.portis.showPortis()
    //           }}
    //         >
    //           <Trans>Show Portis</Trans>
    //         </MainWalletAction>
    //       </IconWrapper>
    //     </>
    //   )
    // }
    return null
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <>
      <UpperSection>
        <HeaderRow>
          <TYPE.title5>
            <Trans>Account</Trans>
          </TYPE.title5>
          <CloseIcon onClick={toggleWalletModal}>
            <CloseColor />
          </CloseIcon>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {connector !== injected && (
                    <WalletAction
                      style={{ fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }}
                      onClick={() => {
                        ;(connector as any).close()
                      }}
                    >
                      <Trans>Disconnect</Trans>
                    </WalletAction>
                  )}
                  {/* TODO: uncomment when we have more options */}
                  {/* reimport open options*/}
                  {/* <WalletAction
                    style={{ fontSize: '.825rem', fontWeight: 400 }}
                    onClick={() => {
                      openOptions()
                    }}
                  >
                    <Trans>Change</Trans>
                  </WalletAction> */}
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <>
                  <Row style={{ gap: '4px' }}>
                    {getStatusIcon()}
                    <TYPE.title5> {ENSName ?? (account && shortenAddress(account))}</TYPE.title5>
                  </Row>
                </>
              </AccountGroupingRow>
              <AccountGroupingRow>
                <AccountControl>
                  <>
                    {chainId && account && (
                      <AddressLink
                        hasENS={!!ENSName}
                        isENS={!!ENSName}
                        href={getExplorerLink(chainId, ENSName ?? account, ExplorerDataType.ADDRESS)}
                      >
                        <IconWrapperWithBg size={8}>
                          <ExternalBright />
                        </IconWrapperWithBg>
                        <TYPE.description2 style={{ marginLeft: '4px' }}>
                          <Trans>View on Explorer</Trans>
                        </TYPE.description2>
                      </AddressLink>
                    )}
                    {account && (
                      <Copy toCopy={account}>
                        <TYPE.description2 style={{ marginLeft: '4px' }}>
                          <Trans>Copy Address</Trans>
                        </TYPE.description2>
                      </Copy>
                    )}
                  </>
                </AccountControl>
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between', textTransform: 'uppercase' }}>
            <TYPE.title6>
              <Trans>Recent Transactions</Trans>
            </TYPE.title6>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>
              <TYPE.description2>
                <Trans>Clear all</Trans>
              </TYPE.description2>
            </LinkStyledButton>
          </AutoRow>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <TYPE.body color={theme.text2}>
            <Trans>Your transactions will appear here...</Trans>
          </TYPE.body>
        </LowerSection>
      )}
    </>
  )
}
