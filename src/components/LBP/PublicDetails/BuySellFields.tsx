import { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { TYPE } from 'theme'
import { PinnedContentButton } from 'components/Button'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyAmount } from '@ixswap1/sdk-core'
import { ethers, constants } from 'ethers'
import { useLBPContract, useTokenContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useGetLBPAuthorization } from 'state/lbp/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import BuySellModal from './Modals/BuySellModal'

interface BuySellFieldsProps {
  activeTab: string
  slippage: string
  tokenBalance: string
  assetTokenAddress: string
  contractAddress?: string
  tokenDecimals?: number
  shareBalance?: any
  tokenOption?: TokenOption
  shareTokenAddress?: string
  id: any
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

enum InputType {
  None = '',
  Asset = 'asset',
  Share = 'share',
}

enum TradeAction {
  Buy = 'buy',
  Sell = 'sell',
}

const parseUnit = (amount: number, decimals: number): ethers.BigNumber => {
  return ethers.utils.parseUnits(amount.toString(), decimals)
}

export default function BuySellFields({
  activeTab,
  tokenBalance,
  assetTokenAddress,
  contractAddress,
  shareBalance,
  tokenOption,
  shareTokenAddress,
  id,
}: BuySellFieldsProps) {
  // UI States
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // const [buttonText, setButtonText] = useState('Approve')
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shareSymbol, setShareSymbol] = useState<any>('')
  const [shareValue, setShareValue] = useState('')
  const [assetValue, setAssetValue] = useState('')
  const [inputType, setInputType] = useState<InputType>(InputType.None)
  const [convertingState, setIsConvertingState] = useState({
    inputType: InputType.None,
    converting: false,
  })
  const [isExecuting, setIsExecuting] = useState(false)

