import React, { FC, useState } from 'react'
import { Trans, t } from '@lingui/macro'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'

import { Container } from 'components/AdminAccreditationTable'
import { Wallet } from 'components/AdminKyc'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAdminState, useGetUsersList, useOnlyAdminAccess } from 'state/admin/hooks'
import { adminOffset as offset } from 'state/admin/constants'
import { User } from 'state/admin/actions'
import { CopyAddress } from 'components/CopyAddress'
import { ButtonGradientBorder } from 'components/Button'
import { NoData } from 'components/UsersList/styleds'
import checkIcon from 'assets/images/check-success.svg'
import notCheckIcon from 'assets/images/reject.svg'
import expandIcon from 'assets/images/dropdown.svg'
import { ROLES_LABEL, ROLES } from 'constants/roles'
import { MultipleFilters } from 'components/MultipleFilters'
import { FILTERS } from 'components/MultipleFilters/constants'

import { Table } from '../Table'
import { UserModal } from './UserModal'
import { TopContent, StyledBodyRow, StyledHeaderRow, StyledAccordion, ExpandIcon, AddButton } from './styleds'
import { TokenManagerTokens } from './TokenManagerTokens'

const headerCells = [t`Wallet address`, t`Role`, t`Name`, t`Security Token`, t`Whitelisted`, '']

interface BodyProps {
  changeUser: (item: User) => void
  items: User[]
  callbackParams: any[]
  setCallbackParams: (value: any[]) => void
  refreshCallback: () => void
}

interface RowProps {
  changeUser: (item: User) => void
  item: User
}

export const UsersList: FC = () => {
  useOnlyAdminAccess()
  const [selectedItem, handleSelectedItem] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { usersList, adminLoading } = useAdminState()
  const [callbackParams, setCallbackParams] = useState<any>([])
  const getAdminList = useGetUsersList()

  const getPaginatedAdminList = (filters?: Record<string, any>) => {
    getAdminList({ page: 1, offset, ...filters })
  }

  const openUpdateModal = () => {
    setModalOpen(true)
  }

  const closeUpdateModal = () => {
    setModalOpen(false)
    handleSelectedItem(null)
  }

  const refreshCallback = () => {
    getPaginatedAdminList()
  }

  const changeUser = (item: User) => {
    handleSelectedItem(item)
    setModalOpen(true)
  }

  return (
    <Container>
      <LoadingIndicator isLoading={adminLoading} />
      {modalOpen && <UserModal item={selectedItem} close={closeUpdateModal} />}
      <TopContent marginBottom="33px">
        <MultipleFilters
          filters={[FILTERS.SEARCH, FILTERS.ROLES, FILTERS.SEC_TOKENS]}
          callback={getPaginatedAdminList}
          searchPlaceholder="Search by Wallet or Name"
        />
        <AddButton onClick={openUpdateModal}>
          <Trans>Add User</Trans>
        </AddButton>
      </TopContent>

      {usersList.items.length > 0 ? (
        <Table
          body={
            <Body
              callbackParams={callbackParams}
              setCallbackParams={setCallbackParams}
              changeUser={changeUser}
              refreshCallback={refreshCallback}
              items={usersList.items}
            />
          }
          header={<Header />}
        />
      ) : (
        <NoData>
          <Trans>No results</Trans>
        </NoData>
      )}
    </Container>
  )
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
          style={{ margin: 0, background: 'transparent', cursor: needAccordion ? 'pointer' : 'default' }}
        >
          <StyledBodyRow>
            <Wallet>
              <CopyAddress address={ethAddress} />
            </Wallet>
            <div>{ROLES_LABEL[role]}</div>
            <div>{username || '-'}</div>
            <div>{role === ROLES.TOKEN_MANAGER ? `${managerOf?.length || 0} SEC Token's` : '-'}</div>
            <div>
              <img src={isWhitelisted ? checkIcon : notCheckIcon} alt="is-whitelisted" />
            </div>
            <div>
              <ButtonGradientBorder
                onClick={(e) => {
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
          <hr />
          <StyledBodyRow>
            <div />
            <div />
            <div />
            <div>
              <TokenManagerTokens items={managerOf} />
            </div>
            <div />
            <div />
          </StyledBodyRow>
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
