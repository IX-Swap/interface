import React, { useState, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import { ReactComponent as PlayButtonIcon } from '../../../assets/images/playButton.svg'
import { ReactComponent as PausedButtonIcon } from '../../../assets/images/paused.svg'
import { ReactComponent as Settings } from '../../../assets/images/settingnew.svg'
import { Line } from 'components/Line'
import { PublicDetails } from 'components/LaunchpadIssuance/types'
import { text39 } from 'components/LaunchpadMisc/typography'
import BuySellFields from './BuySellFields'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { TextInput } from 'pages/KYC/common'
import { PinnedContentButton } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import { useSimpleTokenBalanceWithLoading } from 'state/wallet/hooks'
import { useCurrency } from 'hooks/Tokens'
import { LbpFormValues } from '../types'
import { TokenOptions } from 'pages/LBP/components/Tokenomics'
import { BigNumber, ethers } from 'ethers'
import { useLBPContract } from 'hooks/useContract'
import LBP_ABI from 'abis/LiquiidtyBoostrapPool.json'
const TabsData = [
  { title: 'BUY', value: PublicDetails.buy },
  { title: 'SELL', value: PublicDetails.sell },
]

interface TabProps {
  active: boolean
  currentTab: PublicDetails
}

interface SideTabsBarProps {
  currentTab: PublicDetails
  onTabSelect: (value: PublicDetails) => void
}

interface SideBarProps {
  lbpData: LbpFormValues | null
}

const TradeTabs: React.FC<SideTabsBarProps> = ({ currentTab, onTabSelect }) => {
  return (
    <TabContainer>
      {TabsData.map((tab) => (
        <Tab
          key={`PublicDetails-tab-${tab.value}`}
          active={currentTab === tab.value}
          currentTab={currentTab}
          onClick={() => onTabSelect(tab.value)}
        >
          {tab.title}
        </Tab>
      ))}
    </TabContainer>
  )
}

const SideBar: React.FC<SideBarProps> = ({ lbpData }) => {
  const [remainingTime, setRemainingTime] = useState(28 * 24 * 60 * 60)
  const [activeTab, setActiveTab] = React.useState<PublicDetails>(() => {
    const savedTab = localStorage.getItem('ActiveTab')
    return (savedTab as PublicDetails) ?? PublicDetails.buy
  })
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [clickedButton, setClickedButton] = useState<any>(null)
  const [slippage, setSlippage] = useState<any>('')
  const [isPaused, setIsPaused] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)
  const [tokenBalance, setTokenBalance] = useState('')
  const [tokenDecimals, setTokenDecimals] = useState(0)
  const { account , provider} = useActiveWeb3React()
  const [shareBalance, setShareBalance] = useState<string | null>(null)
  const [tokenOptions, setTokenOptions] = useState<any | null>(null)
  const lbp = useLBPContract(lbpData?.contractAddress ?? '')
  const inputCurrency = useCurrency(lbpData?.assetTokenAddress)
  const { amount: balance, loading: isBalanceLoading } = useSimpleTokenBalanceWithLoading(
    account,
    inputCurrency,
    lbpData?.assetTokenAddress
  )  

  const fetchShareBalance = async () => {
    try {
      if (lbp && account) {
        const balance = await lbp.purchasedShares(account);
        
        // Decimals are hardcoded for now. We need to change it to retrieve the token's decimal value using the ERC20.decimals RPC call
        const parsedBalance = ethers.utils.formatUnits(balance, 9); 
        setShareBalance(parsedBalance);
      } else {
        console.error('LBP contract or account not available');
      }
    } catch (error) {
      console.error('Error fetching share balance:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchShareBalance();
  
        if (balance !== undefined && !isBalanceLoading) {
          const exactBalance = balance.toExact() || '';
          setTokenBalance(exactBalance);
  
          const currentChainId = balance.currency?.chainId || 0;
          const tokenOption = TokenOptions(currentChainId).find(
            (option) => option.tokenSymbol === balance.currency?.symbol
          );
          setTokenDecimals(tokenOption?.tokenDecimals || 0);
          setTokenOptions(tokenOption);
        }
      } catch (error) {
        console.error('Error fetching share balance:', error);
      }
    };
  
    fetchData();
  }, [balance, isBalanceLoading, fetchShareBalance]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleTabChange = (tab: PublicDetails) => {
    setActiveTab(tab)
    localStorage.setItem('ActiveTab', tab)
    setClickedButton(null)
  }

  const handleButtonClick = (value: any) => {
    setSlippage(value)
    if (clickedButton === value) {
      setClickedButton(null)
    } else {
      setClickedButton(value)
    }
  }

  const togglePaused = () => {
    setIsPaused((prev) => !prev)
    setIsBlurred((prev) => !prev)
  }

  const remainingDays = Math.floor(remainingTime / (24 * 60 * 60))
  const remainingHours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60))


  return (
    <SideBarContainer>
      <MiddleSection>
        <AutoColumn justify="center">
          <ContentColumn style={{ gridColumn: '1 / span 1' }}>
            <TYPE.subHeader1 style={{ marginRight: 'auto', color: '#555566' }}> LBP closes in</TYPE.subHeader1>
            <TYPE.label style={{ fontSize: '16px', marginRight: 'auto' }}>
              {remainingDays > 0 ? `${remainingDays} Days` : `${remainingHours} Hours`}{' '}
            </TYPE.label>
          </ContentColumn>

          <ContentColumn style={{ gridColumn: '9 / span 4' }}>
            {!isPaused ? (
              <LiveButton onClick={togglePaused}>
                <PlayButtonIcon style={{ position: 'absolute', left: '24%', top: '31%' }} />
                <TYPE.subHeader1 style={{ color: '#1FBA66' }}>Live</TYPE.subHeader1>
              </LiveButton>
            ) : (
              <PauseButton onClick={togglePaused}>
                <PausedButtonIcon style={{ position: 'absolute', left: '21%', top: '31%' }} />
                <TYPE.subHeader1 style={{ color: '#FFA800' }}>Paused</TYPE.subHeader1>
              </PauseButton>
            )}
          </ContentColumn>
        </AutoColumn>
        <Line />
      </MiddleSection>

      <Container style={{ filter: isBlurred ? 'blur(5px)' : 'none', pointerEvents: isBlurred ? 'none' : 'auto' }}>
        <Header>
          <TabRow>
            <TradeTabs currentTab={activeTab} onTabSelect={handleTabChange} />
            <SlippageWrapper>
              <TYPE.body3>Slippage: </TYPE.body3>
              <TYPE.body3>{slippage}%</TYPE.body3>
              <Settings onClick={handleOpen} style={{ cursor: 'pointer' }} />
            </SlippageWrapper>
          </TabRow>
        </Header>
        <Body>
          <BuySellFields
            tokenDecimals={tokenDecimals}
            contractAddress={lbpData?.contractAddress}
            assetTokenAddress={lbpData?.assetTokenAddress}
            tokenBalance={tokenBalance}
            activeTab={activeTab}
            slippage={slippage}
            shareBalance={shareBalance}
            tokenOptions={tokenOptions}
          />
        </Body>
      </Container>

      <Modal
        BackdropProps={{ style: { backgroundColor: 'none', opacity: '0' } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <Box>
            <TYPE.body fontWeight={600}> Slippage</TYPE.body>
            <TextInput
              style={{ marginTop: '20px' }}
              name="slippage"
              value={slippage != null ? slippage.toString() : '0'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlippage(e.target.value)}
              placeholder="0.00%"
              id="slippage"
            />

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              {[0.25, 0.5, 0.75].map((value) => (
                <PinnedContentButton
                  key={value}
                  onClick={() => handleButtonClick(value)}
                  selected={clickedButton === value}
                  style={{
                    background: clickedButton !== value ? 'none' : '',
                    color: clickedButton !== value ? '#292933E5' : '',
                    border: clickedButton !== value ? '1px solid #E6E6FF' : '',
                  }}
                >
                  {value}%
                </PinnedContentButton>
              ))}
            </div>
          </Box>
        </ModalContainer>
      </Modal>
    </SideBarContainer>
  )
}

export default SideBar

const SideBarContainer = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  height: auto;
  padding: 20px;
  width: 400px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const MiddleSection = styled.div`
  margin: 20px 0;
  background: #ffffff;
`

const ContentColumn = styled(ColumnCenter)`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  @media (min-width: 768px) {
    & + & {
      margin-left: 20px;
    }
  }
`

const LiveButton = styled(ColumnCenter)`
  border: 1px solid #1fba6633;
  background: #e8f8ea;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  text-align: center;
  display: ruby;
  cursor: pointer;
`

const PauseButton = styled(ColumnCenter)`
  border: 1px solid #ffa80033;
  background: #fff6e5;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  text-align: center;
  display: ruby;
  cursor: pointer;
`

const TabContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  height: 100%;
`
const Tab = styled.div.attrs((props: TabProps) => ({
  currentTab: props.currentTab,
}))<TabProps>`
  display: grid;
  place-content: center;
  padding: 0.25rem 1rem;
  height: 100%;
  cursor: pointer;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text39}
  color: ${(props) =>
    props.active && props.currentTab === PublicDetails.buy
      ? '#1FBA66'
      : props.active && props.currentTab === PublicDetails.sell
      ? '#FF6161'
      : '#8F8FB2E5'};
  border-bottom: ${(props) =>
    props.active && props.currentTab === PublicDetails.buy
      ? '1px solid #1FBA66'
      : props.active && props.currentTab === PublicDetails.sell
      ? '1px solid #FF6161'
      : ''};
`

const Container = styled.article`
  font-family: ${(props) => props.theme.launchpad.font};
`

const Header = styled.header`
  height: 60px;
  border-radius: 6px;
`

const TabRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1320px;
  margin: auto;
  border-bottom: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
`

const Body = styled.main`
  display: flex;
  flex-flow: column nowrap;
  margin: 2rem 0rem;
`

const SlippageWrapper = styled.div`
  display: flex;
  gap: 5px;
`

const ModalContainer = styled.div`
  position: absolute;
  top: 52%;
  right: 0%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.white};
  border: none;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #e6e6ff;
  &:focus {
    outline: none;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); /* semi-transparent white */
  z-index: 10; /* ensure it's above the blurred content */
`
