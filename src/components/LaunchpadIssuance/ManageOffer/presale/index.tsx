import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { GridItem, GridContainer } from 'components/Grid'
import {
  ApprovedRejectedOrderConfig,
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
import { OfferApproveRejectList } from './ApproveRejectList'

interface Props {
  offer: ManagedOffer
}

export const PresaleBlock = ({ offer }: Props) => {
  const { id: offerId, status } = offer

  const getStatistics = useGetManagedOfferPresaleStatistics()
  const getWhitelists = useGetManagedOfferPresaleWhitelists()

  const [data, setData] = useState<PaginationRes<OfferPresaleWhitelist>>()
  const [approvedRejectedData, setApprovedRejectedData] = useState<PaginationRes<OfferPresaleWhitelist>>()
  const [statistics, setStatistics] = useState<OfferPresaleStatistics>()

  const [page, setPage] = useState<number>(1)
  const [ARListsPage, setARListsPage] = useState<number>(1)

  const [pageSize, setPageSize] = useState<number>(8)
  const [ARListsPageSize, setARListsPageSize] = useState<number>(8)
  
  const [order, setOrder] = useState<PresaleOrderConfig>({})
  const [ARListsOrder, setARListsOrder] = useState<ApprovedRejectedOrderConfig>({})

  const [isLoading, setLoading] = useState<boolean>(false)
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  const [isARLoading, setARLoading] = useState<boolean>(false)
  const startARLoading = () => setARLoading(true)
  const stopARLoading = () => setARLoading(false)

  const refreshWhitelists = useCallback(() => {
    startLoading()
    getWhitelists(offerId, page, true, order, pageSize).then((res: PaginationRes<OfferPresaleWhitelist>) => {
      setData(res)
      stopLoading()
    })
  }, [offerId, page, order, pageSize])
  useEffect(() => {
    refreshWhitelists()
  }, [refreshWhitelists])

  const refreshApprovedRejectedLists = useCallback(() => {
    startLoading()
    getWhitelists(offerId, ARListsPage, false, ARListsOrder, ARListsPageSize).then((res: PaginationRes<OfferPresaleWhitelist>) => {
      setApprovedRejectedData(res)
      stopLoading()
    })
  }, [offerId, ARListsPage, ARListsOrder, ARListsPageSize])
  useEffect(() => {
    refreshApprovedRejectedLists()
  }, [refreshApprovedRejectedLists])

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

  if (!data || !approvedRejectedData || !statistics) {
    return <></>
  }

  return (
    <GridContainer>
      <StyledGridItem xs={12}>
        <OfferWhitelistInfo data={statistics} />
      </StyledGridItem>
      {/* <StyledGridItem xs={12}> */}
        <OfferWhitelistApprove
          offerId={offerId}
          totalItems={data.totalItems}
          refreshWhitelists={() => {
            refreshWhitelists()
            setPage(1)
          }}
          disabledManage={disabledManage}
        />
      {/* </StyledGridItem> */}
      {/* <StyledGridItem xs={12} noPadding> */}
        <OfferWhitelistList
          data={data}
          refreshWhitelists={() => {
            refreshWhitelists()
            setPage(1)
            refreshApprovedRejectedLists()
            setARListsPage(1)
          }}
          order={order}
          setOrder={setOrder}
          page={page}
          setPage={setPage}
          startLoading={startLoading}
          stopLoading={stopLoading}
          isLoading={isLoading}
          startARLoading={startARLoading}
          stopARLoading={stopARLoading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          disabledManage={disabledManage}
          offer={offer}
        />
      {/* </StyledGridItem> */}
      <OfferApproveRejectList
          data={approvedRejectedData}
          refreshWhitelists={() => {
            refreshApprovedRejectedLists()
            setARListsPage(1)
          }}
          order={ARListsOrder}
          setOrder={setARListsOrder}
          page={ARListsPage}
          setPage={setARListsPage}
          startLoading={startARLoading}
          stopLoading={stopARLoading}
          isLoading={isARLoading}
          pageSize={ARListsPageSize}
          setPageSize={setARListsPageSize}
          disabledManage={disabledManage}
          offer={offer}
        />
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
