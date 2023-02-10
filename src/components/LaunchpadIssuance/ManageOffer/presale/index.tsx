import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { GridItem, GridContainer } from 'components/Grid'
import {
  ManagedOffer,
  OfferPresaleStatistics,
  OfferPresaleWhitelist,
  OfferStatus,
  PaginationRes,
  PresaleOrderConfig,
} from 'state/launchpad/types'
import { useGetManagedOfferPresaleStatistics, useGetManagedOfferPresaleWhitelists } from 'state/launchpad/hooks'
import { OfferWhitelistInfo } from './WhitelistInfo'
import { OfferWhitelistApprove } from './WhitelistApprove'
import { OfferWhitelistList } from './WhitelistList'
import { alpha } from '@material-ui/core/styles'

interface Props {
  offer: ManagedOffer
}

export const PresaleBlock = ({ offer }: Props) => {
  const { id: offerId, issuanceId, status } = offer

  const getStatistics = useGetManagedOfferPresaleStatistics()
  const getWhitelists = useGetManagedOfferPresaleWhitelists()

  const [data, setData] = useState<PaginationRes<OfferPresaleWhitelist>>()
  const [statistics, setStatistics] = useState<OfferPresaleStatistics>()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8)
  const [order, setOrder] = useState<PresaleOrderConfig>({})
  const [isLoading, setLoading] = useState<boolean>(false)
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  const refreshWhitelists = useCallback(() => {
    startLoading()
    getWhitelists(offerId, page, order, pageSize).then((res: PaginationRes<OfferPresaleWhitelist>) => {
      setData(res)
      stopLoading()
    })
  }, [offerId, page, order, pageSize])
  useEffect(() => {
    refreshWhitelists()
  }, [refreshWhitelists])

  const refreshStatistics = useCallback(() => {
    startLoading()
    getStatistics(offerId).then((res: OfferPresaleStatistics) => {
      setStatistics(res)
      stopLoading()
    })
  }, [offerId])
  useEffect(() => {
    refreshStatistics()
  }, [refreshStatistics])

  const disabledManage = useMemo(() => ![OfferStatus.whitelist, OfferStatus.preSale].includes(status), [status])

  if (!data || !statistics) {
    return <></>
  }

  return (
    <GridContainer>
      <StyledGridItem xs={12}>
        <OfferWhitelistInfo data={statistics} />
      </StyledGridItem>
      <StyledGridItem xs={12}>
        <OfferWhitelistApprove
          offerId={offerId}
          totalItems={data.totalItems}
          refreshWhitelists={refreshWhitelists}
          disabledManage={disabledManage}
        />
      </StyledGridItem>
      <StyledGridItem xs={12} noPadding>
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
          disabledManage={disabledManage}
        />
      </StyledGridItem>
    </GridContainer>
  )
}

const StyledGridItem = styled(GridItem)<{ noPadding?: boolean }>`
  box-sizing: border-box;
  background: ${({ theme }) => alpha(theme.launchpad.colors.background, 0.3)};
  border: 1px solid ${({ theme }) => alpha(theme.launchpad.colors.border.default, 0.8)};
  border-radius: 8px;
  padding: ${(props) => (props.noPadding ? '0' : '22px !important')};
  margin-bottom: 20px; ;
`
