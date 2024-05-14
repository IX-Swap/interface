import { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { PinnedContentButton } from 'components/Button'
import { ApprovalState, useAllowance } from 'hooks/useApproveCallback'
import { ethers, constants } from 'ethers'
import { useLBPContract, useTokenContract, useLBPFactory } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { formatNumberWithDecimals, useGetLBPAuthorization } from 'state/lbp/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import BuySellModal from './Modals/BuySellModal'
import { useWeb3React } from '@web3-react/core'
import { LBP_FACTORY_ADDRESS } from 'constants/addresses'
import { getPriceFromRawReservesAndWeights } from '../utils/calculation'
import { useTransactionAdder } from 'state/transactions/hooks'

interface BuySellFieldsProps {
  activeTab: string
  slippage: string
  tokenBalance: string
  assetTokenAddress?: string
  contractAddress?: string
  tokenDecimals?: number
  shareBalance?: any
  tokenOption?: TokenOption
  shareTokenAddress?: string
  id: any
  logo?: any
}

interface TokenOption {
  value: string
  tokenAddress: string
  tokenDecimals: number
  tokenSymbol: string
  logo: string
}

interface BuySellFieldsInputProps {
  exceedsBalance?: boolean
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

const AMOUNT_PRECISION = 4

export default function BuySellFields({
  activeTab,
  tokenBalance,
  assetTokenAddress,
  contractAddress,
  shareBalance,
  tokenOption,
  shareTokenAddress,
  id,
  logo,
  slippage,
  
}: BuySellFieldsProps) {
  // UI States
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // const [buttonText, setButtonText] = useState('Approve')
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shareSymbol, setShareSymbol] = useState<any>('')
  const [shareValue, setShareValue] = useState('')
  const [assetValue, setAssetValue] = useState('')
  const [swapFee, setSwapFee] = useState(0)
  const [inputType, setInputType] = useState<InputType>(InputType.None)
  const [convertingState, setIsConvertingState] = useState({
    inputType: InputType.None,
    converting: false,
  })
  const [isExecuting, setIsExecuting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const assetDecimals = useMemo(() => tokenOption?.tokenDecimals || 0, [tokenOption])
  const shareDecimals = useMemo(() => 18, []) // for now hardcode share decimals to 18 but can change it later

  // Web3 States
  const { chainId } = useWeb3React()
  const lbpFactory = useLBPFactory(LBP_FACTORY_ADDRESS[chainId || 0] || '')
  const lbpContractInstance = useLBPContract(contractAddress ?? '')
  const { account } = useActiveWeb3React()
  const getLBPAuthorization = useGetLBPAuthorization()
  const shareTokenContract = useTokenContract(shareTokenAddress ?? '')
  const [reservesAndWeights, setReservesAndWeights] = useState<any>(null)

  const assetValueWithSlippage = useMemo(() => {
    // only applicable if active tab is buy, and input type is share
    if (!assetValue || !slippage) {
      return ''
    }
    if (activeTab === TradeAction.Buy && inputType === InputType.Share) {
      const maxAssetIn = parseFloat(assetValue) * (1 + parseFloat(slippage) / 100)
      return maxAssetIn.toFixed(AMOUNT_PRECISION)
    }

    return assetValue
  }, [slippage, assetValue, inputType, activeTab])

  const [approval, approveCallback, refreshAllowance] = useAllowance(
    assetTokenAddress,
    ethers.utils.parseUnits(assetValueWithSlippage || '0', assetDecimals),
    contractAddress || ''
  )

  const addTransaction = useTransactionAdder()
  const assetExceedsBalance = useMemo(() => {
    if (!tokenBalance || !assetValueWithSlippage) {
      return false
    }

    return parseFloat(assetValueWithSlippage) > parseFloat(tokenBalance)
  }, [assetValueWithSlippage, tokenBalance])

  const shareExceedBalance = useMemo(() => {
    if (!shareValue || activeTab === TradeAction.Buy) {
      return false
    }

    return parseFloat(shareValue) > parseFloat(shareBalance)
  }, [shareValue, shareBalance, activeTab])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.info('Fetch data LBP buy/sells')
        if (!shareTokenContract || !lbpFactory || !lbpContractInstance || !id || !tokenBalance || !shareBalance) return

        const [shareSymbol, factorySettings, reservesAndWeights] = await Promise.all([
          shareTokenContract?.symbol(),
          lbpFactory?.factorySettings(),
          lbpContractInstance?.reservesAndWeights(),
        ])

        setSwapFee((factorySettings?.swapFee || 0) / 100)
        setReservesAndWeights(reservesAndWeights)
        setShareSymbol(shareSymbol)
        // const isButtonDisabled = shareValue.trim() === '' || assetValue.trim() === ''
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [shareTokenContract, lbpFactory, lbpContractInstance, id, tokenBalance, shareBalance])

  useEffect(() => {
    const isButtonDisabled = shareValue.trim() === '' || assetValue.trim() === ''
    setButtonDisabled(isButtonDisabled)
  }, [shareValue, assetValue])

  const handleOpenModal = (action: any) => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = useCallback(
    async (event: any, inputType: InputType) => {
      if (errorMessage !== '') setErrorMessage('')
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
        setOpposite('')
        const converted = await handleConversion(
          inputType,
          inputAmount,
          inputType == 'share' ? shareDecimals : assetDecimals,
          inputType == 'share' ? assetDecimals : shareDecimals
        )
        setIsConvertingState((prevState) => {
          return {
            ...prevState,
            converting: false,
          }
        })

        setOpposite(converted ? parseFloat(converted).toFixed(AMOUNT_PRECISION) : '')
      } else {
        // Clear the opposite value if the input is cleared
        setOpposite('')
      }
    },
    [errorMessage, shareDecimals, assetDecimals]
  )

  const handleConversion = useCallback(
    async (
      inputType: InputType,
      inputAmount: number,
      inputDecimals: number,
      outputDecimals: number
    ): Promise<string> => {
      if (!lbpContractInstance) return ''

      try {
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
          const result = await lbpContractInstance[method](amount)
          const parsedAmount = ethers.utils.formatUnits(result.toString(), outputDecimals)
          return parsedAmount
        }
      } catch (err: any) {
        console.error('Error converting amount full:', err)
        console.error('Error converting amount:', err.errorName)
        setErrorMessage(err.errorName)
      }

      return '0'
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
        const receipt = await tx.wait()
        if (receipt.status === 0) {
          setErrorMessage('Execution error')
        } else {
          refreshAllowance()
          addTransaction(tx, {
            summary: 'Transaction is successful!',
          })
        }

        setIsExecuting(false)
      }
    } catch (error: any) {
      console.error('Error executing trade:', error)
      setErrorMessage(error?.errorName || 'Execution error')
      setIsExecuting(false)
      // TODO: handle ERROR UI
    }
  }

  const buyExactShares = useCallback(
    async (shareAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance || !assetValueWithSlippage || !assetValue || !shareDecimals) return

      const maxAssetsIn = ethers.utils.parseUnits(assetValueWithSlippage, assetDecimals)

      console.info('maxAssetsIn', maxAssetsIn.toString())

      const recipient = account
      const referrer = constants.AddressZero

      const tx = await lbpContractInstance?.swapAssetsForExactShares(
        parseUnit(shareAmount, shareDecimals), // Convert share amount to smallest denomination
        maxAssetsIn,
        recipient,
        referrer,
        authorization,
        {
          gasLimit: 300000, // temporary hardcode as it sometimes fails due to gas limit is low
        }
      )

      return tx
    },
    [lbpContractInstance, assetValueWithSlippage, assetDecimals, shareDecimals]
  )

  const buyExactAssetsForShares = useCallback(
    async (assetAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance || !tokenOption || !assetDecimals || !shareDecimals || !shareValue || !slippage) return

      const minSharesOutValue = parseFloat(shareValue) * (1 - parseFloat(slippage) / 100)
      const minSharesOut = ethers.utils.parseUnits(minSharesOutValue.toFixed(AMOUNT_PRECISION), shareDecimals)
      const recipient = account

      console.info('minSharesOut', minSharesOut.toString())

      const referrer = constants.AddressZero

      const tx = await lbpContractInstance.swapExactAssetsForShares(
        parseUnit(assetAmount, assetDecimals), // Convert asset amount to smallest denomination
        minSharesOut,
        recipient,
        referrer,
        authorization,
        {
          gasLimit: 300000, // temporary hardcode as it sometimes fails due to gas limit is low
        }
      )

      return tx
    },
    [lbpContractInstance, shareValue, tokenOption, assetDecimals, shareDecimals, slippage]
  )

  const priceImpact = useMemo(() => {
    if (!reservesAndWeights || !assetDecimals || !shareDecimals || !shareValue || !assetValue) return 0
    const { assetReserve, shareReserve, assetWeight, shareWeight } = reservesAndWeights
    const isBuy = activeTab === TradeAction.Buy

    const deltaAssetReserve = ethers.utils.parseUnits(assetValue, assetDecimals)
    const deltaShareReserve = ethers.utils.parseUnits(shareValue, shareDecimals)

    const marketPrice = getPriceFromRawReservesAndWeights({
      currentAssetReserve: assetReserve,
      currentShareReserve: shareReserve,
      currentAssetWeight: assetWeight,
      currentShareWeight: shareWeight,
      assetDecimals: assetDecimals,
      shareDecimals: shareDecimals,
    })

    const newPrice = getPriceFromRawReservesAndWeights({
      currentAssetReserve: isBuy ? assetReserve.add(deltaAssetReserve) : assetReserve.sub(deltaAssetReserve),
      currentShareReserve: isBuy ? shareReserve.sub(deltaShareReserve) : shareReserve.add(deltaShareReserve),
      currentAssetWeight: assetWeight,
      currentShareWeight: shareWeight,
      assetDecimals: assetDecimals,
      shareDecimals: shareDecimals,
    })

    const marketPriceFloat = parseFloat(marketPrice)
    const priceDifference = parseFloat(newPrice) - marketPriceFloat
    const priceImpactPercentage = Math.abs((priceDifference / marketPriceFloat) * 100)
    return priceImpactPercentage.toFixed(3)
  }, [activeTab, reservesAndWeights, assetValue, shareValue, assetDecimals, shareDecimals])

  const sellExactSharesForAssets = useCallback(
    async (shareAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance || !assetValue || !assetDecimals || !shareDecimals || !slippage) return

      const minAssetOutValue = parseFloat(assetValue) * (1 - parseFloat(slippage) / 100)
      const minAssetsOut = ethers.utils.parseUnits(minAssetOutValue.toFixed(AMOUNT_PRECISION), assetDecimals)

      console.info('minAssetsOut', minAssetsOut.toString())

      const recipient = account

      const tx = await lbpContractInstance.swapExactSharesForAssets(
        parseUnit(shareAmount, shareDecimals),
        minAssetsOut,
        recipient,
        authorization,
        {
          gasLimit: 300000, // temporary hardcode as it sometimes fails due to gas limit is low on amoy testnet
        }
      )

      return tx
    },
    [lbpContractInstance, assetValue, assetDecimals, shareDecimals, slippage]
  )

  const sellExactAssets = useCallback(
    async (assetAmount: number, authorization: any): Promise<any> => {
      if (!lbpContractInstance || !shareValue || !assetDecimals || !shareDecimals || !slippage) return

      const maxSharesInValue = parseFloat(shareValue) * (1 + parseFloat(slippage) / 100)
      const maxSharesIn = ethers.utils.parseUnits(maxSharesInValue.toFixed(AMOUNT_PRECISION), shareDecimals)

      console.info('maxSharesIn', maxSharesIn.toString())

      const recipient = account
      const tx = await lbpContractInstance.swapSharesForExactAssets(
        parseUnit(assetAmount, assetDecimals),
        maxSharesIn,
        recipient,
        authorization,
        {
          gasLimit: 300000, // temporary hardcode as it sometimes fails due to gas limit is low on amoy testnet
        }
      )

      return tx
    },
    [lbpContractInstance, shareValue, assetDecimals, shareDecimals, slippage]
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
  }, [approval, assetValue, shareValue, approveCallback])

  const buttonText = useMemo(() => {
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
          <BuySellFieldsContainer exceedsBalance={shareExceedBalance}>
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
                onWheel={ event => event.currentTarget.blur() }
                exceedsBalance={shareExceedBalance}
              />
              {shareExceedBalance && <TYPE.description3 color={'#FF6161'}>Insufficient balance</TYPE.description3>}
            </BuySellFieldsItem>
            <BuySellFieldsItem>
              <BuySellFieldsSelect>
                <img style={{ borderRadius: '100%' }} width="25px" height="25px" src={logo?.public} />
                <TYPE.body4 fontSize={'14px'}> {shareSymbol}</TYPE.body4>
              </BuySellFieldsSelect>
              <BuySellFieldsSpanBal>
                Balance: <b style={{ color: '#292933' }}> {formatNumberWithDecimals(shareBalance, 3, true)}</b>
              </BuySellFieldsSpanBal>
            </BuySellFieldsItem>
          </BuySellFieldsContainer>
          {/* Asset section */}
          <BuySellFieldsContainer exceedsBalance={assetExceedsBalance}>
            <BuySellFieldsItem>
              <BuySellFieldsWrapper>
                <BuySellFieldsSpan style={{ padding: '10px 10px', cursor: 'pointer' }}>Base Token</BuySellFieldsSpan>
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
                onWheel={ event => event.currentTarget.blur() }
                exceedsBalance={assetExceedsBalance}
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
                Balance: <b style={{ color: '#292933' }}>{formatNumberWithDecimals(tokenBalance, 3, true)} </b>
              </BuySellFieldsSpanBal>
            </BuySellFieldsItem>
          </BuySellFieldsContainer>
          {errorMessage ? (
            <TYPE.error error style={{ marginBottom: '10px' }}>
              {errorMessage}
            </TYPE.error>
          ) : null}
          <TabRow>
            <SlippageWrapper>
              <TYPE.body3>Fees: </TYPE.body3>
              <TYPE.body3 color={'#292933'} fontWeight={'700'}>
                {swapFee}%
              </TYPE.body3>
            </SlippageWrapper>
            <SlippageWrapper>
              <TYPE.body3>Price Impact: </TYPE.body3>
              <TYPE.body3 color={'#292933'} fontWeight={'700'}>
                {priceImpact}%
              </TYPE.body3>
            </SlippageWrapper>
          </TabRow>
          <TabRow style={{ marginTop: '20px' }}>
            {activeTab === 'buy' ? (
              <PinnedContentButton
                onClick={handleButtonClick}
                disabled={
                  assetExceedsBalance ||
                  isExecuting ||
                  approval == ApprovalState.PENDING ||
                  buttonDisabled ||
                  (shareValue === '' && assetValue === '') ||
                  errorMessage !== ''
                }
              >
                {buttonText}
              </PinnedContentButton>
            ) : (
              <PinnedContentButton
                onClick={handleSellButtonClick}
                disabled={isExecuting || (shareValue === '' && assetValue === '') || errorMessage !== ''}
                style={{
                  backgroundColor: isExecuting ? '' : shareValue === '' && assetValue === '' ? '' : '#FF6161',
                }}
              >
                {isExecuting ? 'Executing...' : 'Sell'}
              </PinnedContentButton>
            )}
          </TabRow>
          {/* hide for now
      <TabRow style={{padding: '10px 40px', textAlign: 'center'}}><TYPE.title10 color={'#FF6161'}>Price change exceeds slippage tolerance. Adjust and retry.</TYPE.title10> </TabRow> */}
          <AddWalletText>Add Base Token to Wallet</AddWalletText>
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
  border: 1px solid ${({ exceedsBalance }) => (exceedsBalance ? '#FF6161' : '#e6e6ff')};
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
  color: ${({ exceedsBalance }) => (exceedsBalance ? '#FF6161' : '#292933')};
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
