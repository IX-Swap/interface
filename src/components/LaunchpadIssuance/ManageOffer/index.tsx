import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { alpha } from '@material-ui/core/styles'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { OfferStatus } from 'state/launchpad/types'
import { OfferStatistics } from './Statistics'
import { useGetManagedOffer, useTriggerIssuerClaim, useTriggerUserClaim } from 'state/launchpad/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OfferStages } from './Stages'
import { PresaleBlock } from './presale'
import { HeaderButtons } from './HeaderButtons'
import { OFFER_STATUSES } from '../utils/constants'
import { LaunchpadWhitelistWallet } from 'components/Launchpad/LaunchpadWhitelistWallet'
import { InvestmentsBlock } from './investments'
import { useRole } from 'state/user/hooks'
import { ConfirmModal } from './shared/ConfirmModal'
import { useAddPopup, useShowError } from 'state/application/hooks'

interface ManagedOfferPageParams {
  issuanceId: string
}

export const ManageOffer = () => {
  const theme = useTheme()
  const history = useHistory()
  const { isOfferManager } = useRole()
  const goBack = useCallback(() => history.push('/issuance'), [history])
  const addPopup = useAddPopup()

  const [isOpenWhitelisting, setOpenWhitelisting] = useState(false)
  const [stage, setStage] = useState<OfferStatus>()
  const [confirmClaim, setConfirmClaim] = useState(false)

  const params = useParams<ManagedOfferPageParams>()
  const { loading, data: offer, load } = useGetManagedOffer(params.issuanceId)
  const { usersClaimed, issuerClaimed, status, softCapReached } = offer || {}
  const showError = useShowError()

  const triggerUserClaim = useTriggerUserClaim(offer?.id)
  const triggerIssuerClaim = useTriggerIssuerClaim(offer?.id)

  const showWhitelisting = useMemo(() => stage === OfferStatus.whitelist, [stage])
  const canWithdraw = useMemo(
    () => isOfferManager && usersClaimed && !issuerClaimed,
    [isOfferManager, usersClaimed, issuerClaimed]
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

  const onClaimForUsers = useCallback(() => {
    // todo add blockchain
    if (triggerUserClaim.isLoading) return
    triggerUserClaim.load(undefined, () => {
      addPopup({ info: { success: true, summary: 'User claim has been triggered succesfully!' } })
      load()
    })
  }, [triggerUserClaim.isLoading, triggerUserClaim.load, load])

  const onClaimForIssuer = useCallback(() => {
    // todo add blockchain
    if (triggerIssuerClaim.isLoading) return
    triggerIssuerClaim.load(undefined, () => {
      addPopup({ info: { success: true, summary: 'Funds have been withdrawn succesfully!' } })
      load()
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

  if (loading) {
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
    <Wrapper>
      <ConfirmModal isOpen={confirmClaim} setOpen={setConfirmClaim} onAccept={onClaim} />

      {isOpenWhitelisting && (
        <LaunchpadWhitelistWallet offerId={offer.id} isOpen={isOpenWhitelisting} setOpen={setOpenWhitelisting} />
      )}
      <Header>
        <HeaderItem>
          <BackButton background={theme.launchpad.colors.background} onClick={goBack}>
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </BackButton>
          <FormTitle>{offer.title}</FormTitle>
        </HeaderItem>
        <HeaderItem>
          <OutlineButton onClick={() => setOpenWhitelisting(true)}>
            <ButtonLabel>Whitelist Wallet</ButtonLabel>
          </OutlineButton>
          {claimBtnTitle && (
            <FilledButton style={{ marginLeft: '13px' }} onClick={() => setConfirmClaim(true)}>
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
  margin: 22px 0 16px;
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
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const Centered = styled(Wrapper)`
  display: grid;
  place-content: center;
`
