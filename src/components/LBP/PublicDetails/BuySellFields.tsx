import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { TYPE } from 'theme'
import { PinnedContentButton } from 'components/Button'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyAmount } from '@ixswap1/sdk-core'
import { ethers, constants } from 'ethers'
import { useLBPContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useGetLBPAuthorization } from 'state/lbp/hooks'

interface BuySellFieldsProps {
  activeTab: string
  slippage: string
  tokenBalance: string
  assetTokenAddress: string
  contractAddress?: string
  tokenDecimals?: number
  shareBalance?: any
  tokenOptions?: TokenOption
}
interface TokenOption {
  value: string
  tokenAddress: string
  tokenDecimals: number
  tokenSymbol: string
  logo: string
}

interface BuySellFieldsInputProps {
  assetExceedsBalance?: boolean
}

export default function BuySellFields({
  activeTab,
  tokenBalance,
  assetTokenAddress,
  contractAddress,
  shareBalance,
  tokenOptions,
}: BuySellFieldsProps) {
  const [shareValue, setShareValue] = useState('')
  const [assetValue, setAssetValue] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const tokenCurrency = useCurrency(assetTokenAddress)
  const [buttonText, setButtonText] = useState('Approve')
  const [authorization, setAuthorization] = useState<any>()
  const { account } = useActiveWeb3React()
  const contractAddressValue = contractAddress !== undefined ? contractAddress : ''
  const getLBPAuthorization = useGetLBPAuthorization()
  const [approval, approveCallback] = useApproveCallback(
    tokenCurrency
      ? CurrencyAmount.fromRawAmount(
          tokenCurrency,
          ethers.utils.parseUnits(assetValue || '0', tokenOptions?.tokenDecimals) as any
        )
      : undefined,
    contractAddressValue
  )
  const assetExceedsBalance = parseFloat(assetValue) > parseFloat(tokenBalance)
  const lbpContractInstance = useLBPContract(contractAddress ?? '')
  const parseUnit = (amount: number, decimals: number): ethers.BigNumber => {
    return ethers.utils.parseUnits(amount.toString(), decimals)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorization = await getLBPAuthorization()
        setAuthorization(authorization)
        if (shareValue.trim() !== '' && assetValue.trim() !== '') {
          setButtonDisabled(false)
        } else {
          setButtonDisabled(true)
        }
      } catch (error) {
        console.error('Error fetching authorization:', error)
      }
    }

    fetchData()
  }, [shareValue, assetValue])

  // const handleShareInputChange = async (event: any) => {
  //   const inputValue = event.target.value
  //   setShareValue(inputValue)
  //   console.log(lbpContractInstance, 'test')
  // }

  // const handleAssetInputChange = (event: any) => {
  //   const inputValue = event.target.value
  //   setAssetValue(inputValue)
  // }

  const handleInputChange = async (event: any, inputType: 'share' | 'asset') => {
    const inputValue = event.target.value
    const setValue = inputType === 'share' ? setShareValue : setAssetValue
    const oppositeValue = inputType === 'share' ? setAssetValue : setShareValue

    setValue(inputValue)

    if (inputValue !== '' && lbpContractInstance) {
      const amount = parseFloat(inputValue)

      try {
        let result
        if (activeTab === 'buy') {
          if (inputType === 'share') {
            result = await buyExactShares(amount)
          } else {
            result = await buyExactAssetsForShares(amount)
          }
        } else {
          if (inputType === 'share') {
            result = await sellExactSharesForAssets(amount)
          } else {
            result = await sellExactAssets(amount)
          }
        }
        oppositeValue(result)
      } catch (error) {
        console.error('Error occurred:', error)
      }
    } else {
      oppositeValue('')
    }
  }

  const buyExactShares = async (shareAmount: number): Promise<string> => {
    if (!lbpContractInstance) return ''
    const maxAssetsIn = ethers.constants.MaxUint256
    const recipient = account
    const referrer = constants.AddressZero

    const authData = authorization

    const assetAmount = await lbpContractInstance?.swapAssetsForExactShares(
      parseUnit(shareAmount, 18), // Convert share amount to smallest denomination
      maxAssetsIn,
      recipient,
      referrer,
      authData
    )
    return assetAmount.toString()
  }

  const buyExactAssetsForShares = async (assetAmount: number): Promise<string> => {
    if (!lbpContractInstance) return ''
    const minSharesOut = 0
    const recipient = account
    const referrer = constants.AddressZero
    const authData = authorization
    const shareAmount = await lbpContractInstance.swapExactAssetsForShares(
      parseUnit(assetAmount, tokenOptions?.tokenDecimals || 18), // Convert asset amount to smallest denomination
      minSharesOut,
      recipient,
      referrer,
      authData
    )

    return shareAmount.toString()
  }

  const sellExactSharesForAssets = async (shareAmount: number): Promise<string> => {
    if (!lbpContractInstance) return ''
    const minAssetsOut = 0
    const recipient = account
    const authData = authorization
    const assetAmount = await lbpContractInstance.swapExactSharesForAssets(
      parseUnit(shareAmount, 18),
      minAssetsOut,
      recipient,
      authData
    )

    return assetAmount.toString()
  }

  const sellExactAssets = async (assetAmount: number): Promise<string> => {
    if (!lbpContractInstance) return ''
    const maxSharesIn = ethers.constants.MaxUint256
    const recipient = account
    const authData = authorization
    const shareAmount = await lbpContractInstance.swapSharesForExactAssets(
      parseUnit(assetAmount, tokenOptions?.tokenDecimals || 18),
      maxSharesIn,
      recipient,
      authData
    )

    return shareAmount.toString()
  }

  const handleButtonClick = async () => {
    console.log(approval)
    if (approval === 'APPROVED') {
      console.log('Buying...')
      setButtonText('Buy')
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
      setButtonText('Approving..')
      try {
        await approveCallback()
        console.log('Approval successful')
        setButtonText('Buy')
        setButtonDisabled(false)
      } catch (error) {
        console.error('Approval failed', error)
        setButtonDisabled(false)
        setButtonText('Approve')
      }
    }
  }

  return (
    <>
      {/* Share section */}
      <BuySellFieldsContainer>
        <BuySellFieldsItem>
          <BuySellFieldsWrapper>
            <BuySellFieldsSpan style={{ padding: '10px 10px', cursor: 'pointer' }}>Share</BuySellFieldsSpan>
          </BuySellFieldsWrapper>
          <BuySellFieldsInput
            type="text"
            placeholder="0.00"
            name="ShareInput"
            value={shareValue}
            onChange={(event) => handleInputChange(event, 'share')}
          />
        </BuySellFieldsItem>
        <BuySellFieldsItem>
          <BuySellFieldsSelect>
            <Serenity />
            <TYPE.body4 fontSize={'14px'}> Serenity</TYPE.body4>
          </BuySellFieldsSelect>
          <BuySellFieldsSpanBal>
            Balance: <b style={{ color: '#292933' }}>{shareBalance}</b>
          </BuySellFieldsSpanBal>
        </BuySellFieldsItem>
      </BuySellFieldsContainer>

      {/* Asset section */}
      <BuySellFieldsContainer assetExceedsBalance={assetExceedsBalance}>
        <BuySellFieldsItem>
          <BuySellFieldsWrapper>
            <BuySellFieldsSpan style={{ padding: '10px 10px', cursor: 'pointer' }}>Asset</BuySellFieldsSpan>
          </BuySellFieldsWrapper>
          <BuySellFieldsInput
            type="text"
            placeholder="0.00"
            name="assetInput"
            value={assetValue}
            onChange={(event) => handleInputChange(event, 'asset')}
            assetExceedsBalance={assetExceedsBalance}
          />
          {assetExceedsBalance && <TYPE.description3 color={'#FF6161'}>Insufficient balance</TYPE.description3>}
        </BuySellFieldsItem>
        <BuySellFieldsItem>
          <BuySellFieldsSelect>
            <img src={tokenOptions?.logo} />
            {/* <USDC /> */}
            <TYPE.body4 fontSize={'14px'}> {tokenOptions?.tokenSymbol}</TYPE.body4>
          </BuySellFieldsSelect>
          <BuySellFieldsSpanBal>
            Balance: <b style={{ color: '#292933' }}>{tokenBalance ? tokenBalance : 'Loding..'} </b>
          </BuySellFieldsSpanBal>
        </BuySellFieldsItem>
      </BuySellFieldsContainer>

      <TabRow>
        <SlippageWrapper>
          <TYPE.body3>Fees: </TYPE.body3>
          <TYPE.body3 color={'#292933'} fontWeight={'700'}>
            0.5%
          </TYPE.body3>
        </SlippageWrapper>
        <SlippageWrapper>
          <TYPE.body3>Price Impact: </TYPE.body3>
          <TYPE.body3 color={'#292933'} fontWeight={'700'}>
            0.5%
          </TYPE.body3>
        </SlippageWrapper>
      </TabRow>

      <TabRow style={{ marginTop: '20px' }}>
        {activeTab === 'buy' ? (
          <PinnedContentButton onClick={handleButtonClick} disabled={buttonDisabled || assetExceedsBalance}>
            {approval === 'APPROVED' ? 'Buy' : buttonText}
          </PinnedContentButton>
        ) : (
          <PinnedContentButton style={{ backgroundColor: buttonDisabled ? '' : '#FF6161' }} disabled={buttonDisabled}>
            Sell
          </PinnedContentButton>
        )}
      </TabRow>
      {/* hide for now
      <TabRow style={{padding: '10px 40px', textAlign: 'center'}}><TYPE.title10 color={'#FF6161'}>Price change exceeds slippage tolerance. Adjust and retry.</TYPE.title10> </TabRow> */}

      <AddWalletText>Add Asset to Wallet</AddWalletText>
    </>
  )
}

