import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { useAccount } from 'wagmi'

import settingIcon from 'assets/images/dex-v2/setting.svg'
import chainIcon from 'assets/images/dex-v2/chain.svg'
import SwapPair from './SwapPair'
import { ButtonPrimary } from '../../common'
import SwapSettingsModal from './SwapSettingsModal'
import SwapDetail from './SwapDetail'
import useSwapping from 'state/dexV2/swap/useSwapping'
import { useSwapState } from 'state/dexV2/swap/useSwapState'

const SwapCard: React.FC = () => {
  const [isOpenSwapSettings, setOpenSwapSettings] = useState(false)
  const [exactIn, setExactIn] = useState(true)

  const {
    tokenInAddress,
    tokenOutAddress,
    tokenInAmount,
    tokenOutAmount,
    setTokenInAddress,
    setTokenOutAddress,
    setTokenInAmount,
    setTokenOutAmount,
    setInitialized,
  } = useSwapState();
  const { address: account } = useAccount()
  const swapping = useSwapping(
    exactIn,
    tokenInAddress,
    tokenInAmount,
    tokenOutAddress,
    tokenOutAmount,
    setTokenInAmount,
    setTokenOutAmount,
  );




  return (
    <Container>
      <Flex justifyContent="space-between" alignItems="center">
        <Title>Swap</Title>

        <Flex alignItems="center">
          <Flex alignItems="center">
            <img src={chainIcon} alt="Settings" />
          </Flex>
          <HorizontalLine />
          <PercentText>0.05%</PercentText>
          <Flex alignItems="center" css={{ cursor: 'pointer' }} onClick={() => setOpenSwapSettings(true)}>
            <img src={settingIcon} alt="Settings" />
          </Flex>
        </Flex>

        {isOpenSwapSettings ? <SwapSettingsModal onClose={() => setOpenSwapSettings(false)} /> : null}
      </Flex>

      <SwapPair />

      <SwapDetail />

      <div>{account ? <ButtonPrimary>Next</ButtonPrimary> : <ButtonPrimary>Connect Wallet</ButtonPrimary>}</div>
    </Container>
  )
}

export default SwapCard

const Container = styled.div`
  width: 480px;
  margin: 0 auto;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 30px 48px 0px rgba(63, 63, 132, 0.05);
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 200px;
  margin-bottom: 200px;
`

const Title = styled.div`
  color: rgba(41, 41, 51, 0.9);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.6px;
`

const PercentText = styled.div`
  color: #b8b8cc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.42px;
  margin-right: 4px;
`

const HorizontalLine = styled.div`
  border: 1px solid #e6e6ff;
  height: 18px;
  margin-right: 16px;
  margin-left: 16px;
`
