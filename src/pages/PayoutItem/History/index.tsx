import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { Table, HeaderRow, BodyRow } from 'components/Table'
import { CopyAddress } from 'components/CopyAddress'
import CurrencyLogo from 'components/CurrencyLogo'
import { ExternalLink, TYPE } from 'theme'
import { Pagination } from 'components/Pagination'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

import { formatDate } from '../utils'
import { EyeIcon } from 'assets/launchpad/svg/components/EyeIcon'

const headerCells = [`Recipient's wallet`, `Amount claimed`, `Date/Time of claim`, `Transaction`]

interface Props {
  claimHistory: any
  page: number
  setPage: (page: number) => void
  isLoading: boolean
}

interface RowProps {
  item: any
}

export const PayoutHistory: FC<Props> = ({ isLoading, claimHistory, setPage }) => {
  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  console.log(claimHistory.totalItems , claimHistory.page , claimHistory.totalPages )

  return claimHistory.length !== 0 ? (
    <Box marginTop="16px">
      {isLoading ? (
        <LoaderContainer>
          <LoaderThin size={72} />
        </LoaderContainer>
      ) : (
        <>
          <Table style={{ marginBottom: 24 }} body={<Body claimHistory={claimHistory} />} header={<Header />} />
          <Pagination
            totalItems={claimHistory.totalItems}
            page={claimHistory.page || 1}
            totalPages={claimHistory.totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </Box>
  ) : null
}

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <TYPE.small key={cell}>
          <Trans>{cell}</Trans>
        </TYPE.small>
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
  const { createdAt, payoutEvent, sum, user, txHash } = item
  const { payoutToken } = payoutEvent
  const currency = useCurrency(payoutToken)
  const { chainId } = useActiveWeb3React()

  return (
    <StyledBodyRow>
      <div>
        <CopyAddress address={user.ethAddress} />
      </div>
      <Flex alignItems="center">
        <CurrencyLogo currency={currency} size="20px" />
        <Box marginX="4px">{currency?.symbol ?? '-'}</Box>
        <Box>{Number(sum).toFixed(4)}</Box>
      </Flex>
      <div>{`${formatDate(createdAt)} - ${dayjs(createdAt).format('HH:mm')}`}</div>
      <StyledView>
        <ExternalLink href={getExplorerLink(chainId || 137, txHash, ExplorerDataType.TRANSACTION)}>
          <EyeIcon stroke="#B8B8CC" />
        </ExternalLink>
      </StyledView>
    </StyledBodyRow>
  )
}

const StyledHeaderRow = styled(HeaderRow)`
  min-width: 800px;
  grid-template-columns: repeat(4, 1fr);
  > div:first-child {
    padding-left: 32px;
  }
`

const StyledBodyRow = styled(BodyRow)<{ isMyClaim?: boolean }>`
  min-width: 800px;
  grid-template-columns: repeat(4, 1fr);
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;

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

const StyledView = styled(Flex)`
  display: flex;
  svg {
    width: 14px;
  }
`
