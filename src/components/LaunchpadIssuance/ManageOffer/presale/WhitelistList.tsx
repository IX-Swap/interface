import React, { useCallback, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Check, X, MoreHorizontal } from 'react-feather'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useManagePresaleWhitelists } from 'state/launchpad/hooks'
import { PresaleData, PresaleOrderConfig } from 'state/launchpad/types'
import { IssuanceTable, TableHeader, IssuanceRow, Raw } from 'components/LaunchpadMisc/tables'
import { SortIcon } from 'components/LaunchpadIssuance/utils/SortIcon'
import { IssuanceFilter } from 'components/LaunchpadIssuance/types'
import { formatDates } from '../utils'
import { BaseCheckbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { EmptyTable } from 'components/LaunchpadIssuance/utils/EmptyTable'
import { IssuancePagination } from 'components/LaunchpadIssuance/IssuanceDashboard/IssuancePagination'

interface Props {
  offerId: string
  issuanceId: number
  data: PresaleData
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
}: Props) => {
  const { totalItems, totalPages, items } = data
  const theme = useTheme()
  const history = useHistory()
  const manageWhitelists = useManagePresaleWhitelists()
  const [selected, setSelected] = useState<number[]>([])

  const approveSelected = () => {
    if (!selected.length) return
    startLoading()
    manageWhitelists.load(offerId, { approveIds: selected }).then(() => {
      stopLoading()
      refreshWhitelists()
    })
  }
  const rejectSelected = () => {
    if (!selected.length) return
    startLoading()
    manageWhitelists.load(offerId, { rejectIds: selected }).then(() => {
      stopLoading()
      refreshWhitelists()
    })
  }
  const onChangeOrder = React.useCallback(
    (key: string) => {
      const current = Object.keys(order)[0]
      if (!current || current !== key) {
        setOrder({ [key]: 'ASC' })
      }
      if (current === key) {
        const value = Object.values(order)[0]
        const manner = !value ? 'ASC' : value === 'ASC' ? 'DESC' : null

        setOrder({ [current]: manner })
      }
      setPage(1)
    },
    [order]
  )

  const onSelectAll = useCallback(() => {
    const ids = items.map((i) => i.id)
    if (ids.length === selected.length) {
      setSelected([])
    } else {
      setSelected(ids)
    }
  }, [items, selected])

  const onToggleOne = useCallback(
    (id: number) => {
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
    [selected]
  )

  const onExtractData = () => {
    history.push(`/issuance/extract-offers/${issuanceId}?tab=registration&page=1`)
  }
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
  return (
    <Container>
      <Header>
        <Title>Approve Manually</Title>
        <ButtonsContainer>
          <ExtractButton onClick={onExtractData}>
            <MoreHorizontal color={theme.launchpad.colors.primary} size={13} />
            <ExtractText>Extract Data</ExtractText>
          </ExtractButton>
          <OutlineButton color={theme.launchpad.colors.error} width="180px" onClick={approveSelected}>
            <ButtonLabel disabled={!selected.length}>Reject Selected</ButtonLabel>
            <X size={13} />
          </OutlineButton>
          <OutlineButton color={theme.launchpad.colors.primary} width="180px" onClick={rejectSelected}>
            <ButtonLabel disabled={!selected.length}>Approve selected</ButtonLabel>
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
            <SelectAll onClick={onSelectAll}>Select All</SelectAll>
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
      {!isLoading && !totalItems && <EmptyTable title="No users" containerMaxWidth="100%" />}
      <IssuancePagination
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={page}
        pageSize={pageSize}
        onChangePageSize={setPageSize}
        onChangePage={onChangePage}
        smallMargin
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
  margin-bottom: 20px;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 16px;
`
const ExtractButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const ExtractText = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.primary};
  margin-left: 10px;
`
const ButtonLabel = styled.span<{ disabled: boolean }>`
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
const HeaderLabel = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 48px;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};

  display: flex;
  flex-flow: row nowrap;
`
const SelectAll = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 48px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.primary};
  cursor: pointer;
  text-align: right;
`
const CheckBoxContainer = styled.div`
  text-align: right;
`
