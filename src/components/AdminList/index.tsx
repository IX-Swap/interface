import React, { FC, useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { isMobile } from 'react-device-detect'
import { t, Trans } from '@lingui/macro'

import { Table } from '../Table'
import { Container } from 'components/AdminAccreditationTable'
import { Wallet } from 'components/AdminKyc'
import { EditAdmin } from './EditAdmin'
import { useAdminState, useGetAdminList } from 'state/admin/hooks'
import { adminOffset as offset } from 'state/admin/constants'
import { Loader } from '../AdminTransactionsTable'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Search } from 'components/AdminAccreditationTable/Search'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { shortenAddress } from 'utils'
import { StyledCopy } from 'components/AdminTransactionsTable'
import { AdminRole } from 'state/admin/actions'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'

import { StyledBodyRow, StyledHeaderRow } from './styleds'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonGradientBorder } from 'components/Button'
import { updateUser } from 'state/user/hooks'

const headerCells = [t`Wallet address`, t`Role`, '', '']

interface BodyProps {
  changeRoleClick: (address: string, role: string) => void
  items: AdminRole[]
}

interface RowProps {
  changeRoleClick: (address: string, role: string) => void
  item: AdminRole
}

export const AdminList: FC = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalError, handleError] = useState('')
  const [adminRole, handleRole] = useState('')
  const [updateAddress, setUpdateAddress] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const { adminList, adminLoading } = useAdminState()
  const getAdminList = useGetAdminList()

  const getPaginatedAdminList = () => {
    getAdminList({ page: 1, offset, ...(searchValue && { search: searchValue }) })
  }

  useEffect(() => {
    getPaginatedAdminList()
  }, [getAdminList, searchValue])

  const openUpdateModal = () => {
    handleError('')
    setIsUpdating(false)
    setModalOpen(true)
  }

  const closeUpdateModal = () => {
    setModalOpen(false)
    setUpdateAddress('')
  }

  const addAdminCallback = () => {
    getPaginatedAdminList()
  }

  const changeRoleClick = (address: string, role: string) => {
    handleError('')
    setIsUpdating(true)
    setModalOpen(true)
    setUpdateAddress(address)
    handleRole(role)
  }

  return (
    <>
      {adminLoading && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      <Container>
        <Flex flexDirection={isMobile ? 'column' : 'row'} marginBottom="33px">
          <Search style={{ marginBottom: 0 }} setSearchValue={setSearchValue} placeholder={t`Search`} />
          <EditAdmin
            isUpdating={isUpdating}
            address={updateAddress}
            handleAddress={setUpdateAddress}
            close={closeUpdateModal}
            isOpen={modalOpen}
            addAdminCallback={addAdminCallback}
            buttonStyles={{ marginTop: isMobile ? 16 : 0, marginLeft: isMobile ? 0 : 33 }}
            open={openUpdateModal}
            error={modalError}
            handleError={handleError}
            role={adminRole}
            handleRole={handleRole}
          />
        </Flex>

        {adminList && (
          <Table body={<Body changeRoleClick={changeRoleClick} items={adminList.items} />} header={<Header />} />
        )}
      </Container>
    </>
  )
}

const Row: FC<RowProps> = ({ item, changeRoleClick }) => {
  const [copied, setCopied] = useCopyClipboard()
  const { ethAddress, role } = item

  const updateAdminRole = async (address: string, newRole: string) => {
    await updateUser(address, { role: newRole })
  }

  return (
    <StyledBodyRow>
      <Wallet>
        {copied ? (
          <Trans>Copied</Trans>
        ) : (
          <>
            {shortenAddress(ethAddress || '')}
            <IconWrapper size={18} onClick={() => setCopied(ethAddress || '')}>
              <StyledCopy />
            </IconWrapper>
          </>
        )}
      </Wallet>
      <div>{capitalizeFirstLetter(role)}</div>
      <div>
        <ButtonGradientBorder
          onClick={() => {
            changeRoleClick(ethAddress, role)
          }}
          style={{ fontSize: 16, minHeight: 40, height: 40 }}
        >
          Change Role
        </ButtonGradientBorder>
      </div>
      <div>
        <ButtonGradientBorder
          onClick={() => {
            updateAdminRole(ethAddress, 'user')
          }}
          style={{ fontSize: 16, minHeight: 40, height: 40 }}
        >
          Remove
        </ButtonGradientBorder>
      </div>
    </StyledBodyRow>
  )
}
const Body: FC<BodyProps> = ({ items, changeRoleClick }) => {
  return (
    <>
      {items.map((item) => (
        <Row changeRoleClick={changeRoleClick} item={item} key={`kyc-table-${item}`} />
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
