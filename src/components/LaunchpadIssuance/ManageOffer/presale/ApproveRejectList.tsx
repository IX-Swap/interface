import React, { useCallback, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Check, X, MoreHorizontal } from 'react-feather'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useManagePresaleWhitelists, useOnChangeOrder } from 'state/launchpad/hooks'
import {
  AbstractOrder,
  ApprovedRejectedOrderConfig,
  ManagedOffer,
  OfferPresaleWhitelist,
  PaginationRes,
  PresaleOrderConfig,
  WhitelistStatus,
} from 'state/launchpad/types'
import { IssuanceTable, TableHeader, IssuanceRow, Raw, IconRaw } from 'components/LaunchpadMisc/tables'
import { SortIcon } from 'components/LaunchpadIssuance/utils/SortIcon'
import { IssuanceFilter } from 'components/LaunchpadIssuance/types'
import { formatDates } from '../utils'
import { BaseCheckbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { EmptyTable } from 'components/LaunchpadIssuance/utils/EmptyTable'
import { IssuancePagination } from 'components/LaunchpadIssuance/IssuanceDashboard/IssuancePagination'
import { ExtractButton, ExtractText, HeaderLabel, TableTitle } from '../shared/styled'
import { DiscreteInternalLink } from 'theme'
import { text46 } from 'components/LaunchpadMisc/typography'
import { style } from 'styled-system'
import { Line } from 'components/Line'
import rejectedIcon from 'assets/images/newReject.svg'
import approvedIcon from 'assets/images/newRightCheck.svg'

interface Props {
  data: PaginationRes<OfferPresaleWhitelist>
  refreshWhitelists: () => any
  order: ApprovedRejectedOrderConfig
  setOrder: (order: ApprovedRejectedOrderConfig) => void
  page: number
  setPage: (page: number) => void
  startLoading: () => any
  stopLoading: () => any
  isLoading: boolean
  pageSize: number
  setPageSize: (page: number) => void
  disabledManage: boolean
  offer: ManagedOffer
}

export const OfferApproveRejectList = ({
  data,
  refreshWhitelists,
  order,
  setOrder,
  page,
  setPage,
  startLoading,
  stopLoading,
  isLoading,
  pageSize,
  setPageSize,
  disabledManage,
  offer,
}: Props) => {
  const { id: offerId, investingTokenSymbol, issuanceId } = offer
  const { totalItems, totalPages, items } = data
  const theme = useTheme()
  const manageWhitelists = useManagePresaleWhitelists()
  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder, setPage)
  const [selected, setSelected] = useState<number[]>([])
  const actionsDisabled = useMemo(() => disabledManage || !selected.length, [disabledManage, selected])

  const approveSelected = () => {
    if (actionsDisabled) return
    startLoading()
    manageWhitelists.load(offerId, { approveIds: selected }).then(() => {
      stopLoading()
      setSelected([])
      refreshWhitelists()
    })
  }
  const rejectSelected = () => {
    if (actionsDisabled) return
    startLoading()
    manageWhitelists.load(offerId, { rejectIds: selected }).then(() => {
      stopLoading()
      setSelected([])
      refreshWhitelists()
    })
  }

  const onChangePage = (newPage: number) => {
    setPage(newPage)
    setSelected([])
  }
  const extractLink = useMemo(() => `/issuance/extract/${issuanceId}?tab=registration&page=1`, [issuanceId])

  const getStatusIcon = (status: string) => {
    if (status === WhitelistStatus.declined) return rejectedIcon
    else return approvedIcon
  }

  return (
    <Container>
      <Header>
        <TableTitle>Recent Approved/Rejected Registrations to Invest</TableTitle>
      </Header>
      {items.length > 0 && (
        <IssuanceTable maxWidth="100%">
          <TableHeader tab={IssuanceFilter.pending}>
            <HeaderLabel onClick={() => onChangeOrder('name')}>
              <SortIcon type={order.name} />
              Name
            </HeaderLabel>
            <HeaderLabel onClick={() => onChangeOrder('amount')}>
              <SortIcon type={order.amount} />
              Est. Invest. Size
            </HeaderLabel>
            <HeaderLabel onClick={() => onChangeOrder('createdAt')}>
              <SortIcon type={order.createdAt} />
              Application Date
            </HeaderLabel>
            <HeaderLabel onClick={() => onChangeOrder('status')}>
              <SortIcon type={order.status} />
              Status
            </HeaderLabel>
          </TableHeader>
          {isLoading && (
            <Centered>
              <Loader />
            </Centered>
          )}
          {!isLoading &&
            items.map((item, idx) => (
              <IssuanceRow key={idx} tab={IssuanceFilter.pending}>
                <Raw>{item.name || '<Name Uknown>'}</Raw>
                <Raw>{(+item.amount).toLocaleString() + ' ' + investingTokenSymbol}</Raw>
                <Raw>{formatDates(item.createdAt)}</Raw>
                <IconRaw>
                  <img src={getStatusIcon(item.status)} alt="icon" width="20px" height="20px" />
                  {item.status === WhitelistStatus.accepted ? 'Approved' : 'Rejected'}
                </IconRaw>
              </IssuanceRow>
            ))}
        </IssuanceTable>
      )}
      {!isLoading && !totalItems && <EmptyTable title="No users" containerMaxWidth="100%" hideBorder />}
      <IssuancePagination
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={page}
          pageSize={pageSize}
          onChangePageSize={setPageSize}
          onChangePage={onChangePage}
        />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  gap: 16px;
  margin: 0.5rem 0;
`
const ButtonLabel = styled.span<{ disabled: boolean }>`
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
const SelectAll = styled.div<{ disabled: boolean }>`
  ${text46}
  color: ${(props) => props.theme.launchpad.colors.primary};
  cursor: pointer;
  text-align: right;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
const CheckBoxContainer = styled.div`
  text-align: right;
`