  // Web3 States
  const lbpContractInstance = useLBPContract(contractAddress ?? '')
  const tokenCurrency = useCurrency(assetTokenAddress)
  const { account } = useActiveWeb3React()
  const getLBPAuthorization = useGetLBPAuthorization()
  const shareTokenContract = useTokenContract(shareTokenAddress ?? '')
  const [approval, approveCallback] = useApproveCallback(
    tokenCurrency
      ? CurrencyAmount.fromRawAmount(
          tokenCurrency,
          ethers.utils.parseUnits(assetValue || '0', tokenOption?.tokenDecimals) as any
        )
      : undefined,
    contractAddress || ''
  )
  const assetExceedsBalance = parseFloat(assetValue) > parseFloat(tokenBalance)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shareSymbol = await shareTokenContract?.symbol()
        setShareSymbol(shareSymbol)
        if (!id || !tokenBalance) return
        const isButtonDisabled = shareValue.trim() === '' || assetValue.trim() === ''
        setButtonDisabled(isButtonDisabled)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [shareValue, assetValue, id, tokenBalance, shareTokenContract])

  const handleOpenModal = (action: any) => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = async (event: any, inputType: InputType) => {
    const inputAmount = event.target.value

    const setValue = inputType === InputType.Share ? setShareValue : setAssetValue
    const setOpposite = inputType === InputType.Share ? setAssetValue : setShareValue

    setInputType(inputType)
    setValue(inputAmount)

    if (inputAmount !== '') {
      setIsConvertingState({
        inputType: inputType === InputType.Share ? InputType.Asset : InputType.Share,
        converting: true,
      })
      const converted = await handleConversion(
        inputType,
        inputAmount,
        inputType == 'share' ? 18 : 6,
        inputType == 'share' ? 6 : 18
      )
      setIsConvertingState((prevState) => {
        return {
          ...prevState,
          converting: false,
        }
      })
      setOpposite(formatNumberWithDecimal(converted, 4))
    } else {
      // Clear the opposite value if the input is cleared
      setOpposite('')
    }
  }

  const handleConversion = useCallback(
    async (
      inputType: InputType,
      inputAmount: number,
      inputDecimals: number,
      outputDecimals: number
    ): Promise<string> => {
      if (!lbpContractInstance) return ''

      const amount = parseUnit(inputAmount, inputDecimals)
      let method: any
      const action: TradeAction = activeTab as TradeAction
      switch (action) {
        case TradeAction.Buy:
          method = inputType === InputType.Asset ? 'previewSharesOut' : 'previewAssetsIn'
          break
        case TradeAction.Sell:
          method = inputType === InputType.Asset ? 'previewSharesIn' : 'previewAssetsOut'
          break
        default:
          break
      }

      if (method) {
        console.info('Converting amount:', amount.toString(), 'inputType', inputType, 'method:', method)
        const result = await lbpContractInstance[method](amount)
        const parsedAmount = ethers.utils.formatUnits(result.toString(), outputDecimals)
        return parsedAmount
      }

      return ''
    },
    [lbpContractInstance]
  )

  const trade = async (inputType: string, amount: number | string) => {
    try {
      setIsExecuting(true)
      const authorization = await getLBPAuthorization(id)

      const tradeFunctions = {
        buy: {
          share: buyExactShares,
          asset: buyExactAssetsForShares,
        },
        sell: {
          share: sellExactSharesForAssets,
          asset: sellExactAssets,
        },
      }

      const action = activeTab === 'buy' ? 'buy' : 'sell'
      const method = inputType === 'share' ? 'share' : 'asset'

      const tradeFunction = tradeFunctions[action][method]

      if (!tradeFunction) {
        console.error('Trade function not found')
        return
      }

      const tx: any = await tradeFunction(Number(amount), authorization)
      if (tx) {
        await tx.wait()
        setIsExecuting(false)
      }
    } catch (error) {
      console.error('Error executing trade:', error)
      setIsExecuting(false)
      // TODO: handle ERROR UI
    }
  }

  const buyExactShares = useCallback(
    async (shareAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance) return

      const maxAssetsIn = ethers.constants.MaxUint256
      const recipient = account
      const referrer = constants.AddressZero
      const tx = await lbpContractInstance?.swapAssetsForExactShares(
        parseUnit(shareAmount, 18), // Convert share amount to smallest denomination
        maxAssetsIn,
        recipient,
        referrer,
        authorization
      )

      return tx
    },
    [lbpContractInstance]
  )

  const buyExactAssetsForShares = useCallback(
    async (assetAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance) return
      const minSharesOut = 0
      const recipient = account

      console.info('token decimals', tokenOption)
      console.info('assetAmount', assetAmount)
      console.info(
        'buyExactAssetsForShares',
        'amount',
        parseUnit(assetAmount, tokenOption?.tokenDecimals || 18).toString()
      )

      const referrer = constants.AddressZero
      const tx = await lbpContractInstance.swapExactAssetsForShares(
        parseUnit(assetAmount, tokenOption?.tokenDecimals || 18), // Convert asset amount to smallest denomination
        minSharesOut,
        recipient,
        referrer,
        authorization,
        {
          gasLimit: 500000, // temporary hardcode as it sometimes fails due to gas limit is low
        }
      )

      return tx
    },
    [lbpContractInstance, tokenOption]
  )

  const sellExactSharesForAssets = useCallback(
    async (shareAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance) return
      const minAssetsOut = 0
      const recipient = account
      const tx = await lbpContractInstance.swapExactSharesForAssets(
        parseUnit(shareAmount, 18),
        minAssetsOut,
        recipient,
        authorization
      )

      return tx
    },
    [lbpContractInstance]
  )

  const sellExactAssets = useCallback(
    async (assetAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance) return
      const maxSharesIn = ethers.constants.MaxUint256
      const recipient = account
      const tx = await lbpContractInstance.swapSharesForExactAssets(
        parseUnit(assetAmount, tokenOption?.tokenDecimals || 18),
        maxSharesIn,
        recipient,
        authorization
      )

      return tx
    },
    [lbpContractInstance, tokenOption]
  )

  const handleButtonClick = useCallback(async () => {
    console.info('approval', approval)
    if (approval === 'APPROVED') {
      // Reset the input fields
      // handleOpenModal('buy')
      await trade(inputType, inputType == InputType.Asset ? assetValue : shareValue)
      setShareValue('')
      setAssetValue('')
    } else {
      setButtonDisabled(true)
      try {
        await approveCallback()
        console.log('Approval successful')
        setButtonDisabled(false)
      } catch (error) {
        console.error('Approval failed', error)
        setButtonDisabled(false)
      }
    }
  }, [approval, assetValue, shareValue])

  const buttonText = useMemo(() => {
    console.info('approval', approval)
    if (isExecuting) {
      return 'Executing...'
    }

    if (approval === 'PENDING') {
      return 'Approving..'
    } else if (approval === 'NOT_APPROVED') {
      return 'Approve'
    }

    return 'Buy'
  }, [approval, isExecuting, assetValue, shareValue])

  useEffect(() => {
    if (approval === 'PENDING') {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [approval])

  const handleSellButtonClick = useCallback(async () => {
    await trade(inputType, inputType == InputType.Asset ? assetValue : shareValue)
    setShareValue('')
    setAssetValue('')
  }, [assetValue, shareValue])

  function formatNumberWithDecimal(number: number | string, decimalPlaces: number): string {
    const parsedNumber = typeof number === 'string' ? parseFloat(number) : number
    if (isNaN(parsedNumber)) return ''
    return parsedNumber.toFixed(decimalPlaces)
  }

  return (
    <>
      {isLoading ? (
        <Centered>
          <Loader />
        </Centered>
      ) : (
        <>
          <BuySellModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            shareValue={shareValue}
            buyBtnText={activeTab}
            assetValue={assetValue}
          />
          {/* Share section */}
          <BuySellFieldsContainer>
            <BuySellFieldsItem>
              <BuySellFieldsWrapper>
                <BuySellFieldsSpan style={{ padding: '10px 10px', cursor: 'pointer' }}>Share</BuySellFieldsSpan>
              </BuySellFieldsWrapper>
              {convertingState.inputType === InputType.Share && convertingState.converting ? (
                <Loader size="25px" />
              ) : (
                ''
              )}
              <BuySellFieldsInput
                type="number"
                placeholder="0.00"
                name="ShareInput"
                value={shareValue}
                onChange={(event) => handleInputChange(event, InputType.Share)}
              />
            </BuySellFieldsItem>
            <BuySellFieldsItem>
              <BuySellFieldsSelect>
                <Serenity />
                <TYPE.body4 fontSize={'14px'}> {shareSymbol}</TYPE.body4>
              </BuySellFieldsSelect>
              <BuySellFieldsSpanBal>
                Balance: <b style={{ color: '#292933' }}> {formatNumberWithDecimal(shareBalance, 2)}</b>
              </BuySellFieldsSpanBal>
            </BuySellFieldsItem>
          </BuySellFieldsContainer>
          {/* Asset section */}
          <BuySellFieldsContainer assetExceedsBalance={assetExceedsBalance}>
            <BuySellFieldsItem>
              <BuySellFieldsWrapper>
                <BuySellFieldsSpan style={{ padding: '10px 10px', cursor: 'pointer' }}>Asset</BuySellFieldsSpan>
              </BuySellFieldsWrapper>
              {convertingState.inputType === InputType.Asset && convertingState.converting ? (
                <Loader size="25px" />
              ) : (
                ''
              )}
              <BuySellFieldsInput
                type="number"
                placeholder="0.00"
                name="assetInput"
                value={assetValue}
                onChange={(event) => handleInputChange(event, InputType.Asset)}
                assetExceedsBalance={assetExceedsBalance}
              />
              {assetExceedsBalance && <TYPE.description3 color={'#FF6161'}>Insufficient balance</TYPE.description3>}
            </BuySellFieldsItem>
            <BuySellFieldsItem>
              <BuySellFieldsSelect>
                <img src={tokenOption?.logo} />
                {/* <USDC /> */}
                <TYPE.body4 fontSize={'14px'}> {tokenOption?.tokenSymbol}</TYPE.body4>
              </BuySellFieldsSelect>
              <BuySellFieldsSpanBal>
                Balance: <b style={{ color: '#292933' }}>{formatNumberWithDecimal(tokenBalance, 2)} </b>
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
              <PinnedContentButton
                onClick={handleButtonClick}
                disabled={
                  assetExceedsBalance || isExecuting || buttonDisabled || (shareValue === '' && assetValue === '')
                }
              >
                {buttonText}
              </PinnedContentButton>
            ) : (
              <PinnedContentButton
                onClick={handleSellButtonClick}
                disabled={isExecuting || (shareValue === '' && assetValue === '')}
                style={{ backgroundColor: shareValue === '' && assetValue === '' ? '' : '#FF6161' }}
              >
                {isExecuting ? 'Executing...' : 'Sell'}
              </PinnedContentButton>
            )}
          </TabRow>
          {/* hide for now
      <TabRow style={{padding: '10px 40px', textAlign: 'center'}}><TYPE.title10 color={'#FF6161'}>Price change exceeds slippage tolerance. Adjust and retry.</TYPE.title10> </TabRow> */}
          <AddWalletText>Add Asset to Wallet</AddWalletText>
        </>
      )}
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

  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button,
  /* Firefox */
  &[type=number]::-webkit-outer-spin-button,
  &[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
