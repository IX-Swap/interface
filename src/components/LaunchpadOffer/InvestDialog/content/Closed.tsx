import React from 'react'
import Portal from '@reach/portal'
import styled, { useTheme } from 'styled-components'
import { CheckCircle, Clock, Info } from 'react-feather'
import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { useClaimOffer, useInvestedAmount } from 'state/launchpad/hooks'
import { Offer, OfferStatus } from 'state/launchpad/types'
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

interface Props {
  offer: Offer
  onClose: () => void
}

export const ClosedStage: React.FC<Props> = (props) => {
  const theme = useTheme()

  const addPopup = useAddPopup()
  const claim = useClaimOffer(props.offer.id)

  const [contactFormOpen, setContactForm] = React.useState(false)
  const toggleContactForm = React.useCallback(() => setContactForm((state) => !state), [])

  const canClaim = React.useMemo(() => props.offer.status === OfferStatus.claim, [])

  const isSuccessfull = React.useMemo(() => props.offer.softCapReached, [])

  const { amount: amountToClaim, loading: amountLoading, error: amountError } = useInvestedAmount(props.offer.id)

  const onSubmit = React.useCallback(async () => {
    try {
      // TODO: blockchain part
      await claim(isSuccessfull)

      addPopup({ info: { success: true, summary: 'Claimed successfully' } })
    } catch (err) {
      addPopup({ info: { success: false, summary: `Error occured during claim: ${err}` } })
    }
  }, [claim])

  // todo add check was claimed already when backend is ready
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
              {amountToClaim ?? 0} {isSuccessfull ? props.offer.tokenSymbol : props.offer.investingTokenSymbol}
            </MyInvestmentAmount>
          )}
          {amountError}
        </Column>

        {!isSuccessfull && (
          <ClaimedFilledButton onClick={onSubmit} disabled={!canClaim || (amountToClaim ?? 0) <= 0}>
            Claim
          </ClaimedFilledButton>
        )}
      </Row>

      <Separator />

      {!canClaim && (
        <Row alignItems="center" gap="1rem">
          <Clock color={theme.launchpad.colors.primary} size="50" />
          <CantClaimNotice>
            Upon the commencement of the token claim deal stage, the issuer will initiate a batch claim 
            process for the tokens. The tokens will be automatically distributed to the investor&apos;s wallets 
            as a consequence of this process
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
            network={props.offer.network}
            address={isSuccessfull ? props.offer.tokenAddress : props.offer.investingTokenAddress}
            symbol={isSuccessfull ? props.offer.tokenSymbol : props.offer.investingTokenSymbol}
            decimals={isSuccessfull ? props.offer.decimals : props.offer.investingTokenDecimals}
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

              <ContactForm offerId={props.offer.id} onSubmit={props.onClose} />
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
