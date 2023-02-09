import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { OfferStatus } from 'state/launchpad/types'
import { OfferStatistics } from './Statistics'
import { useGetManagedOffer } from 'state/launchpad/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OfferStages } from './Stages'
import { PresaleBlock } from './presale'
import { HeaderButtons } from './HeaderButtons'
import { OFFER_STATUSES } from '../utils/constants'
import { LaunchpadWhitelistWallet } from 'components/Launchpad/LaunchpadWhitelistWallet'

interface ManagedOfferPageParams {
  offerId: string;
}

export const ManageOffer = () => {
  const theme = useTheme()
  const history = useHistory()
  const goBack = React.useCallback(() => history.push('/issuance'), [history])
  const [isOpenWhitelisting, setOpenWhitelisting] = useState(false);

  const params = useParams<ManagedOfferPageParams>()
  const { loading, data: offer } = useGetManagedOffer(params.offerId);
  const { usersClaimed, issuerClaimed, status } = offer || {};

  // todo when sale stage: depending on HeaderButtons."stage" - show different data and change showWhitelisting.
  const showWhitelisting = useMemo(() => status && [OfferStatus.whitelist].includes(status), [status]);
  const isClaim = useMemo(() => status === OfferStatus.claim, [status]);

  const claimBtnTitle = useMemo(() => {
    if (loading || !isClaim) {
      return '';
    }
    if (!usersClaimed) {
      return 'Start Claim Process';
    }
    if (usersClaimed && !issuerClaimed) {
      return 'Withdraw Funds';
    }
    return '';
  }, [loading, isClaim, usersClaimed, issuerClaimed]);

  if (loading) {
    return <Centered><Loader /></Centered>
  }
  if (!offer) {
    return <Centered>Not found</Centered>
  }
  if (!Object.keys(OFFER_STATUSES).includes(offer.status as any)) {
    return <Centered>Offer not started</Centered>
  }
  return (
    <Wrapper>
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
            <FilledButton style={{ marginLeft: '13px' }}>
              <ButtonLabel>{claimBtnTitle}</ButtonLabel>
            </FilledButton>
          )}
        </HeaderItem>
      </Header>

      <HeaderButtons offer={offer} />

      <CustomGridContainer>
        <StatisticsBoxItem>
          <OfferStatistics offer={offer} />
        </StatisticsBoxItem>
        <StagesBoxItem>
          <OfferStages offer={offer} />
        </StagesBoxItem>
      </CustomGridContainer>

      {showWhitelisting && (
        <PresaleBlock offerId={offer.id} issuanceId={offer.issuanceId} />
      )}
    </Wrapper>
  )
}

const BoxItem = styled.div`
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(230, 230, 255, 0.8);
  border-radius: 8px;
  padding: 28px 22px 26px;
  margin-bottom: 20px;
`;
const CustomGridContainer = styled.div`
  display: grid; 
  grid-template-columns: 3.13fr 1fr; 
  grid-auto-rows: auto;
  gap: 16px 16px; 
  grid-template-areas:
    "statistics stages"
`;
const StatisticsBoxItem = styled(BoxItem)`
  grid-area: statistics;  
`;
const StagesBoxItem = styled(BoxItem)`
  grid-area: stages;  
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 22px 0 16px;
`;
const HeaderItem = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonLabel = styled.span`
  font-weight: 600;
`
const Wrapper = styled.article`
  min-height: 100vh;
  padding: 0 10%;
  width: 100%;
  margin: auto;
  color: ${props => props.theme.launchpad.colors.text.title};
`;
const BackButton = styled(FilledButton)`
  padding: 0;
  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.primary + '14'};
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

  color: ${props => props.theme.launchpad.colors.text.title};
`
const Centered = styled(Wrapper)`
  display: grid;
  place-content: center;
`
