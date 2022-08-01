import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
import { t } from '@lingui/macro'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import { capitalize } from '@material-ui/core'

import { Table, HeaderRow, BodyRow } from 'components/Table'
import { CopyAddress } from 'components/CopyAddress'
import CurrencyLogo from 'components/CurrencyLogo'
import { ExternalLink, TYPE } from 'theme'
import { Pagination } from 'components/AdminAccreditationTable/Pagination'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { useUserState } from 'state/user/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

import { formatDate } from '../utils'

const headerCells = [t`Recipient's wallet`, t`Amount claimed`, t`Date/Time of claim`, t`Status`, t`Transaction`]

interface Props {
  claimHistory: any
  page: number
  setPage: (page: number) => void
  isLoading: boolean
}

interface RowProps {
  item: any
}

export const PayoutHistory: FC<Props> = ({ page, isLoading, claimHistory, setPage }) => {
  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  return claimHistory.length !== 0 ? (
    <Box marginTop="16px">
      {isLoading ? (
        <LoaderContainer>
          <LoaderThin size={72} />
        </LoaderContainer>
      ) : (
        <>
          <Table style={{ marginBottom: 24 }} body={<Body claimHistory={claimHistory} />} header={<Header />} />
          <Pagination page={page} totalPages={claimHistory.totalPages} onPageChange={onPageChange} />
        </>
      )}
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

const Body: FC<{ claimHistory: any }> = ({ claimHistory }) => {
  return (
    <>
      {claimHistory.items.map((item: any) => {
        return <Row key={`history-table-${item.id}`} item={item} />
      })}
    </>
  )
}

const Row: FC<RowProps> = ({ item }) => {
  const { createdAt, payoutEvent, sum, userId, user, status, txHash } = item
  const { me } = useUserState()
  const { payoutToken } = payoutEvent
  const currency = useCurrency(payoutToken)
  const { chainId } = useActiveWeb3React()

  return (
    <StyledBodyRow isMyClaim={me.id === userId}>
      <div>
        <CopyAddress address={user.ethAddress} />
      </div>
      <Flex alignItems="center">
        <CurrencyLogo currency={currency} size="20px" />
        <Box marginX="4px">{currency?.symbol ?? '-'}</Box>
        <Box>{Number(sum).toFixed(4)}</Box>
      </Flex>
      <div>{`${formatDate(createdAt)} - ${dayjs(createdAt).format('HH:mm')}}`}</div>
      <div>{capitalize(status || '-')}</div>
      <div style={{ textDecoration: 'underline' }}>
        <ExternalLink href={getExplorerLink(chainId || 137, txHash, ExplorerDataType.TRANSACTION)}>View</ExternalLink>
      </div>
    </StyledBodyRow>
  )
}

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: repeat(4, 1fr) 200px;

  > div:first-child {
    padding-left: 32px;
  }
`

const StyledBodyRow = styled(BodyRow)<{ isMyClaim?: boolean }>`
  grid-template-columns: repeat(4, 1fr) 200px;
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

const LoaderContainer = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