const BuySellFieldsWrapper = styled.div`
  text-align: left;
  margin-right: 60px;
`

const BuySellFieldsContainer = styled.div<BuySellFieldsInputProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ assetExceedsBalance }) => (assetExceedsBalance ? '#FF6161' : '#e6e6ff')};
  background: #f7f7fa;
  padding: 12px 18px 0px 18px;
  margin-bottom: 20px;
`

const BuySellFieldsItem = styled.div`
  margin-bottom: 8px;
`

const BuySellFieldsSelect = styled.div`
  flex: 1;
  display: flex;
  border: none;
  padding: 8px;
  margin-right: 8px;
  background: #ffffffff;
  align-items: center;
  gap: 4px;
`

const BuySellFieldsSpan = styled.span`
  color: #8f8fb2;
  font-size: 12px;

  text-align: left;

  width: fit-content;
  margin: 0 auto;
`

const BuySellFieldsSpanBal = styled.span`
  display: flex;
  color: #8f8fb2;
  font-size: 12px;
  padding: 8px;
  margin-top: 8px;
  gap: 3px;
`

const BuySellFieldsInput = styled.input<BuySellFieldsInputProps>`
  border: none;
  padding: 8px;
  text-align: left;
  background: none;
  font-size: 32px;
  font-weight: 700;
  color: ${({ assetExceedsBalance }) => (assetExceedsBalance ? '#FF6161' : '#292933')};
  max-width: 210px;
  width: auto;
  margin-bottom: 10px;
  outline: none;

  &::placeholder {
    font-size: 32px;
    color: #bdbddb;
    font-weight: 700;
  }

  &:focus {
    border: none;
    outline: none;
    border-color: transparent;
  }
`

const TabRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const SlippageWrapper = styled.div`
  display: flex;
  gap: 5px;
`

const AddWalletText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #6666ff;
  margin-top: 16px;
`
