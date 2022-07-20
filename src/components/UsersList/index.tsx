import React, { FC, useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'

import { Trans, t } from '@lingui/macro'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'

import { Wallet } from 'components/AdminKyc'
import { CopyAddress } from 'components/CopyAddress'
import { NoData } from 'components/UsersList/styleds'
import { ButtonGradientBorder } from 'components/Button'
import { MultipleFilters } from 'components/MultipleFilters'
import { Container } from 'components/AdminAccreditationTable'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { FILTERS } from 'components/MultipleFilters/constants'

import { useSecTokenState } from 'state/secTokens/hooks'
import { useAdminState, useGetUsersList, useOnlyAdminAccess } from 'state/admin/hooks'

import { adminOffset as offset } from 'state/admin/constants'
import { TokenManagerEntry, User } from 'state/admin/actions'

import checkIcon from 'assets/images/check-success.svg'
import notCheckIcon from 'assets/images/reject.svg'
import expandIcon from 'assets/images/dropdown.svg'

import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { Pagination } from 'components/Pagination'
import { ROLES_LABEL, ROLES } from 'constants/roles'

import { Table } from '../Table'
import { UserModal } from './UserModal'
import { TopContent, StyledBodyRow, StyledHeaderRow, StyledAccordion, ExpandIcon, AddButton } from './styleds'
import { TokenManagerTokens } from './TokenManagerTokens'

const headerCells = [t`Wallet address`, t`Role`, t`Name`, t`Security Token`, t`Whitelisted`, '']

interface BodyProps {
  changeUser: (item: User) => void
  items: User[]
}

interface RowProps {
  changeUser: (item: User) => void
  item: User
}

export const UsersList: FC = () => {
  useOnlyAdminAccess()
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)
  const [selectedItem, handleSelectedItem] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { usersList, adminLoading } = useAdminState()
  const getUsersList = useGetUsersList()

  useEffect(() => {
    if (Object.keys(filters).length) {
      handleHaveFilters(true)
    }
    getUsersList({ ...filters, offset, page: 1 })
  }, [filters, getUsersList])

  const openUpdateModal = () => {
    setModalOpen(true)
  }

  const closeUpdateModal = () => {
    setModalOpen(false)
    handleSelectedItem(null)
  }

  const changeUser = (item: User) => {
    handleSelectedItem(item)
    setModalOpen(true)
  }

  const onPageChange = (page: number) => {
    getUsersList({ ...filters, page, offset })
  }

  return (
    <Container>
      <LoadingIndicator isLoading={adminLoading} />
      {modalOpen && <UserModal item={selectedItem} close={closeUpdateModal} filters={filters} />}
      <TopContent marginBottom="33px">
        <MultipleFilters
          filters={[FILTERS.SEARCH, FILTERS.ROLES, FILTERS.SEC_TOKENS]}
          onFiltersChange={handleFilters}
          searchPlaceholder="Search by Wallet or Name"
        />
        <AddButton onClick={openUpdateModal}>
          <Trans>Add User</Trans>
        </AddButton>
      </TopContent>

      {usersList.items.length > 0 ? (
        <>
          <Table body={<Body changeUser={changeUser} items={usersList.items} />} header={<Header />} />
          <Pagination totalPages={usersList.totalPages} page={usersList.page || 1} onPageChange={onPageChange} />
        </>
      ) : (
        <NoData>
          <Trans>{haveFilters ? `We couldn't find anything with this criteria` : 'No results'}</Trans>
        </NoData>
      )}
    </Container>
  )
}

interface TokenListPreviewProps {
  items: TokenManagerEntry[]
}

const TokenList = styled.div`
  display: flex;

  flex-flow: row nowrap;

  justify-content: flex-start;
  align-items: center;

  > * {
    margin-left: -10px;
  }

  > *:first-child {
    margin-left: 0;
  }
`

const TokenListPreview = (props: TokenListPreviewProps) => {
  const { tokens } = useSecTokenState()

  const icons = useMemo(() => {
    const ids = props.items.slice(0, 5).map((i) => i.token.id)

    return tokens
      ?.filter((token) => ids.includes(token.id))
      ?.map((token) => <CurrencyLogo key={`logo-${token.id}`} size="28px" currency={new WrappedTokenInfo(token)} />)
  }, [props.items, tokens])

  return <TokenList>{icons}</TokenList>
}

const Row: FC<RowProps> = ({ item, changeUser }) => {
  const [expanded, handleExpanded] = useState(false)
  const { ethAddress, role, username, isWhitelisted, managerOf } = item
  const needAccordion = role === ROLES.TOKEN_MANAGER && Boolean(managerOf?.length)

  const toggleAccordion = () => {
    if (needAccordion) {
      handleExpanded((state) => !state)
    }
  }

  return (
    <>
      <StyledAccordion elevation={0} expanded={expanded} onChange={toggleAccordion}>
        <AccordionSummary
          style={{ padding: 0, margin: 0, background: 'transparent', cursor: needAccordion ? 'pointer' : 'default' }}
        >
          <StyledBodyRow>
            <Wallet>
              <CopyAddress address={ethAddress} />
            </Wallet>
            <div>{ROLES_LABEL[role]}</div>
            <div>{username || '-'}</div>

            {role === ROLES.TOKEN_MANAGER && <TokenListPreview items={managerOf as TokenManagerEntry[]} />}
            {role !== ROLES.TOKEN_MANAGER && <div> - </div>}

            <div>
              <img src={isWhitelisted ? checkIcon : notCheckIcon} alt="is-whitelisted" />
            </div>
            <div>
              <ButtonGradientBorder
                onClick={(e: any) => {
                  e.preventDefault()
                  e.stopPropagation()
                  changeUser(item)
                }}
              >
                Edit
              </ButtonGradientBorder>
              {needAccordion && <ExpandIcon src={expandIcon} alt="expandIcon" expanded={expanded} />}
            </div>
            {/* <div>
          <ButtonGradientBorder
            onClick={() => {
              toggle()
              setCallbackParams([ethAddress, 'user'])
            }}
            style={{ fontSize: 16, minHeight: 40, height: 40 }}
          >
            Remove
          </ButtonGradientBorder>
        </div> */}
          </StyledBodyRow>
        </AccordionSummary>
        <AccordionDetails>
          <TokenManagerTokens items={managerOf as TokenManagerEntry[]} />
        </AccordionDetails>
      </StyledAccordion>
    </>
  )
}
const Body: FC<BodyProps> = ({ items, changeUser }) => {
  return (
    <>
      {items.map((item) => (
        <Row changeUser={changeUser} item={item} key={`kyc-table-${item.id}`} />
      ))}
    </>
  )
}

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div key={cell}>{cell}</div>
      ))}
    </StyledHeaderRow>
  )
}
