import React, { useState, useMemo, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import Row from 'components/Row'
import { CheckCircle, Info } from 'react-feather'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import {
  INVESTMENT_STATUSES,
  InvestedDataRes,
  InvestmentStatusesLabels,
  Offer,
  OfferStatus,
} from 'state/launchpad/types'
import { InvestFormContainer } from './styled'
import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'
import { ConvertationField } from '../utils/ConvertationField'
import { TokenClaimMessage } from '../utils/TokenClaimMessage'
import { OfferLinks } from '../utils/OfferLinks'
import { BaseCheckbox } from '../utils/Checkbox'
import { useInvest, useInvestPublicSaleStructData, usePresaleProof } from 'state/launchpad/hooks'
import { text10, text11 } from 'components/LaunchpadMisc/typography'
import { useLaunchpadInvestmentContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyAmount } from '@ixswap1/sdk-core'
import { LAUNCHPAD_INVESTMENT_ADDRESS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import { IssuanceTooltip } from 'components/LaunchpadIssuance/IssuanceForm/shared/fields/IssuanceTooltip'
import { FlexVerticalCenter } from 'components/LaunchpadMisc/styled'

interface Props {
  offer: Offer
  investedData: InvestedDataRes
  openSuccess: () => void
}

export const SaleStage: React.FC<Props> = ({ offer, investedData, openSuccess }) => {
  const {
    minInvestment,
    maxInvestment,
    presaleMinInvestment,
    presaleMaxInvestment,
    investingTokenSymbol,
    status,
    id,
    network,
    tokenAddress,
    tokenSymbol,
    decimals,
    contractSaleId,
    investingTokenDecimals,
  } = offer
  const { amount: amountInvested, availableToInvest, lastStatus } = investedData
  const theme = useTheme()
  const invest = useInvest(id)
  const getPresaleProof = usePresaleProof(id)
  const getInvestPublicSaleStructData = useInvestPublicSaleStructData(id)

  const [amount, setAmount] = useState<string>()

  const [isDisabled, setDisabled] = useState(true)
  const [agreed, setAgreed] = useState(false)
  const formatter = useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])
  const isPresale = useMemo(() => status === OfferStatus.preSale, [status])

  const conditions = useMemo(
    () => [
      {
        label: 'Min. Investment Size',
        value: `${formatter.format(Number(isPresale ? presaleMinInvestment : minInvestment))} ${investingTokenSymbol}`,
      },
      {
        label: 'Max. Investment Size',
        value: `${formatter.format(Number(isPresale ? presaleMaxInvestment : maxInvestment))} ${investingTokenSymbol}`,
      },
    ],
    [isPresale, presaleMaxInvestment, presaleMinInvestment, maxInvestment, minInvestment, investingTokenSymbol]
  )

  const investmentAllowance = useMemo(() => {
    const getColor = (status: INVESTMENT_STATUSES | null) => {
      switch (status) {
        case INVESTMENT_STATUSES.done:
          return theme.launchpad.colors.success
        case INVESTMENT_STATUSES.pending:
          return theme.launchpad.colors.warn
        case INVESTMENT_STATUSES.failed:
          return theme.launchpad.colors.error
        default:
          return 'inherit'
      }
    }
    return [
      { label: 'Available to invest', value: `${formatter.format(availableToInvest)} ${investingTokenSymbol}` },
      { label: 'Already invested', value: `${formatter.format(amountInvested)} ${investingTokenSymbol}` },
      {
        label: (
          <FlexVerticalCenter>
            <span style={{ paddingRight: '0.25rem' }}>Last investment transaction status</span>
            <IssuanceTooltip tooltipContent="Last saved transaction status, please wait for the data to sync" />
          </FlexVerticalCenter>
        ),
        value: (
          <span style={{ color: getColor(lastStatus) }}>{lastStatus ? InvestmentStatusesLabels[lastStatus] : '-'}</span>
        ),
      },
    ]
  }, [availableToInvest, amountInvested, investingTokenSymbol, formatter, lastStatus])

  const tooltipContent = <div>
    <PresaleTooltipTitle>Pre-Sale Conditions</PresaleTooltipTitle>
    <br/>
    <PresaleTooltipText>These conditions are applicable only to the pre-sale round. 
      For public sale conditions, please refer to the &quot;Deals&quot; page for more info.</PresaleTooltipText>
  </div> as React.ReactNode

  const launchpadContract = useLaunchpadInvestmentContract()
  const tokenCurrency = useCurrency(offer.investingTokenAddress)
  const { chainId = 137, account } = useActiveWeb3React()

  const [approval, approveCallback] = useApproveCallback(
    tokenCurrency
      ? CurrencyAmount.fromRawAmount(
          tokenCurrency,
          ethers.utils.parseUnits(amount || '0', investingTokenDecimals) as any
        )
      : undefined,
    LAUNCHPAD_INVESTMENT_ADDRESS[chainId]
  )
  const submitState = useInvestSubmitState()

  const submit = useCallback(async () => {
    if (!amount) {
      return
    }

    try {
      submitState.setLoading()
      const parsedAmount = ethers.utils.parseUnits(amount, investingTokenDecimals)

      if (approval !== 'APPROVED') {
        await approveCallback()
      }

      if (launchpadContract) {
        let data
        if (status === OfferStatus.preSale) {
          const { data: proof } = await getPresaleProof()
          data = await launchpadContract.investPreSale(contractSaleId, parsedAmount, proof)
        } else if (status === OfferStatus.sale) {
          const { data: investStructData } = await getInvestPublicSaleStructData(amount, account)
          data = await launchpadContract.investPublicSale(contractSaleId, parsedAmount, investStructData)
        }

        if (data.hash)
          await invest(status, {
            amount,
            txHash: data.hash,
          })

        submitState.setSuccess()
        openSuccess()
      }
    } catch (e) {
      console.error(e)
      submitState.setError()
    }
  }, [invest, submitState, status])

  return (
    <InvestFormContainer padding="0 0 2rem 0">
      <OfferLinks network={network} address={tokenAddress} symbol={tokenSymbol} decimals={decimals} />

      <InfoList
        title={<InfoContainer>
                <InfoListTitle>{isPresale ? 'Pre-Sale Conditions' : 'Public Sale Conditions'}</InfoListTitle>
                {isPresale ? 
                  <IssuanceTooltip tooltipContent={tooltipContent} /> : 
                  <Info size="16" color={theme.launchpad.colors.text.caption} />}
              </InfoContainer>}
        fontSize="13px"
        lineHeight="32px"
        entries={conditions}
      />
      <InfoList
        title={<InfoListTitle>My investment allowance</InfoListTitle>}
        fontSize="13px"
        lineHeight="32px"
        entries={investmentAllowance}
      />

      <ConvertationField offer={offer} availableToInvest={availableToInvest} onChange={setAmount} setDisabled={setDisabled} />

      <Agreement>
        <AgreementCheckbox state={agreed} toggle={() => setAgreed((state) => !state)} />
        <AgreementText>
          I have read, fully understood, and agree to be bound by the terms of this{' '}
          <AgreementTerms href="#">subscription form.</AgreementTerms>
        </AgreementText>
      </Agreement>

      <InvestFormSubmitButton
        state={submitState.current}
        disabled={isDisabled || !agreed || submitState.current !== InvestSubmitState.default}
        onSubmit={submit}
      >
        {submitState.current === InvestSubmitState.success && (
          <>
            Submitted <CheckCircle size="15" color={theme.launchpad.colors.success} />
          </>
        )}
        {submitState.current === InvestSubmitState.default && 'Invest'}
        {submitState.current === InvestSubmitState.loading && (
          <Row justifyContent="space-between" alignItems="center" width="100%" padding="1rem">
            <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order is being processed...</div>
            <Loader size="18px" />
          </Row>
        )}
        {submitState.current === InvestSubmitState.error && (
          <Row justifyContent="space-between" alignItems="center" width="100%" padding="1rem">
            <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order was not executed.</div>
            <Info size="18" color={theme.launchpad.colors.error} />
          </Row>
        )}
      </InvestFormSubmitButton>

      <TokenClaimMessage />
    </InvestFormContainer>
  )
}

const PresaleTooltipTitle = styled.b`
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const PresaleTooltipText = styled.p`
  color: ${(props) => props.theme.launchpad.colors.text.body};
  font-weight: 400
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 7px;
`

const InfoListTitle = styled.text`
  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const Agreement = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`

const AgreementText = styled.div`
  flex-grow: 1;
  ${text11}
  max-width: 250px;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const AgreementTerms = styled.a`
  ${text11}
  text-decoration: none;
  color: ${(props) => props.theme.launchpad.colors.primary};
`

const AgreementCheckbox = styled(BaseCheckbox)`
  background: ${(props) => props.theme.launchpad.colors.primary};
`
