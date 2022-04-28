import React, { FC, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'

import { Container } from 'components/AdminAccreditationTable'
import { Wallet } from 'components/AdminKyc'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAddOrRemoveWhitelisted, useAdminState, useGetWhitelistedList, useOnlyAdminAccess } from 'state/admin/hooks'
import { adminOffset as offset } from 'state/admin/constants'
import { Search } from 'components/AdminAccreditationTable/Search'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { shortenAddress } from 'utils'
import { StyledCopy } from 'components/AdminTransactionsTable'
import { AdminRole } from 'state/admin/actions'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonGradientBorder } from 'components/Button'
import { DeleteConfirmationPopup } from 'components/DeleteConfirmation'
import { useDeleteConfirmationPopupToggle } from 'state/application/hooks'

import { AddAddress } from './AddAddress'
import { Table } from '../Table'
import { TopContent, StyledBodyRow, StyledHeaderRow, NoData } from './styleds'

const headerCells = [t`Wallet address`, '']

interface BodyProps {
  items: AdminRole[]
}

interface RowProps {
  item: AdminRole
  handleEthAddressToDelete: (value: string) => void
}

export const Whitelist: FC = () => {
  useOnlyAdminAccess()
  const [searchValue, setSearchValue] = useState('')
  const { whitelistedList, adminLoading } = useAdminState()
  const getWhitelisted = useGetWhitelistedList()

  useEffect(() => {
    getWhitelisted({ page: 1, offset, ...(searchValue && { search: searchValue }) })
  }, [getWhitelisted, searchValue])

  return (
    <Container>
      <LoadingIndicator isLoading={adminLoading} />
      <TopContent>
        <Search style={{ marginBottom: 0 }} setSearchValue={setSearchValue} placeholder={t`Search`} />
        <AddAddress />
      </TopContent>
      {whitelistedList?.items?.length ? (
        <Table body={<Body items={whitelistedList.items} />} header={<Header />} />
      ) : (
        <NoData>
          <Trans>No data</Trans>
        </NoData>
      )}
    </Container>
  )
}

const Row: FC<RowProps> = ({ item, handleEthAddressToDelete }) => {
  const [copied, setCopied] = useCopyClipboard()
  const { ethAddress } = item
  const toggle = useDeleteConfirmationPopupToggle()

  return (
    <>
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

        <div>
          <ButtonGradientBorder
            onClick={() => {
              handleEthAddressToDelete(ethAddress)
              toggle()
            }}
            style={{ fontSize: 16, minHeight: 40, height: 40 }}
          >
            Remove
          </ButtonGradientBorder>
        </div>
      </StyledBodyRow>
    </>
  )
}

const Body: FC<BodyProps> = ({ items }) => {
  const removeWhitelisted = useAddOrRemoveWhitelisted()
  const [ethAddressToDelete, handleEthAddressToDelete] = useState('')

  const onRemove = (ethAddress: string) => {
    removeWhitelisted({ address: ethAddress, isWhitelisted: false })
  }

  return (
    <>
      {items.map((item) => (
        <Row item={item} key={`kyc-table-${item}`} handleEthAddressToDelete={handleEthAddressToDelete} />
      ))}
      <DeleteConfirmationPopup callbackParams={[ethAddressToDelete]} confirmCallback={onRemove} />
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
