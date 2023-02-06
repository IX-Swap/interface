import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { GridItem, GridContainer } from 'components/Grid'
import { OfferPresaleStatistics, OfferPresaleWhitelist, OfferStatus } from 'state/launchpad/types'
import { OfferStatistics } from './Statistics'
import { useGetManagedOffer, useGetManagedOfferPresaleStatistics, useGetManagedOfferPresaleWhitelists } from 'state/launchpad/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OfferStages } from './Stages'
import { PresaleBlock } from './presale'

// todo 
interface ManagedOfferPageParams {
  offerId: string;
}
interface PresaleData {
  statistics: OfferPresaleStatistics;
  items: OfferPresaleWhitelist[];
  hasMore: boolean;
  totalPages: number;
  totalItems: number;
}

export const ManageOffer = () => {
  const theme = useTheme()
  const history = useHistory()
  const goBack = React.useCallback(() => history.push('/issuance'), [history])

  const params = useParams<ManagedOfferPageParams>()
  const { loading, data: offer } = useGetManagedOffer(params.offerId);
  const { usersClaimed, issuerClaimed, status, hasPresale } = offer || {};


  const showWhitelisting = useMemo(() => status && [OfferStatus.whitelist].includes(status), [status]); // todo
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

  // todo fix all console errors
  return (
    <Wrapper>

      <Header>
        <HeaderItem>
          <BackButton background={theme.launchpad.colors.background} onClick={goBack}>
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </BackButton>
          <FormTitle>{offer.title}</FormTitle>
        </HeaderItem>
        <HeaderItem>
          <OutlineButton>
            <ButtonLabel>Whitelist Wallet</ButtonLabel>
          </OutlineButton>
          {claimBtnTitle && (
            <FilledButton style={{ marginLeft: '13px' }}>
              <ButtonLabel>{claimBtnTitle}</ButtonLabel>
            </FilledButton>
          )}
        </HeaderItem>
      </Header>

      <Header>
        <HeaderItem>
          btns
        </HeaderItem>
        <HeaderItem>
          btns
        </HeaderItem>
      </Header>

      <CustomGridContainer>
        <StatisticsBoxItem>
          <OfferStatistics offer={offer} />
        </StatisticsBoxItem>
        <StagesBoxItem>
          <OfferStages offer={offer} />
        </StagesBoxItem>
      </CustomGridContainer>

      {showWhitelisting && (
        <PresaleBlock offer={offer} />
      )}
    </Wrapper>
  )
}

// todo usetheme colors
// todo Statistics Block margin grid
// todo remove StyledGridItem
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
const StyledGridItem = styled(GridItem)`
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(230, 230, 255, 0.8);
  border-radius: 8px;
  padding: 22px !important;
  margin-bottom: 20px;
;`
const Wrapper = styled.article`
  min-height: 100vh;
  padding: 0 10%;
  width: 100%;
  margin: auto;
  color: ${props => props.theme.launchpad.colors.text.title};
  // font-family: 'Inter' !important;
  // *>* {
  //   font-family: 'Inter' !important;
  // }
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
