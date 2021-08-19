import React, { useState } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { Table, BodyRow, HeaderRow } from '../Table'
import { data } from './constants'
import { FirstStepStatus } from './FirstStepStatus'
import { SecondStepStatus } from './SecondStepStatus'
import { Pagination } from './Pagination'
import { MoreActions } from './MoreActions'

const headerCells = [
  t`Wallet address`,
  t`Token`,
  t`Date of request`,
  t`Accreditation pair`,
  t`Step 1 - Primary issuer`,
  t`Step 2 - Custodian`,
]

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div key={cell}>{cell}</div>
      ))}
    </StyledHeaderRow>
  )
}

const Body = () => {
  return (
    <>
      {data.map(({ id, wallet, createdAt, token, pair, step1, step2 }) => (
        <StyledBodyRow key={id}>
          <Wallet>{`${wallet.slice(0, 6)} ... ${wallet.slice(wallet.length - 4)}`}</Wallet>
          <div>{token}</div>
          <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
          <div>{pair}</div>
          <div>
            <FirstStepStatus {...step1} />
          </div>
          <div>{['pending', 'rejected'].includes(step1.status) ? <Dash /> : <SecondStepStatus {...step2} />}</div>
          <div>
            <MoreActions />
          </div>
        </StyledBodyRow>
      ))}
    </>
  )
}

export const AdminKycTable = () => {
  const totalPages = Math.ceil(data.length / 2)
  const [page, handlePage] = useState(1)

  return (
    <Container>
      <Table body={<Body />} header={<Header />} />
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePage} />
    </Container>
  )
}

const Dash = styled.div`
  background-color: ${({ theme: { bg7 } }) => bg7};
  width: 21px;
  height: 3px;
  border-radius: 40px;
`

const Wallet = styled.div`
  background: ${({ theme: { bgG3 } }) => bgG3};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 50px;
`

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 175px 75px 175px 200px calc((100% - 675px) / 2) calc((100% - 675px) / 2) 50px;
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 175px 75px 175px 200px calc((100% - 675px) / 2) calc((100% - 675px) / 2) 50px;
  min-width: 1270px;
`
