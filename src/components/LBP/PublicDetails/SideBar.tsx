import React, { useState, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { MEDIA_WIDTHS, TYPE } from 'theme'
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
import { useWeb3React } from 'hooks/useWeb3React'
import { LbpFormValues } from '../types'
import { TokenOptions } from 'pages/LBP/components/Tokenomics'
import { ethers } from 'ethers'
import { useLBPContract, useTokenContract } from 'hooks/useContract'
import Remaining from './Remaining'
import { isMobile } from 'react-device-detect'
import { checkWrongChain } from 'utils/chains'

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
  isPausedSideBar?: boolean
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

const SideBar: React.FC<SideBarProps> = ({ lbpData, isPausedSideBar }) => {
  const { account, chainId } = useWeb3React()
  const lbp = useLBPContract(lbpData?.contractAddress ?? '')
  const assetTokenContract = useTokenContract(lbpData?.assetTokenAddress ?? '')
  const [activeTab, setActiveTab] = React.useState<PublicDetails>(PublicDetails.buy)
  const [open, setOpen] = React.useState(false)

  const [clickedButton, setClickedButton] = useState<any>(null)
  const [slippage, setSlippage] = useState<any>('1.0')
  const [isPaused, setIsPaused] = useState(isPausedSideBar)
  const [isBlurred, setIsBlurred] = useState(isPausedSideBar)
  const [tokenBalance, setTokenBalance] = useState('')
  const [tokenDecimals, setTokenDecimals] = useState(0)
  const [shareBalance, setShareBalance] = useState<string | null>(null)
  const [tokenOption, setTokenOption] = useState<any | null>(null)

  const network = lbpData?.network ?? ''
  const { isWrongChain } = checkWrongChain(chainId, network)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const fetchShareBalance = async () => {
    try {
      if (lbp && account) {
        const balance = await lbp.purchasedShares(account)
        // Decimals are hardcoded for now. We need to change it to retrieve the token's decimal value using the ERC20.decimals RPC call
        const parsedBalance = ethers?.utils?.formatUnits(balance, 18)
        setShareBalance(parsedBalance)
      } else {
        console.error('LBP contract or account not available')
      }
    } catch (error) {
      console.error('Error fetching share balance:', error)
    }
  }

  const fetchData = async () => {
    try {
      if (!assetTokenContract || !account) return
      const balance = await assetTokenContract.balanceOf(account)

      await fetchShareBalance()

      if (balance !== undefined) {
        const tokenOption = TokenOptions(chainId as number).find(
          (option) => option.tokenAddress === lbpData?.assetTokenAddress
        )

        const exactBalance = ethers.utils.formatUnits(balance, tokenOption?.tokenDecimals ?? 18)
        setTokenBalance(exactBalance)

        setTokenDecimals(tokenOption?.tokenDecimals || 0)
        setTokenOption(tokenOption)
      }
    } catch (error) {
      console.error('Error fetching share balance:', error)
    }
  }

  useEffect(() => {
    if (!isWrongChain) {
      fetchData()
    }
  }, [assetTokenContract, account, lbpData, chainId, isWrongChain])

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
    // setIsPaused((prev) => !prev)
    // setIsBlurred((prev) => !prev)
  }

  return (
    <SideBarContainer>
      <MiddleSection>
        <AutoColumn justify="center">
          <Remaining lbpData={lbpData} />

          <ContentColumn style={{ gridColumn: '9 / span 4' }}>
            {!isPaused ? (
              <LiveButton onClick={togglePaused}>
                <PlayButtonIcon style={{ position: 'absolute', left: isMobile ? '18%' : '24%', top: '31%' }} />
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
          {/* <NoTokenSidebar/> Hiding for now will render conditionals. */}
          {!isWrongChain ? (
            <BuySellFields
              allowSlippage={lbpData?.allowSlippage || false}
              tokenDecimals={tokenDecimals}
              contractAddress={lbpData?.contractAddress}
              assetTokenAddress={lbpData?.assetTokenAddress}
              shareTokenAddress={lbpData?.shareAddress}
              tokenBalance={tokenBalance}
              activeTab={activeTab}
              slippage={slippage}
              shareBalance={shareBalance}
              tokenOption={tokenOption}
              id={lbpData?.id}
              logo={lbpData?.logo}
              fetchBalance={fetchData}
            />
          ) : null}
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

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    left: 50%;
    width: 300px;
  }
`
