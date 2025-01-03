import React, { useEffect, useState } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

import TokenInput from './TokenInput'
import SwapIcon from 'assets/images/dex-v2/swap.svg'
import { emptyToken, UseSwapping } from 'state/dexV2/swap/useSwapping'
import useNumbers from 'hooks/dex-v2/useNumbers'
import { useTokens } from 'state/dexV2/tokens/hooks/useTokens'

type Props = {
  tokenInAmount: string
  tokenInAddress: string
  tokenOutAmount: string
  tokenOutAddress: string
  exactIn: boolean
  priceImpact?: number
  effectivePriceMessage?: UseSwapping['effectivePriceMessage']
  swapLoading?: boolean
  amountChange: () => void
  setTokenInAmount: (amount: string) => void
  setTokenOutAmount: (amount: string) => void
  setTokenInAddress: (address: string) => void
  setTokenOutAddress: (address: string) => void
  setExactIn: (exactIn: boolean) => void
}

const SwapPair: React.FC<Props> = ({
  tokenInAmount,
  tokenInAddress,
  tokenOutAmount,
  tokenOutAddress,
  exactIn,
  priceImpact,
  effectivePriceMessage,
  swapLoading,
  amountChange,
  setExactIn,
  setTokenInAmount,
  setTokenOutAmount,
  setTokenInAddress,
  setTokenOutAddress,
}) => {
  const { fNum } = useNumbers()
  const { getToken } = useTokens()

  const [_tokenInAmount, setLocalTokenInAmount] = useState('')
  const [_tokenOutAmount, setLocalTokenOutAmount] = useState('')
  const [_tokenInAddress, setLocalTokenInAddress] = useState('')
  const [_tokenOutAddress, setLocalTokenOutAddress] = useState('')
  const [isInRate, setIsInRate] = useState(true)
  const [typingTimeout, setTypingTimeout] = useState<any>(undefined)

  const missingToken = !_tokenInAddress || !_tokenOutAddress
  const missingAmount = !_tokenInAmount || !_tokenOutAmount

  const tokenIn = _tokenInAddress ? getToken(_tokenInAddress) : emptyToken
  const tokenOut = _tokenOutAddress ? getToken(_tokenOutAddress) : emptyToken

  function preventUpdatesOnTyping(callback: () => void) {
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
    }
    typingTimeout.value = setTimeout(() => {
      callback()
    }, 300)
  }

  function handleInAmountChange(value: string): void {
    setTokenInAmount(value)
    preventUpdatesOnTyping(() => {
      amountChange()
    })
  }

  function handleOutAmountChange(value: string): void {
    setTokenOutAmount(value)
    preventUpdatesOnTyping(() => {
      amountChange()
    })
  }

  function handleTokenSwitch(): void {
    setExactIn(!exactIn)
    setTokenInAmount(_tokenOutAmount)
    setTokenInAddress(_tokenOutAddress)
    setTokenOutAmount(_tokenInAmount)
    setTokenOutAddress(_tokenInAddress)
    amountChange()
  }

  async function handleInputTokenChange(newTokenIn: string) {
    if (newTokenIn === _tokenOutAddress) {
      handleTokenSwitch()
      return
    }
    setTokenInAddress(newTokenIn)
  }

  async function handleOutputTokenChange(newTokenOut: string) {
    if (newTokenOut === _tokenInAddress) {
      handleTokenSwitch()
      return
    }
    setTokenOutAddress(newTokenOut)
  }

  useEffect(() => {
    setLocalTokenInAmount(tokenInAmount)
    setLocalTokenOutAmount(tokenOutAmount)
    setLocalTokenInAddress(tokenInAddress)
    setLocalTokenOutAddress(tokenOutAddress)
  }, [tokenInAmount, tokenOutAmount, tokenInAddress, tokenOutAddress])

  useEffect(() => {
    // populates initial tokenOutAmount
    if (tokenOutAmount) {
      handleOutAmountChange(tokenOutAmount)
    }
  }, [])

  return (
    <Container>
      <div>
        <TokenInput />
      </div>
      <SwapIconWrapper>
        <img src={SwapIcon} alt="Swap" />
      </SwapIconWrapper>
      <Box mt={24}>
        <TokenInput />
      </Box>
    </Container>
  )
}

export default SwapPair

const Container = styled.div`
  position: relative;
`

const SwapIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 64px 0px rgba(102, 102, 255, 0.1);
  cursor: pointer;
`
