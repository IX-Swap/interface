import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GridItem, GridContainer } from 'components/Grid'
import { OfferPresaleStatistics, PresaleData, PresaleOrderConfig } from 'state/launchpad/types'
import { useGetManagedOfferPresaleStatistics, useGetManagedOfferPresaleWhitelists } from 'state/launchpad/hooks'
import { OfferWhitelistInfo } from './WhitelistInfo'
import { OfferWhitelistApprove } from './WhitelistApprove'
import { OfferWhitelistList } from './WhitelistList'

interface Props {
  offerId: string;
  issuanceId: number;
}

export const PresaleBlock = ({ offerId, issuanceId }: Props) => {
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
          issuanceId={issuanceId}
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

const StyledGridItem = styled(GridItem)`
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(230, 230, 255, 0.8);
  border-radius: 8px;
  padding: 22px !important;
  margin-bottom: 20px;
;`