import React, { useCallback, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { useDispatch } from 'react-redux'
import { Box } from 'rebass'
import styled, { useTheme } from 'styled-components'
// import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import { ReactComponent as ExternalBright } from '../../assets/images/external-bright.svg'
import { ReactComponent as NewExplore } from '../../assets/images/newExplore.svg'
// import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
// import PortisIcon from '../../assets/images/portisIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { metaMask } from '../../connectors/metaMask'
import { walletConnectV2 } from '../../connectors/walletConnectV2'
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
import { Line } from 'components/Line'
import Column from 'components/Column'
import { useGetMe } from 'state/user/hooks'

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
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const getMe = useGetMe()
  const fetchMe = useCallback(async () => {
    const result = await getMe()
    setReferralCode(result?.referralCode)
  }, [getMe, history])
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()

  useEffect(() => {
    fetchMe()
    const code = new URL(window.location.href).href?.split('=')[1]
  }, [])

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== metaMask || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return (
      <Box style={{ display: 'flex' }}>
        <TYPE.description3>{t`Connected with ${name}`}</TYPE.description3>
      </Box>
    )
  }

  function getStatusIcon() {
    if (connector === metaMask) {
      return (
        <IconWrapper size={33}>
          <Identicon size={33} />
        </IconWrapper>
      )
    } else if (connector === walletConnectV2) {
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

  // useEffect(() => {
  //   const code = new URL(window.location.href)?.href?.split('=')[1]
  //   setReferralCode(code)
  // }, [])
  return (
    <>
      <UpperSection>
        <HeaderRow>
          <TYPE.title7>{t`Account`}</TYPE.title7>
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
                  {connector !== metaMask && (
                    <WalletAction
                      style={{
                        fontSize: '13px',
                        color: '#666680',
                        fontWeight: 400,
                        marginRight: '8px',
                        marginBottom: '12px',
                      }}
                      onClick={() => {
                        ;(connector as any).close()
                      }}
                    >
                      {t`Disconnect`}
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
                  <Row style={{ gap: '4px', border: '1px solid #e6e6ff', padding: '16px 10px' }}>
                    {getStatusIcon()}
                    <TYPE.title10 fontSize="13px"> {ENSName ?? (account && shortenAddress(account))}</TYPE.title10>
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
                        {/* <IconWrapperWithBg size={8}> */}
                        <NewExplore style={{ marginTop: '5px' }} />
                        {/* </IconWrapperWithBg> */}
                        <TYPE.description3
                          style={{ marginLeft: '4px', marginRight: '10px', fontSize: '11px' }}
                        >{t`View on Explorer`}</TYPE.description3>
                      </AddressLink>
                    )}
                    {account && (
                      <Copy toCopy={account}>
                        <TYPE.description3
                          style={{ marginLeft: '4px', fontSize: '11px' }}
                        >{t`Copy Address`}</TYPE.description3>
                      </Copy>
                    )}
                  </>
                </AccountControl>
              </AccountGroupingRow>

              {referralCode && (
                <>
                  <Column style={{ margin: '10px 0px' }}>
                    <TYPE.title11>Refer a Friend</TYPE.title11>
                  </Column>
                  <Column style={{ margin: '5px 0px' }}>
                    <StyledDiv>
                      <CenteredDiv>
                        <TitleSpan>{referralCode}</TitleSpan>
                      </CenteredDiv>
                      <FlexContainer>
                        <Copy
                          toCopy={`${new URL(window.location.href).href?.split('?')[0]}?referralCode=${referralCode}`}
                        >
                          <span style={{ margin: '0px', padding: '0px' }}> {t``}</span>
                        </Copy>
                        {/* <CopyIcon /> */}
                        <TextSpan>Copy Referral Link</TextSpan>
                      </FlexContainer>
                    </StyledDiv>
                  </Column>
                </>
              )}

              <Line style={{ marginTop: '10px' }} />
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>

      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between', textTransform: 'uppercase' }}>
            <TYPE.title7>{t`Recent Transactions`}</TYPE.title7>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>
              <TYPE.description2>{t`Clear all`}</TYPE.description2>
            </LinkStyledButton>
          </AutoRow>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <TYPE.description3 color={'#AFAFC1'}>
            <Trans>Your transactions will appear here...</Trans>
          </TYPE.description3>
        </LowerSection>
      )}
    </>
  )
}

const StyledDiv = styled.div`
  border: 1px solid #e6e6ff;
  padding: 10px 16px;
  width: 280px;
`

const CenteredDiv = styled.div`
  text-align: left;
  margin-bottom: 12px;
`

const TitleSpan = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #292933;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: left;
`

const TextSpan = styled.span`
  color: #666680;
  font-size: 11px;
  font-weight: 400;
  margin-left: 5px;
`
