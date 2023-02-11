import React, { useCallback, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Check, X, MoreHorizontal } from 'react-feather'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useManagePresaleWhitelists, useOnChangeOrder } from 'state/launchpad/hooks'
import { AbstractOrder, OfferPresaleWhitelist, PaginationRes, PresaleOrderConfig } from 'state/launchpad/types'
import { IssuanceTable, TableHeader, IssuanceRow, Raw } from 'components/LaunchpadMisc/tables'
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

interface Props {
  offerId: string
  issuanceId: number
  data: PaginationRes<OfferPresaleWhitelist>
  refreshWhitelists: () => any
  order: PresaleOrderConfig
  setOrder: (order: PresaleOrderConfig) => void
  page: number
  setPage: (page: number) => void
  startLoading: () => any
  stopLoading: () => any
  isLoading: boolean
  pageSize: number
  setPageSize: (page: number) => void
  disabledManage: boolean
}

export const OfferWhitelistList = ({
  offerId,
  issuanceId,
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
}: Props) => {
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
      refreshWhitelists()
    })
  }
  const rejectSelected = () => {
    if (actionsDisabled) return
    startLoading()
    manageWhitelists.load(offerId, { rejectIds: selected }).then(() => {
      stopLoading()
      refreshWhitelists()
    })
  }

  const onSelectAll = useCallback(() => {
    if (disabledManage) return
    const ids = items.map((i) => i.id)
    if (ids.length === selected.length) {
      setSelected([])
    } else {
      setSelected(ids)
    }
  }, [disabledManage, items, selected])

  const onToggleOne = useCallback(
    (id: number) => {
      if (disabledManage) return
      const shouldAdd = !selected.includes(id)
      const res = [...selected]
      if (shouldAdd) {
        res.push(id)
      } else {
        const index = res.indexOf(id)
        if (index !== -1) {
          res.splice(index, 1)
        }
      }
      setSelected([...new Set(res)])
    },
    [disabledManage, selected]
  )
  const getIsSelected = useCallback(
    (id: number) => {
      const isSelected = selected.includes(id)
      return isSelected
    },
    [selected]
  )
  const onChangePage = (newPage: number) => {
    setPage(newPage)
    setSelected([])
  }
  const extractLink = useMemo(() => `/issuance/extract-offers/${issuanceId}?tab=registration&page=1`, [issuanceId])

  return (
    <Container>
      <Header>
        <TableTitle>Approve Manually</TableTitle>
        <ButtonsContainer>
          <ExtractButton as={DiscreteInternalLink} to={extractLink}>
            <MoreHorizontal color={theme.launchpad.colors.primary} size={13} />
            <ExtractText>Extract Data</ExtractText>
          </ExtractButton>
          <OutlineButton color={theme.launchpad.colors.error} width="180px" onClick={approveSelected}>
            <ButtonLabel disabled={actionsDisabled}>Reject Selected</ButtonLabel>
            <X size={13} />
          </OutlineButton>
          <OutlineButton color={theme.launchpad.colors.primary} width="180px" onClick={rejectSelected}>
            <ButtonLabel disabled={actionsDisabled}>Approve selected</ButtonLabel>
            <Check size={13} />
          </OutlineButton>
        </ButtonsContainer>
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
            <SelectAll disabled={disabledManage} onClick={onSelectAll}>
              Select All
            </SelectAll>
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
                <Raw>{item.amount.toLocaleString()}</Raw>
                <Raw>{formatDates(item.createdAt)}</Raw>
                <CheckBoxContainer>
                  <BaseCheckbox state={getIsSelected(item.id)} toggle={() => onToggleOne(item.id)} />
                </CheckBoxContainer>
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
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px;
`
const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 16px;
`
const ButtonLabel = styled.span<{ disabled: boolean }>`
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
const SelectAll = styled.div<{ disabled: boolean }>`
  font-weight: 500;
  font-size: 13px;
  line-height: 48px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.primary};
  cursor: pointer;
  text-align: right;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
const CheckBoxContainer = styled.div`
  text-align: right;
`
