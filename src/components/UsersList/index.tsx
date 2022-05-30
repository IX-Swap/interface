import React, { FC, useEffect, useState } from 'react'
import { Trans, t } from '@lingui/macro'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'

import { Container } from 'components/AdminAccreditationTable'
import { Wallet } from 'components/AdminKyc'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAdminState, useGetUsersList, useOnlyAdminAccess } from 'state/admin/hooks'
import { adminOffset as offset } from 'state/admin/constants'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { User } from 'state/admin/actions'
import { CopyAddress } from 'components/CopyAddress'
import { ButtonGradientBorder } from 'components/Button'
import { updateUser } from 'state/user/hooks'
import { DeleteConfirmationPopup } from 'components/DeleteConfirmation'
import { NoData } from 'components/UsersList/styleds'
import checkIcon from 'assets/images/check-success.svg'
import notCheckIcon from 'assets/images/reject.svg'
import expandIcon from 'assets/images/dropdown.svg'
import { ROLES_LABEL, ROLES } from 'constants/roles'
import { MultipleFilters } from 'components/MultipleFilters'

import { Table } from '../Table'
import { UserModal } from './UserModal'
import { TopContent, StyledBodyRow, StyledHeaderRow, StyledAccordion, ExpandIcon } from './styleds'
import { FILTERS } from 'components/MultipleFilters/constants'

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
  callbackParams: any[]
  setCallbackParams: (value: any[]) => void
  refreshCallback: () => void
}

export const UsersList: FC = () => {
  useOnlyAdminAccess()
  const [selectedItem, handleSelectedItem] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { usersList, adminLoading } = useAdminState()
  const [callbackParams, setCallbackParams] = useState<any>([])
  const getAdminList = useGetUsersList()

  const getPaginatedAdminList = (filters?: Record<string, any>) => {
    getAdminList({ page: 1, offset, ...filters })
  }

  // useEffect(() => {
  //   getPaginatedAdminList()
  // }, [getAdminList, searchValue])

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
      <TopContent marginBottom="33px">
        <MultipleFilters
          filters={[FILTERS.SEARCH, FILTERS.ROLES, FILTERS.SEC_TOKENS]}
          callback={getPaginatedAdminList}
        />
        <UserModal
          item={selectedItem}
          close={closeUpdateModal}
          isOpen={modalOpen}
          refreshCallback={refreshCallback}
          open={openUpdateModal}
        />
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

const Row: FC<RowProps> = ({ callbackParams, item, changeUser }) => {
  const [copied, setCopied] = useCopyClipboard()
  const [expanded, handleExpanded] = useState(false)
  const { ethAddress, role, fullName, isWhitelisted, tokens } = item

  const toggleAccordion = () => {
    if (role === ROLES.TOKEN_MANAGER) {
      handleExpanded((state) => !state)
    }
  }

  return (
    <>
      <StyledAccordion elevation={0} expanded={expanded} onChange={toggleAccordion}>
        <AccordionSummary
          style={{ margin: 0, background: 'transparent', cursor: role === ROLES.TOKEN_MANAGER ? 'pointer' : 'default' }}
        >
          <StyledBodyRow>
            <Wallet>
              <CopyAddress address={ethAddress} copied={copied} setCopied={setCopied} />
            </Wallet>
            <div>{ROLES_LABEL[role]}</div>
            <div>{fullName || 'Full name'}</div>
            <div>{role === ROLES.TOKEN_MANAGER ? `${tokens?.length || 0} SEC Token's` : '-'}</div>
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
              {role === ROLES.TOKEN_MANAGER && <ExpandIcon src={expandIcon} alt="expandIcon" expanded={expanded} />}
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
            <div>Keka</div>
            <div />
            <div />
          </StyledBodyRow>
        </AccordionDetails>
      </StyledAccordion>
      <DeleteConfirmationPopup callbackParams={callbackParams} confirmCallback={updateUser} />
    </>
  )
}
const Body: FC<BodyProps> = ({ items, callbackParams, refreshCallback, setCallbackParams, changeUser }) => {
  return (
    <>
      {items.map((item) => (
        <Row
          callbackParams={callbackParams}
          setCallbackParams={setCallbackParams}
          refreshCallback={refreshCallback}
          changeUser={changeUser}
          item={item}
          key={`kyc-table-${item}`}
        />
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
