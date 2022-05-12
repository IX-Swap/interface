import React, { FC, useEffect, useState } from 'react'
import { Trans, t } from '@lingui/macro'

import { Table } from '../Table'
import { Container } from 'components/AdminAccreditationTable'
import { Wallet } from 'components/AdminKyc'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { EditAdmin } from './EditAdmin'
import { useAdminState, useGetAdminList, useOnlyAdminAccess } from 'state/admin/hooks'
import { adminOffset as offset } from 'state/admin/constants'
import { Search } from 'components/AdminAccreditationTable/Search'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { AdminRole } from 'state/admin/actions'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { CopyAddress } from 'components/CopyAddress'

import { TopContent, StyledBodyRow, StyledHeaderRow } from './styleds'
import { ButtonGradientBorder } from 'components/Button'
import { updateUser } from 'state/user/hooks'
import { DeleteConfirmationPopup } from 'components/DeleteConfirmation'
import { useAddPopup, useDeleteConfirmationPopupToggle } from 'state/application/hooks'
import { NoData } from 'components/Whitelist/styleds'

const headerCells = [t`Wallet address`, t`Role`, '', '']

interface BodyProps {
  changeRoleClick: (address: string, role: string) => void
  items: AdminRole[]
  callbackParams: any[]
  setCallbackParams: (value: any[]) => void
  refreshCallback: () => void
}

interface RowProps {
  changeRoleClick: (address: string, role: string) => void
  item: AdminRole
  callbackParams: any[]
  setCallbackParams: (value: any[]) => void
  refreshCallback: () => void
}

export const AdminList: FC = () => {
  useOnlyAdminAccess()
  const [isUpdating, setIsUpdating] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalError, handleError] = useState('')
  const [adminRole, handleRole] = useState('')
  const [updateAddress, setUpdateAddress] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const { adminList, adminLoading } = useAdminState()
  const [callbackParams, setCallbackParams] = useState<any>([])
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

  const refreshCallback = () => {
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
    <Container>
      <LoadingIndicator isLoading={adminLoading} />
      <TopContent marginBottom="33px">
        <Search style={{ marginBottom: 0 }} setSearchValue={setSearchValue} placeholder={t`Search`} />
        <EditAdmin
          isUpdating={isUpdating}
          address={updateAddress}
          handleAddress={setUpdateAddress}
          close={closeUpdateModal}
          isOpen={modalOpen}
          refreshCallback={refreshCallback}
          open={openUpdateModal}
          error={modalError}
          handleError={handleError}
          role={adminRole}
          handleRole={handleRole}
        />
      </TopContent>

      {(adminList as any)?.items?.length > 0 ? (
        <Table
          body={
            <Body
              callbackParams={callbackParams}
              setCallbackParams={setCallbackParams}
              changeRoleClick={changeRoleClick}
              refreshCallback={refreshCallback}
              items={adminList?.items || []}
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

const Row: FC<RowProps> = ({ callbackParams, setCallbackParams, item, refreshCallback, changeRoleClick }) => {
  const [copied, setCopied] = useCopyClipboard()
  const { ethAddress, role } = item
  const toggle = useDeleteConfirmationPopupToggle()
  const addPopup = useAddPopup()

  const updateAdminRole = async (address: string, newRole: string) => {
    const data = await updateUser(address, { role: newRole, language: 'en', active: true, photoId: 0 })
    toggle()
    if (data?.id) {
      addPopup({
        info: {
          success: true,
          summary: `Admin was deleted successfully`,
        },
      })
      refreshCallback()
    } else {
      addPopup({
        info: {
          success: false,
          summary: `Something went wrong`,
        },
      })
    }
  }

  return (
    <>
      <StyledBodyRow>
        <Wallet>
          <CopyAddress address={ethAddress} copied={copied} setCopied={setCopied} />
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
              toggle()
              setCallbackParams([ethAddress, 'user'])
            }}
            style={{ fontSize: 16, minHeight: 40, height: 40 }}
          >
            Remove
          </ButtonGradientBorder>
        </div>
      </StyledBodyRow>
      <DeleteConfirmationPopup callbackParams={callbackParams} confirmCallback={updateAdminRole} />
    </>
  )
}
const Body: FC<BodyProps> = ({ items, callbackParams, refreshCallback, setCallbackParams, changeRoleClick }) => {
  return (
    <>
      {items.map((item) => (
        <Row
          callbackParams={callbackParams}
          setCallbackParams={setCallbackParams}
          refreshCallback={refreshCallback}
          changeRoleClick={changeRoleClick}
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
