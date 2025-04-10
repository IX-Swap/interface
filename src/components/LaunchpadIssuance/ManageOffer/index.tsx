import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { alpha } from '@material-ui/core/styles'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { OfferStatus, OfferTokenStandart } from 'state/launchpad/types'
import { OfferStatistics } from './Statistics'
import { useGetManagedOffer, useTriggerIssuerClaim, useTriggerUserClaim } from 'state/launchpad/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OfferStages } from './Stages'
import { PresaleBlock } from './presale'
import { HeaderButtons } from './HeaderButtons'
import { OFFER_STATUSES } from '../utils/constants'
import { LaunchpadWhitelistWallet } from 'components/Launchpad/LaunchpadWhitelistWallet'
import { InvestmentsBlock } from './investments'
import { useAddPopup, useShowError } from 'state/application/hooks'
import { text53 } from 'components/LaunchpadMisc/typography'
import { SMART_CONTRACT_STRATEGIES } from '../types'
import { ConfirmClaimModal } from './ConfirmClaimModal'
import { useRole } from 'state/user/hooks'

interface ManagedOfferPageParams {
  issuanceId: string
}

export const ManageOffer = () => {
  const theme = useTheme()
  const history = useHistory()
  const goBack = useCallback(() => history.push('/issuance'), [history])
  const addPopup = useAddPopup()
  const { isAdmin } = useRole()

  const [isOpenWhitelisting, setOpenWhitelisting] = useState(false)
  const [stage, setStage] = useState<OfferStatus>()
  const [confirmClaim, setConfirmClaim] = useState(false)

  const params = useParams<ManagedOfferPageParams>()
  const { loading, data: offer, load } = useGetManagedOffer(params.issuanceId)
  const {
    usersClaimed,
    investmentCount,
    issuerClaimed,
    status,
    softCapReached,
    isOwner,
    smartContractStrategy,
    distributionControllerAddress,
  } = offer || {}
  const showError = useShowError()

  const triggerUserClaim = useTriggerUserClaim(offer?.id)
  const triggerIssuerClaim = useTriggerIssuerClaim(offer?.id)

  const showWhitelisting = useMemo(() => stage === OfferStatus.whitelist, [stage])
  const canWithdraw = useMemo(
    () => (isAdmin || isOwner) && usersClaimed && !issuerClaimed,
    [isOwner, usersClaimed, issuerClaimed, isAdmin]
  )
  const claimBtnTitle = useMemo(() => {
    if (!softCapReached || (status && status !== OfferStatus.claim)) {
      return ''
    } else if (!usersClaimed) {
      // admin and offer manager can do
      return 'Start Claim Process'
    } else if (canWithdraw) {
      // offer manager can do
      return 'Withdraw Funds'
    }
    return ''
  }, [status, usersClaimed, canWithdraw])

  const claimTitleText = useMemo(() => {
    if (!softCapReached || (status && status !== OfferStatus.claim)) {
      return ''
    } else if (!usersClaimed) {
      // admin and offer manager can do
      return 'Before starting the Claim process please make sure the corresponding amount of RWAs has been transferred to this address'
    } else if (canWithdraw) {
      // offer manager can do
      return 'Before starting the Withdraw Funds process please make sure the corresponding amount of RWAs has been transferred to this address'
    }
    return ''
  }, [status, usersClaimed, canWithdraw])

  const showWhitelistBtn = useMemo(
    () =>
      offer
        ? offer.tokenStandart === OfferTokenStandart.xtokenlite &&
          offer.smartContractStrategy === SMART_CONTRACT_STRATEGIES.original
        : false,
    [offer]
  )

  const onClaimForUsers = useCallback(() => {
    if (triggerUserClaim.isLoading) return
    triggerUserClaim.load(undefined, () => {
      addPopup({ info: { success: true, summary: 'User claim has been triggered succesfully!' } })
      load()
      setConfirmClaim(false)
    })
  }, [triggerUserClaim.isLoading, triggerUserClaim.load, load])

  const onClaimForIssuer = useCallback(() => {
    if (triggerIssuerClaim.isLoading) return
    triggerIssuerClaim.load(undefined, () => {
      addPopup({ info: { success: true, summary: 'Funds have been withdrawn succesfully!' } })
      load()
      setConfirmClaim(false)
    })
  }, [triggerIssuerClaim.isLoading, triggerIssuerClaim.load, load])

  const onClaim = useCallback(() => {
    if (!usersClaimed) {
      return onClaimForUsers()
    } else if (canWithdraw) {
      return onClaimForIssuer()
    }
  }, [usersClaimed, canWithdraw, onClaimForUsers, onClaimForIssuer])

  useEffect(() => {
    if (status) {
      setStage(status)
    }
  }, [status])

  useEffect(() => {
    const triggerError = triggerUserClaim.error || triggerIssuerClaim.error
    if (triggerError) {
      showError(triggerError)
    }
  }, [triggerUserClaim.error, triggerIssuerClaim.error])

  if (loading || triggerIssuerClaim.isLoading || triggerUserClaim.isLoading) {
    return (
      <Centered>
        <Loader />
      </Centered>
    )
  }
  if (!offer) {
    return <Centered>Not found</Centered>
  }
  if (!Object.keys(OFFER_STATUSES).includes(offer.status as any)) {
    return <Centered>Offer not started</Centered>
  }

  const miniOffer = {
    id: offer.id,
    status: offer.status,
    hasPresale: offer.hasPresale,
    timeframe: offer.timeframe,
  }
  return (
    <Wrapper style={{ padding: '0px 8%' }}>
      <ConfirmClaimModal
        isOpen={confirmClaim}
        onClose={() => setConfirmClaim(false)}
        onAccept={onClaim}
        distributionControllerAddress={distributionControllerAddress}
        smartContractStrategy={smartContractStrategy}
        canWithdraw={canWithdraw}
        title={claimTitleText}
      />
      {isOpenWhitelisting && (
        <LaunchpadWhitelistWallet offerId={offer.id} isOpen={isOpenWhitelisting} setOpen={setOpenWhitelisting} />
      )}
      <Header>
        <HeaderItem>
          <BackButton background="none" onClick={goBack}>
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </BackButton>
          <FormTitle>{offer.title}</FormTitle>
        </HeaderItem>
        <HeaderItem>
          {showWhitelistBtn && (
            <OutlineButton style={{ border: '1px solid #6666FF33' }} onClick={() => setOpenWhitelisting(true)}>
              <ButtonLabel>Whitelist Wallet</ButtonLabel>
            </OutlineButton>
          )}
          {claimBtnTitle && (
            <FilledButton
              disabled={investmentCount === 0}
              style={{ marginLeft: '13px' }}
              onClick={() => setConfirmClaim(true)}
            >
              <ButtonLabel>{claimBtnTitle}</ButtonLabel>
            </FilledButton>
          )}
        </HeaderItem>
      </Header>

      <HeaderButtons offer={offer} stage={stage} setStage={setStage} />

      <CustomGridContainer>
        <StatisticsBoxItem>
          <OfferStatistics offer={offer} />
        </StatisticsBoxItem>
        <StagesBoxItem>
          <OfferStages offer={miniOffer} refreshOffer={load} />
        </StagesBoxItem>
      </CustomGridContainer>

      {showWhitelisting && <PresaleBlock offer={offer} />}
      {!showWhitelisting && <InvestmentsBlock offer={offer} chosenStage={stage} />}
    </Wrapper>
  )
}

