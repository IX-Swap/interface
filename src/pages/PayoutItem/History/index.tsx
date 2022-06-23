import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
import { t } from '@lingui/macro'
import styled, { css } from 'styled-components'

import { Table, HeaderRow, BodyRow } from 'components/Table'
import { CopyAddress } from 'components/CopyAddress'
import CurrencyLogo from 'components/CurrencyLogo'
import { ExternalLink, TYPE } from 'theme'
import { Pagination } from 'components/AdminAccreditationTable/Pagination'

import { momentFormatDate } from '../utils'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useUserState } from 'state/user/hooks'

const headerCells = [t`Recipient’s wallet`, t`Amount claimed`, t`Date/Time of claim`, t`Transaction`]

interface Props {
  claimHistory: any[]
}

interface RowProps {
  item: any
}

export const PayoutHistory: FC<Props> = ({ claimHistory }) => {
  const onPageChange = () => {
    console.log('page changes')
  }

  return claimHistory.length !== 0 ? (
    <Box marginTop="16px">
      <Table style={{ marginBottom: 24 }} body={<Body claimHistory={claimHistory} />} header={<Header />} />
      <Pagination page={1} totalPages={5} onPageChange={onPageChange} />
    </Box>
  ) : null
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

const Body: FC<Props> = ({ claimHistory }) => {
  return (
    <>
      {claimHistory.map((item) => {
        return <Row key={`history-table-${item.id}`} item={item} />
      })}
    </>
  )
}

const Row: FC<RowProps> = ({ item }) => {
  const { createdAt, payoutEvent, sum, userId, user } = item
  const { me } = useUserState()
  const { secToken } = payoutEvent
  const currency = new WrappedTokenInfo(secToken)

  return (
    <StyledBodyRow isMyClaim={me.id === userId}>
      <div>
        <CopyAddress address={user.ethAddress} />
      </div>
      <Flex alignItems="center">
        <CurrencyLogo currency={currency} size="20px" />
        <Box marginX="4px">{secToken.originalSymbol ?? secToken.symbol}</Box>
        <Box>{sum}</Box>
      </Flex>
      <div>{`${momentFormatDate(createdAt)} - ${new Date(createdAt).getUTCHours()}:${new Date(
        createdAt
      ).getUTCMinutes()}`}</div>
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
