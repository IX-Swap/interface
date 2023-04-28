import React from 'react'
import Portal from '@reach/portal'
import styled, { useTheme } from 'styled-components'
import { CheckCircle, Clock, Info } from 'react-feather'
import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { useCheckClaimed, useClaimOfferRefund } from 'state/launchpad/hooks'
import { InvestedDataRes, Offer, OfferStatus } from 'state/launchpad/types'
import { InvestFormContainer } from './styled'
import { Column, Row, Separator } from 'components/LaunchpadMisc/styled'
import { ExitIconContainer } from 'components/Launchpad/KYCPrompt/styled'
import { ContactForm } from 'components/Launchpad/KYCPrompt/ContactForm'
import { InvestInfoMessage, InvestSubmitState } from '../utils/InvestSubmitButton'
import { OfferLinks } from '../utils/OfferLinks'
import { useAddPopup } from 'state/application/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { text10, text14, text27, text59, text9 } from 'components/LaunchpadMisc/typography'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { useLaunchpadInvestmentContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyAmount } from '@ixswap1/sdk-core'
import { ethers } from 'ethers'
import { LAUNCHPAD_INVESTMENT_ADDRESS } from 'constants/addresses'

interface Props {
  offer: Offer
  onClose: () => void
  investedData: InvestedDataRes
}

export const ClosedStage: React.FC<Props> = (props) => {
  const theme = useTheme()
  const {
    id,
    status,
    softCapReached,
    investingTokenAddress,
    network,
    tokenSymbol,
    tokenAddress,
    decimals,
    investingTokenDecimals,
    investingTokenSymbol,
    contractSaleId,
  } = props.offer

  const addPopup = useAddPopup()
  const claimRefund = useClaimOfferRefund(id)
  const { setHasClaimed, hasClaimed } = useCheckClaimed(id)

  const [contactFormOpen, setContactForm] = React.useState(false)
  const toggleContactForm = React.useCallback(() => setContactForm((state) => !state), [])

  const canClaim = React.useMemo(() => status === OfferStatus.claim, [])

  const isSuccessfull = React.useMemo(() => softCapReached, [])

  const { amount, amountClaim, loading: amountLoading, error: amountError } = props.investedData
  const launchpadContract = useLaunchpadInvestmentContract()
  const { chainId = 137, account } = useActiveWeb3React()
  const tokenCurrency = useCurrency(investingTokenAddress)

  const [approval, approveCallback] = useApproveCallback(
    tokenCurrency
      ? CurrencyAmount.fromRawAmount(
          tokenCurrency,
          ethers.utils.parseUnits(amount?.toString(), investingTokenDecimals) as any
        )
      : undefined,
    LAUNCHPAD_INVESTMENT_ADDRESS[chainId]
  )

  const onSubmit = React.useCallback(async () => {
    try {
      if (approval !== ApprovalState.APPROVED) {
        await approveCallback()
      }

      if (launchpadContract) {
        const data = await launchpadContract.claim(contractSaleId, account)

        if (data.hash)
          await claimRefund({
            amount: amount?.toString(),
            txHash: data.hash,
          })

        setHasClaimed(true)
        addPopup({ info: { success: true, summary: 'Claimed successfully' } })
      }
    } catch (err: any) {
      addPopup({ info: { success: false, summary: 'Something went wrong. Please try again.' } })
    }
  }, [claimRefund, amount])

  return (
    <InvestFormContainer gap="1rem" padding="0 0 3rem 0">
      <Title>{canClaim ? 'Token Claim' : 'Closed'}</Title>

      <InvestInfoMessage state={isSuccessfull ? InvestSubmitState.success : InvestSubmitState.error}>
        {isSuccessfull && (
          <>
            This deal has been successfully funded <CheckCircle size="15" color={theme.launchpad.colors.success} />
          </>
        )}
        {!isSuccessfull && (
          <>
            This deal has been unsuccessfully funded <Info size="15" color={theme.launchpad.colors.error} />
          </>
        )}
      </InvestInfoMessage>

      <Separator />

      <Row justifyContent="space-between" alignItems="center">
        <Column>
          <MyInvestmentLabel>My Investment</MyInvestmentLabel>
          {amountLoading && <Loader />}
          {!amountLoading && !amountError && (
            <MyInvestmentAmount>
              {isSuccessfull ? amountClaim : amount} {isSuccessfull ? tokenSymbol : investingTokenSymbol}
            </MyInvestmentAmount>
          )}
          {amountError}
        </Column>

        {!isSuccessfull && (
          <ClaimedFilledButton onClick={onSubmit} disabled={!canClaim || amount <= 0 || hasClaimed}>
            Claim
          </ClaimedFilledButton>
        )}
      </Row>

      <Separator />

      {!canClaim && (
        <Row alignItems="center" gap="1rem">
          <Clock color={theme.launchpad.colors.primary} size="50" />
          <CantClaimNotice>
            Upon the commencement of the token claim deal stage, the issuer will initiate a batch claim process for the
            tokens. The tokens will be automatically distributed to the investor&apos;s wallets as a consequence of this
            process
          </CantClaimNotice>
        </Row>
      )}

      {canClaim && (
        <Column gap="0.5rem">
          <CanClaimNotice>
            Once claimed, you can find your tokens in your wallet. Please make sure to add the token address to your
            wallet to see the token on your wallet feed.
          </CanClaimNotice>

          <OfferLinks
            network={network}
            address={isSuccessfull ? tokenAddress : investingTokenAddress}
            symbol={isSuccessfull ? tokenSymbol : investingTokenSymbol}
            decimals={isSuccessfull ? decimals : investingTokenDecimals}
          />
        </Column>
      )}

      <Separator />

      <HelpLabel>Need help?</HelpLabel>
      <HelpButton onClick={toggleContactForm}>Contact Us</HelpButton>

      {contactFormOpen && (
        <Portal>
          <ModalWrapper>
            <ContactFormWrapper>
              <ExitIconContainer onClick={toggleContactForm}>
                <CrossIcon />
              </ExitIconContainer>

              <ContactForm offerId={id} onSubmit={props.onClose} />
            </ContactFormWrapper>
          </ModalWrapper>
        </Portal>
      )}
    </InvestFormContainer>
  )
}

const Title = styled.div`
  ${text59}
  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const CanClaimNotice = styled.div`
  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  opacity: 0.8;
  max-width: 85%;
`
const CantClaimNotice = styled.div`
  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.title + 'cc'};
  max-width: 70%;

  b {
    font-weight: 700;
    color: ${(props) => props.theme.launchpad.colors.text.title};
  }
`

const HelpLabel = styled.div`
  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const HelpButton = styled.div`
  display: grid;
  place-content: center;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  cursor: pointer;
  ${text9}
  height: 60px;
  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.primary};
  transition: background 0.4s;

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground + 'b1'};
  }
`

const MyInvestmentLabel = styled.div`
  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const MyInvestmentAmount = styled.div`
  ${text14}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const ModalWrapper = styled.div`
  display: grid;
  place-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  backdrop-filter: blur(20px);
`

const ContactFormWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 1rem;
  position: relative;
  width: 480px;
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 8px;
  padding: 2rem;
`

const ClaimedFilledButton = styled(FilledButton)`
  ${text27}
  width: 173px;
`
