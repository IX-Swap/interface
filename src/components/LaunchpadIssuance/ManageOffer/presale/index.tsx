import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { GridItem, GridContainer } from 'components/Grid'
import { Offer, OfferPresaleStatistics, PresaleData, PresaleOrderConfig } from 'state/launchpad/types'
import { useGetManagedOfferPresaleStatistics, useGetManagedOfferPresaleWhitelists } from 'state/launchpad/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OfferWhitelistInfo } from './WhitelistInfo'
import { OfferWhitelistApprove } from './WhitelistApprove'
import { OfferWhitelistList } from './WhitelistList'

interface Props {
  offerId: string;
}

export const PresaleBlock = ({ offerId }: Props) => {
  const getStatistics = useGetManagedOfferPresaleStatistics();
  const getWhitelists = useGetManagedOfferPresaleWhitelists();

  const [data, setData] = useState<PresaleData>();
  const [statistics, setStatistics] = useState<OfferPresaleStatistics>();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [order, setOrder] = useState<PresaleOrderConfig>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const refreshWhitelists = useCallback(() => {
    startLoading();
    getWhitelists(offerId, page, order, pageSize).then((res: PresaleData) => {
      setData(res);
      stopLoading();
    });
  }, [offerId, page, order, pageSize]);
  useEffect(() => {
    refreshWhitelists();
  }, [refreshWhitelists]);

  const refreshStatistics = useCallback(() => {
    startLoading();
    getStatistics(offerId).then((res: OfferPresaleStatistics) => {
      setStatistics(res);
      stopLoading();
    });
  }, [offerId]);
  useEffect(() => {
    refreshStatistics();
  }, [refreshStatistics]);

  if (!data || !statistics) {
    return (<></>);
  }
  return (
    <GridContainer>
      <StyledGridItem xs={12}>
        <OfferWhitelistInfo data={statistics} />
      </StyledGridItem>
      <StyledGridItem xs={12}>
        <OfferWhitelistApprove offerId={offerId} totalItems={data.totalItems} refreshWhitelists={refreshWhitelists} />
      </StyledGridItem>
      <StyledGridItem xs={12}>
        <OfferWhitelistList
          offerId={offerId}
          data={data}
          refreshWhitelists={refreshWhitelists}
          order={order}
          setOrder={setOrder}
          page={page}
          setPage={setPage}
          startLoading={startLoading}
          stopLoading={stopLoading}
          isLoading={isLoading}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </StyledGridItem>
    </GridContainer>
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
