import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useWeb3React } from 'hooks/useWeb3React'

import { AutoColumn, ColumnCenter } from 'components/Column'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import { ReactComponent as PausedButtonIcon } from '../../../assets/images/paused.svg'
import { Line } from 'components/Line'
import { LbpFormValues } from '../types'
import { useLBPContract } from 'hooks/useContract'
import { formatNumberWithDecimals } from 'state/lbp/hooks'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useCurrency } from 'hooks/Tokens'

interface SideBarPausedProps {
  shareLogo: any
  shareName: string
  lbpData: LbpFormValues | null
}

const SideBarPaused: React.FC<SideBarPausedProps> = ({ shareName, lbpData, shareLogo }) => {
  const { account, chainId } = useWeb3React()
  const lbp = useLBPContract(lbpData?.contractAddress ?? '')
  const shareCurrency = useCurrency((lbpData?.shareAddress as any) ?? null)
  const addShareTokenToMetamask = useAddTokenToMetamask(shareCurrency as any)

  const [shareBalance, setShareBalance] = useState<string | null>(null)

  useEffect(() => {
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

    fetchShareBalance()
  }, [account, lbpData, chainId])

  console.log(shareName)
  return (
    <SideBarContainer>
      <MiddleSection>
        <AutoColumn justify="center">
          <PauseButton>
            <PausedButtonIcon />
          </PauseButton>
          <PauseText>Paused</PauseText>
        </AutoColumn>
        <Line />
      </MiddleSection>

      <Container>
        <Body>
          <ShareWrapper>
            <TYPE.description2 color={'#8F8FB2'}>Project Token Balance:</TYPE.description2>
            <ShareTokenWrapper>
              <img style={{ borderRadius: '100%' }} width="25px" height="25px" src={shareLogo?.public} />
              <TYPE.label style={{ inlineSize: 'max-content', alignSelf: 'center' }} fontSize={'14px'}>
                {shareName}
              </TYPE.label>
            </ShareTokenWrapper>
          </ShareWrapper>
          <ShareWrapper>
            <TYPE.description7 style={{ margin: '0px', lineHeight: '1px' }} color={'#292933'}>
              {shareBalance ? formatNumberWithDecimals(shareBalance as string, 3) : '0.0'}
            </TYPE.description7>
          </ShareWrapper>
        </Body>
      </Container>

      <Line />

      <MiddleSection>
        <AddWalletText onClick={() => !addShareTokenToMetamask.success && addShareTokenToMetamask.addToken()}>
          Add Project Token to Wallet
        </AddWalletText>
      </MiddleSection>
    </SideBarContainer>
  )
}

export default SideBarPaused

const ShareWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 15px;
`

const ShareTokenWrapper = styled.div`
  border: 1px solid #e6e6ff;
  padding: 10px 18px;
  display: flex;
  gap: 5px;
  border-radius: 6px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 8px;
  }
`

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

const AddWalletText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #6666ff;
  margin-top: 16px;
  cursor: pointer;
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

const PauseButton = styled.div`
  border: 1px solid #ffa80033;
  background: #fff6e5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`

const PauseText = styled.div`
  color: #292933;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 26px */
  letter-spacing: -0.6px;
  margin-top: 16px;
  margin-bottom: 24px;
`

const Container = styled.article`
  font-family: ${(props) => props.theme.launchpad.font};
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
