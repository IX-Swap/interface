import { PinnedContentButton, ButtonOutlined } from 'components/Button'
import styled from 'styled-components'
import ixsDropDown from '../../../assets/images/ixsToken.svg'
import { FormData } from 'pages/LBP/LbpForm'
import dayjs from 'dayjs'
import { useWeb3React } from '@web3-react/core'
import { TokenOptions } from 'pages/LBP/components/Tokenomics'
import { useMemo, useEffect, useState, useCallback } from 'react'
import { useLBPFactory } from 'hooks/useContract'
import { LBP_FACTORY_ADDRESS, LBP_XTOKEN_PROXY } from 'constants/addresses'
import { ethers } from 'ethers'
import { toUnixTimeSeconds } from 'utils/time'
import { useTokenContract } from 'hooks/useContract'
import { useDeployLbp } from 'state/lbp/hooks'

export const MAX_UINT88 = ethers.BigNumber.from('309485009821345068724781055')

interface Props {
  formData: FormData
  onCancel: () => void
}

export const SubmitSummary = ({ formData, onCancel }: Props) => {
  const { chainId } = useWeb3React()
  const [predictedLBPAddress, setPredictedLBPAddress] = useState<string>('')
  const [amounts, setAmounts] = useState<{ [key: string]: any }>({})

  const assetTokenContract = useTokenContract(formData.tokenomics.assetTokenAddress ?? '')
  const shareTokenContract = useTokenContract(formData.tokenomics.shareAddress ?? '')
  const lbpFactory = useLBPFactory(LBP_FACTORY_ADDRESS[chainId || 0] || '')
  const deployLbp = useDeployLbp()
  const [swapFee, setSwapFee] = useState<number>(0)
  const [platformFee, setPlatformFee] = useState<number>(0)

  const tokenOptions = useMemo(() => {
    // exclude tokens that has tokenAddress of undefined
    return TokenOptions(chainId || 0).filter((option) => option.tokenAddress)
  }, [chainId])

  const assetToken = tokenOptions.find((option) => option.tokenAddress === formData.tokenomics.assetTokenAddress)

  const handleCancel = () => {
    onCancel()
  }

  const lbpArgs = useMemo(() => {
    if (!formData || !chainId) {
      return null
    }

    const startAssetWeight = 100 - formData.tokenomics.startWeight
    const endAssetWeight = 100 - formData.tokenomics.endWeight

    const args = {
      asset: formData.tokenomics.assetTokenAddress,
      share: formData.tokenomics.shareAddress,
      shareWhitelistProxy: LBP_XTOKEN_PROXY[chainId || 0],
      virtualAssets: 0,
      virtualShares: 0,
      maxAssetsIn: MAX_UINT88,
      maxSharePrice: MAX_UINT88,
      maxSharesOut: MAX_UINT88,
      //  start weight and end weight are reversed in the smart contract
      weightStart: ethers.utils.parseEther(Number(startAssetWeight / 100).toString()),
      weightEnd: ethers.utils.parseEther(Number(endAssetWeight / 100).toString()),
      saleStart: toUnixTimeSeconds(new Date(formData.tokenomics.startDate)),
      saleEnd: toUnixTimeSeconds(new Date(formData.tokenomics.endDate)),
      sellingAllowed: true,
      authorized: true,
    }
    return args
  }, [formData, chainId])

  useEffect(() => {
    const fetchFees = async () => {
      if (!lbpFactory) return;
      try {
        const factorySettings = await lbpFactory.factorySettings();
        const swapFee = factorySettings.swapFee / 100;
        const platformFee = factorySettings?.platformFee / 100 || 0;
        setSwapFee(swapFee);
        setPlatformFee(platformFee);
      } catch (error) {
        console.error('Error fetching fees:', error);
      }
    };
    fetchFees();
  }, [lbpFactory]);



  useEffect(() => {
    const predictLBPAddress = async () => {
      if (!lbpFactory || !formData || !chainId || !assetTokenContract || !shareTokenContract || !lbpArgs) return ''

      const assetDecimals = await assetTokenContract.decimals()
      const shareDecimals = await shareTokenContract.decimals()
      const shareAmount = ethers.utils.parseUnits(formData.tokenomics.shareInput.toString(), shareDecimals)
      const assetAmount = ethers.utils.parseUnits(formData.tokenomics.assetInput.toString(), assetDecimals)

      setAmounts({
        assetAmount: assetAmount,
        shareAmount: shareAmount,
      })

      const args = { ...lbpArgs, assets: assetAmount, shares: shareAmount }

      const salt = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(formData?.id.toString()))
      const predictedAddress = await lbpFactory.predictDeterministicAddress(args, salt)
      console.info('predictedAddress', predictedAddress, 'args', args)
      setPredictedLBPAddress(predictedAddress)
    }

    

    predictLBPAddress()
  }, [lbpFactory, formData, chainId, assetTokenContract, shareTokenContract, lbpArgs])

  const handleDeploy = useCallback(async () => {
    if (!lbpFactory || !lbpArgs || !assetTokenContract || !shareTokenContract) return

    if (
      formData?.tokenomics?.contractAddress &&
      formData?.tokenomics?.contractAddress !== ethers.constants.AddressZero
    ) {
      console.log('Contract already deployed')
      return
    }

    const salt = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(formData?.id.toString()))

    const args = { ...lbpArgs, assets: amounts.assetAmount, shares: amounts.shareAmount }
    const tx = await lbpFactory.createLiquidityBootstrapPool(args, salt, {
      gasLimit: 500_000,
    })
    const receipt = await tx.wait()
    if (receipt.status === 1) {
      console.log('Transaction successful!')
      await deployLbp(formData?.id?.toString(), predictedLBPAddress)
    } else {
      console.error('Deployment failed!')
    }
  }, [lbpFactory, lbpArgs, formData, predictedLBPAddress, amounts])

  return (
    <SummaryContainer>
      <SummaryTitle>Quick Summary</SummaryTitle>
      <AddressField>
        <FieldLabel>Pool Address</FieldLabel>
        <FieldValue>{predictedLBPAddress}</FieldValue>
      </AddressField>
      <Section>
        <Row>
          <TextBlock>
            <FieldLabel>Swap Fee</FieldLabel>
            <FieldValue>{swapFee}.00%</FieldValue>
          </TextBlock>
          <TextBlock>
            <FieldLabel>Platform Fee</FieldLabel>
            <FieldValue>{platformFee}%</FieldValue>
          </TextBlock>
        </Row>
      </Section>
      <Section>
        <Row>
          <TextBlock>
            <FieldLabel>Start Date</FieldLabel>
            <FieldValue>{dayjs(formData.tokenomics.startDate).local().format('YYYY-MM-DD HH:mm:ss')}</FieldValue>
          </TextBlock>
          <TextBlock>
            <FieldLabel>End Date</FieldLabel>
            <FieldValue>{dayjs(formData.tokenomics.endDate).local().format('YYYY-MM-DD HH:mm:ss')}</FieldValue>
          </TextBlock>
        </Row>
      </Section>
      <Section>
        <SectionTitle>Quantities</SectionTitle>
        <Row>
          <FieldBlock>
            <FieldLabel>Project Token</FieldLabel>
            <TokenBlock>
              <TokenRow>
                <img style={{ borderRadius: '100%', width: '20px', height: '20px'}} src={formData?.branding?.LBPLogo?.public} alt="Serenity" />
                <span>{formData?.projectInfo?.title}</span>
              </TokenRow>
              <TokenPrice>{formData.tokenomics.shareInput}</TokenPrice>
            </TokenBlock>
          </FieldBlock>
          <FieldBlock>
            <FieldLabel>Base Token</FieldLabel>
            <TokenBlock>
              <TokenRow>
                <img  src={assetToken?.logo} alt={assetToken?.tokenSymbol} />
                <span>{assetToken?.tokenSymbol}</span>
              </TokenRow>
              <TokenPrice>{formData.tokenomics.assetInput}</TokenPrice>
            </TokenBlock>
          </FieldBlock>
        </Row>
      </Section>
      <Section>
        <SectionTitle>Weights</SectionTitle>
        <Row>
          <FieldBlock>
            <FieldLabel>Start Weights</FieldLabel>
            <TokenBlock>
              <TokenRow>
              <img style={{ borderRadius: '100%', width: '20px', height: '20px'}} src={formData?.branding?.LBPLogo?.public} alt="Serenity" />
                <span>{formData?.projectInfo?.title}</span>
              </TokenRow>
              <TokenPrice>{formData.tokenomics.startWeight}%</TokenPrice>
            </TokenBlock>
          </FieldBlock>
          <FieldBlock>
            <FieldLabel></FieldLabel>
            <TokenBlock>
              <TokenRow>
                <img  src={assetToken?.logo} alt={assetToken?.tokenSymbol} />
                <span>{assetToken?.tokenSymbol}</span>
              </TokenRow>
              <TokenPrice>{formData.tokenomics.endWeight}%</TokenPrice>
            </TokenBlock>
          </FieldBlock>
        </Row>
      </Section>
      <Section>
        <Row>
          <TextBlock>
            <FieldLabel>Start Price</FieldLabel>
            <FieldValue>{formData.tokenomics.minPrice}</FieldValue>
          </TextBlock>
          <TextBlock>
            <FieldLabel>Start Market Cap</FieldLabel>
            <FieldValue>{formData.tokenomics.maxSupply}</FieldValue>
          </TextBlock>
        </Row>
      </Section>
      <ButtonBar>
        <ButtonOutlined style={{ width: '100%' }} onClick={handleCancel}>
          Cancel
        </ButtonOutlined>
        <PinnedContentButton
          type="submit"
          data-testid="deployButton"
          style={{ width: '100%' }}
          marginY="24px"
          onClick={handleDeploy}
        >
          Deploy
        </PinnedContentButton>
      </ButtonBar>
    </SummaryContainer>
  )
}

const SummaryContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
`

const SummaryTitle = styled.h2``
const Section = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(102, 102, 255, 0.1);
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding-top: 20px;
`
const SectionTitle = styled.h3`
  align-self: start;
  margin: 0px;
  margin-bottom: 15px;
`
const AddressField = styled.div`
  width: 479px;
  border: 1px solid rgba(230, 230, 255, 1);
  background-color: rgba(247, 247, 250, 1);
  padding: 16px;
  border-radius: 8px;
`
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`
const TextBlock = styled.div`
  width: 50%;
`
const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: end;
`
const TokenBlock = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
  border: 1px solid rgba(230, 230, 255, 1);
  border-radius: 8px;
  padding: 15px;
  gap: 10px;
`
const FieldLabel = styled.span`
  color: rgba(85, 85, 102, 1);
`
const FieldValue = styled.p`
  color: rgba(41, 41, 51, 1);
`
const TokenRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > span {
    color: rgba(41, 41, 51, 1);
    font-weight: 600;
  }
`
const TokenPrice = styled.div`
  color: rgba(41, 41, 51, 1);
  font-weight: 700;
  font-size: 20px;
`
const ButtonBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`
