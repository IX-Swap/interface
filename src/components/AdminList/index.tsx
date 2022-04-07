import React, { FC, useState } from 'react'
import { Flex } from 'rebass'
import { isMobile } from 'react-device-detect'
import { t } from '@lingui/macro'

import { Table } from '../Table'
import { Container } from 'components/AdminAccreditationTable'
import { StyledSearchInput } from 'pages/CustodianV2/styleds'
import { StyledBodyRow, StyledHeaderRow } from './styleds'
import { Wallet } from 'components/AdminKyc'
import { AddAdmin } from 'components/AddAdmin'

const headerCells = [t`Wallet address`, '', ``]

export const AdminList: FC = () => {
  const [searchValue, setSearchValue] = useState('')

  const onSearchChange = (e: any) => {
    setSearchValue(e.currentTarget.value)
  }

  return (
    <Container>
      <Flex flexDirection={isMobile ? 'column' : 'row'} marginBottom="33px">
        <StyledSearchInput value={searchValue} placeholder={t`Search`} onChange={onSearchChange} />
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
