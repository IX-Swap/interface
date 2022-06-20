import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
import { t } from '@lingui/macro'
import styled, { css } from 'styled-components'

import { Table, HeaderRow, BodyRow } from 'components/Table'
import { CopyAddress } from 'components/CopyAddress'
import CurrencyLogo from 'components/CurrencyLogo'
import { ExternalLink, TYPE } from 'theme'
import { Pagination } from 'components/AdminAccreditationTable/Pagination'

import { payoutHistory } from './mock'
import { momentFormatDate } from '../utils'

const headerCells = [t`Recipient’s wallet`, t`Amount claimed`, t`Date/Time of claim`, t`Transaction`]

interface RowProps {
  item: any
}

export const PayoutHistory: FC = () => {
  const onPageChange = () => {
    console.log('page changes')
  }

  return (
    <Box marginTop="16px">
      <Table style={{ marginBottom: 24 }} body={<Body />} header={<Header />} />
      <Pagination page={1} totalPages={5} onPageChange={onPageChange} />
    </Box>
  )
}

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <TYPE.buttonMuted fontWeight="600 !important" opacity="0.5" key={cell}>
          {cell}
        </TYPE.buttonMuted>
      ))}
    </StyledHeaderRow>
  )
}

const Body = () => {
  return (
    <>
      {payoutHistory.map((item) => {
        return <Row key={`history-table-${item.id}`} item={item} />
      })}
    </>
  )
}

const Row: FC<RowProps> = ({ item }) => {
  const { ethAddress } = item
  const now = new Date()

  return (
    <StyledBodyRow isMyClaim={item.id === 1}>
      <div>
        <CopyAddress address={ethAddress} />
      </div>
      <Flex alignItems="center">
        <CurrencyLogo size="20px" />
        <Box marginX="4px">{`COIN`}</Box>
        <Box>{`0.523`}</Box>
      </Flex>
      <div>{`${momentFormatDate(now)} - ${now.getHours()}:${now.getMinutes()}`}</div>
      <div style={{ textDecoration: 'underline' }}>
        <ExternalLink href={`https://dev.ixswap.io`}>View</ExternalLink>
      </div>
    </StyledBodyRow>
  )
}

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: repeat(3, 1fr) 200px;

  > div:first-child {
    padding-left: 32px;
  }
`

const StyledBodyRow = styled(BodyRow)<{ isMyClaim?: boolean }>`
  grid-template-columns: repeat(3, 1fr) 200px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  ${({ isMyClaim, theme }) =>
    isMyClaim &&
    css`
      background: ${theme.borderG1};
    `}

  > div:first-child {
    padding-left: 32px;
  }
`