const BoxItem = styled.div`
  box-sizing: border-box;
  background: ${({ theme }) => alpha(theme.launchpad.colors.background, 0.3)};
  border: 1px solid ${({ theme }) => alpha(theme.launchpad.colors.border.default, 0.8)};
  border-radius: 8px;
  padding: 28px 22px 26px;
  margin-bottom: 20px;
`
const CustomGridContainer = styled.div`
  display: grid;
  grid-template-columns: 3.13fr 1fr;
  grid-auto-rows: auto;
  gap: 16px 16px;
  grid-template-areas: 'statistics stages';
`
const StatisticsBoxItem = styled(BoxItem)`
  grid-area: statistics;
`
const StagesBoxItem = styled(BoxItem)`
  grid-area: stages;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 35px 0 16px;
`
const HeaderItem = styled.div`
  display: flex;
  align-items: center;
`
const ButtonLabel = styled.span`
  font-weight: 600;
`
const Wrapper = styled.article`
  min-height: 100vh;
  padding: 0 10%;
  width: 100%;
  margin: auto;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const BackButton = styled(FilledButton)`
  padding: 0;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary + '14'};
  border-radius: 6px;
  width: 48px;
  margin-right: 16px;
`
const FormTitle = styled.div`
  ${text53}

  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const Centered = styled(Wrapper)`
  display: grid;
  place-content: center;
`
