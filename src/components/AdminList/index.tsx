import React, { FC, useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { isMobile } from 'react-device-detect'
import { t } from '@lingui/macro'

import { Table } from '../Table'
import { Container } from 'components/AdminAccreditationTable'
import { Wallet } from 'components/AdminKyc'
import { AddAdmin } from 'components/AddAdmin'
import { useAdminState, useGetAdminList } from 'state/admin/hooks'
import { adminOffset as offset } from 'state/admin/constants'

import { StyledSearchInput } from 'pages/CustodianV2/styleds'
import { StyledBodyRow, StyledHeaderRow } from './styleds'

const headerCells = [t`Wallet address`, '', ``]

export const AdminList: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const { adminList } = useAdminState()
  const getAdminList = useGetAdminList()

  console.log(adminList)

  useEffect(() => {
    getAdminList({ page: 1, offset, ...(searchValue && { search: searchValue }) })
  }, [getAdminList, searchValue])

  return (
    <Container>
      <Flex flexDirection={isMobile ? 'column' : 'row'} marginBottom="33px">
        <StyledSearchInput setSearchValue={setSearchValue} placeholder={t`Search`} />
        <AddAdmin buttonStyles={{ marginTop: isMobile ? 16 : 0, marginLeft: isMobile ? 0 : 33 }} />
      </Flex>

      <Table body={<Body />} header={<Header />} />
    </Container>
  )
}

const Row = () => (
  <StyledBodyRow>
    <Wallet>
      0x79D1...E93e
      {/* {shortenAddress(ethAddress || '')} */}
    </Wallet>
    <div>Change Role</div>
    <div>Remove</div>
  </StyledBodyRow>
)

const Body = () => {
  return (
    <>
      {[1, 2, 3].map((item) => {
        return <Row key={`kyc-table-${item}`} />
      })}
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
