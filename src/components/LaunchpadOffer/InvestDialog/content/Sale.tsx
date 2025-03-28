import React, { useState, useMemo, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import Row from 'components/Row'
import { CheckCircle, Eye, Info } from 'react-feather'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import {
  INVESTMENT_STATUSES,
  InvestedDataRes,
  InvestmentStatusesLabels,
  Offer,
  OfferFileType,
  OfferStatus,
  WhitelistStatus,
} from 'state/launchpad/types'
import { InvestFormContainer } from './styled'
import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'
import { ConvertationField } from '../utils/ConvertationField'
import { TokenClaimMessage } from '../utils/TokenClaimMessage'
import { OfferLinks } from '../utils/OfferLinks'
import { BaseCheckbox } from '../utils/Checkbox'
import { useGetWhitelistStatus, useInvest, useInvestPublicSaleStructData, usePresaleProof } from 'state/launchpad/hooks'
import { text10, text11, text59 } from 'components/LaunchpadMisc/typography'
import { useLaunchpadInvestmentContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import { useAllowance } from 'hooks/useApproveCallback'
import { IXSALE_ADDRESS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import { IssuanceTooltip } from 'components/LaunchpadIssuance/IssuanceForm/shared/fields/IssuanceTooltip'
import { FlexVerticalCenter } from 'components/LaunchpadMisc/styled'
import { OfferStageStatus, getTokenSymbol } from 'components/LaunchpadOffer/OfferSidebar/OfferDetails'
import { KYCPromptIconContainer } from 'components/Launchpad/KYCPrompt/styled'
import { WalletEvent, INVEST_FLOW_EVENTS } from 'utils/event-logs'
import usePostbackJumpTask from 'hooks/usePostbackJumpTask'
import { MEDIA_WIDTHS } from 'theme'
import { getPublicAssetUrl } from 'components/TokenLogo/utils'

interface Props {
  offer: Offer
  investedData: InvestedDataRes
  openSuccess: () => void
  openFailed: () => void
}

export const SaleStage: React.FC<Props> = ({ offer, investedData, openSuccess, openFailed }) => {
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
    contractAddress,
    files,
  } = offer
  const { amount: amountInvested, availableToInvest, lastStatus } = investedData
  const theme = useTheme()
  const invest = useInvest(id)
  const getInvestPublicSaleStructData = useInvestPublicSaleStructData(id)
  const { callPostbackEndpoint } = usePostbackJumpTask()

  const [amount, setAmount] = useState<string>()
  const getPresaleProof = usePresaleProof(id)

  const [isDisabled, setDisabled] = useState(true)
  const [purchaseAgreed, setPurchaseAgreed] = useState(false)
  const [investmentMemorandumAgreed, setInvestmentMemorandumAgreed] = useState(false)
  const [otherDocumentsAgreed, setOtherDocumentsAgreed] = useState(false)
  const formatter = useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])
  const isPresale = useMemo(() => status === OfferStatus.preSale, [status])
  const { status: whitelistedStatus } = useGetWhitelistStatus(offer.id)

  const stageStatus = React.useMemo(() => {
    switch (offer.status) {
      case OfferStatus.preSale:
        return whitelistedStatus && whitelistedStatus === WhitelistStatus.accepted
          ? OfferStageStatus.active
          : OfferStageStatus.disabled

      case OfferStatus.sale:
        return OfferStageStatus.active

      case OfferStatus.approved:
        return OfferStageStatus.disabled

      default:
        return OfferStageStatus.notStarted
    }
  }, [whitelistedStatus, offer.status])

  const conditions = useMemo(
    () => [
      {
        label: 'Min. Investment Size',
        value: `${formatter.format(Number(isPresale ? presaleMinInvestment : minInvestment))} ${getTokenSymbol(
          network,
          investingTokenSymbol
        )}`,
      },
      {
        label: 'Max. Investment Size',
        value: `${formatter.format(Number(isPresale ? presaleMaxInvestment : maxInvestment))} ${getTokenSymbol(
          network,
          investingTokenSymbol
        )}`,
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
      {
        label: 'Available to invest',
        value: `${formatter.format(availableToInvest)} ${getTokenSymbol(network, investingTokenSymbol)}`,
      },
      {
        label: 'Already invested',
        value: `${formatter.format(amountInvested)} ${getTokenSymbol(network, investingTokenSymbol)}`,
      },
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

  const purchaseAgreement = files.find((x) => x.type === OfferFileType.purchaseAgreement)
  const investmentMemorandum = files.find((x) => x.type === OfferFileType.investmentMemorandum)
  const otherExecutionDocuments = files.filter((x) => x.type === OfferFileType.otherExecutionDocument)

  const tooltipContent = (
    <div>
      <PresaleTooltipTitle>Pre-Sale Conditions</PresaleTooltipTitle>
      <br />
      <PresaleTooltipText>
        These conditions are applicable only to the pre-sale round. For public sale conditions, please refer to the
        &quot;Deals&quot; page for more info.
      </PresaleTooltipText>
    </div>
  ) as React.ReactNode

  const launchpadContract = useLaunchpadInvestmentContract(contractAddress)
  const { chainId = 137, account } = useActiveWeb3React()

  const [approval, approveCallback] = useAllowance(
    offer.investingTokenAddress,
    ethers.utils.parseUnits(amount?.toString() || '0', investingTokenDecimals),
    contractAddress || IXSALE_ADDRESS[chainId]
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
        let transaction
        if (status === OfferStatus.preSale) {
          const { data: preSaleProof } = await getPresaleProof(amount).catch((e) => {
            submitState.setError(e.message)
            return { data: null }
          })
          if (!preSaleProof) return
          transaction = await launchpadContract.investPreSale(contractSaleId, parsedAmount, preSaleProof)
        } else if (status === OfferStatus.sale) {
          const { data: investStructData } = await getInvestPublicSaleStructData(amount, account).catch((e) => {
            submitState.setError(e.message)
            return { data: null }
          })
          if (!investStructData) return
          transaction = await launchpadContract.investPublicSale(contractSaleId, parsedAmount, investStructData)
        }

        if (transaction) {
          const receipt = await transaction.wait()

          if (receipt.status === 0) {
            openFailed()
          } else {
            await invest(status, {
              amount,
              txHash: receipt.transactionHash,
            })

            new WalletEvent(INVEST_FLOW_EVENTS.INVEST(status))
              .walletAddress(account || '')
              .data({
                amount,
                txHash: receipt.transactionHash,
              })
              .info(`Invest ${amount} ${investingTokenSymbol} INTO ${tokenSymbol}`)

            submitState.setSuccess()
            openSuccess()
            callPostbackEndpoint()
          }
        }
      }
    } catch (e) {
      new WalletEvent(INVEST_FLOW_EVENTS.INVEST(status)).walletAddress(account || '').error((e as any).toString())
      console.error(e)
      submitState.setError()
    }
  }, [invest, submitState, status])

  if (stageStatus === OfferStageStatus.disabled) {
    return (
      <InvestFormContainer style={{ alignItems: 'center' }}>
        <KYCPromptIconContainer>
          <Eye color={theme.launchpad.colors.primary} size="35" />
        </KYCPromptIconContainer>
        <WhitelistMessage>
          <PendingText>
            Thank you for your registration, we are still reviewing your registration to invest in the Pre-Sale stage.
          </PendingText>
        </WhitelistMessage>
      </InvestFormContainer>
    )
  }

  return (
    <InvestFormContainer padding="0 0 2rem 0">
      <OfferLinks network={network} address={tokenAddress} symbol={tokenSymbol} decimals={decimals} />

      <InfoList
        title={
          <InfoContainer>
            <InfoListTitle>{isPresale ? 'Pre-Sale Conditions' : 'Public Sale Conditions'}</InfoListTitle>
            {isPresale ? (
              <IssuanceTooltip tooltipContent={tooltipContent} />
            ) : (
              <Info size="16" color={theme.launchpad.colors.text.caption} />
            )}
          </InfoContainer>
        }
        fontSize="13px"
        lineHeight="30px"
        entries={conditions}
      />
      <InfoList
        title={<InfoListTitle>My investment allowance</InfoListTitle>}
        fontSize="13px"
        lineHeight="30px"
        entries={investmentAllowance}
      />

      <ConvertationField
        offer={offer}
        availableToInvest={availableToInvest}
        onChange={setAmount}
        setDisabled={setDisabled}
      />

      <Agreement>
        {purchaseAgreement && (
          <>
            <AgreementCheckbox state={purchaseAgreed} toggle={() => setPurchaseAgreed((state) => !state)} />
            <AgreementText>
              I have read, fully understood and agree to be bound by the&nbsp;
              <a
                style={{
                  textDecoration: 'none',
                  color: '#6667FF',
                }}
                href={getPublicAssetUrl(purchaseAgreement.file)}
                target="_blank"
                rel="noreferrer"
              >
                Purchase Agreement
              </a>
              &nbsp;in respect of this token sale.
            </AgreementText>
          </>
        )}
      </Agreement>
      <Agreement>
        {investmentMemorandum && (
          <>
            <AgreementCheckbox
              state={investmentMemorandumAgreed}
              toggle={() => setInvestmentMemorandumAgreed((state) => !state)}
            />
            <AgreementText>
              I have read, fully understood and agree to be bound by the&nbsp;
              <a
                style={{
                  textDecoration: 'none',
                  color: '#6667FF',
                }}
                href={getPublicAssetUrl(investmentMemorandum.file)}
                target="_blank"
                rel="noreferrer"
              >
                Investment Memorandum
              </a>
              &nbsp;in respect of this token sale.
            </AgreementText>
          </>
        )}
      </Agreement>
      <Agreement>
        {otherExecutionDocuments.length > 0 && (
          <>
            <AgreementCheckbox state={otherDocumentsAgreed} toggle={() => setOtherDocumentsAgreed((state) => !state)} />
            <AgreementText>
              I have read, fully understood and agree to be bound by the other relevant agreements here in respect of
              this token sale:
              {otherExecutionDocuments.map((document, idx) => (
                <>
                  <br />
                  <a
                    style={{
                      textDecoration: 'none',
                      color: '#6667FF',
                    }}
                    href={getPublicAssetUrl(document.file)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    &#xB7; {`Support Document ${idx + 1}`}
                  </a>
                </>
              ))}
            </AgreementText>
          </>
        )}
      </Agreement>

      <InvestFormSubmitButton
        state={submitState.current}
        disabled={
          isDisabled ||
          (purchaseAgreement && !purchaseAgreed) ||
          (investmentMemorandum && !investmentMemorandumAgreed) ||
          (otherExecutionDocuments.length > 0 && !otherDocumentsAgreed) ||
          submitState.current !== InvestSubmitState.default
        }
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
            <div style={{ flexGrow: 1, textAlign: 'left' }}>
              {submitState.errorMessage || 'Your order was not executed.'}
            </div>
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
  font-weight: 400;
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
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const AgreementCheckbox = styled(BaseCheckbox)`
  background: ${(props) => props.theme.launchpad.colors.primary};
`

const WhitelistMessage = styled.div`
  ${text59}
  text-align: center;
  max-width: 80%;
  font-size: 18px;
  color: ${(props) => props.theme.launchpad.colors.text.title};
  b {
    color: ${(props) => props.theme.launchpad.colors.primary};
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    max-width: 100%;
  }
`

const PendingText = styled.div`
  margin-bottom: 0;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-bottom: 50px;
  }
`
