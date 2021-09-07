import React from 'react'
import styled from 'styled-components/macro'

import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink, TYPE } from '../../theme'
import { useAllTransactions } from '../../state/transactions/hooks'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { RowFixed } from '../Row'
import { ReactComponent as Check } from 'assets/images/check.svg'
import { ReactComponent as Failed } from 'assets/images/attention.svg'
import Loader from '../Loader'
import { IconWrapperWithBg, IconWrapper } from './styleds'
import useTheme from 'hooks/useTheme'
import { Box } from 'rebass'
const TransactionWrapper = styled.div``

const TransactionStatusText = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`

const TransactionState = styled(ExternalLink)<{ pending: boolean; success?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text2};
`

export default function Transaction({ hash }: { hash: string }) {
  const { chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()
  const theme = useTheme()
  const tx = allTransactions?.[hash]
  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  if (!chainId) return null

  return (
    <TransactionWrapper>
      <TransactionState
        href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}
        pending={pending}
        success={success}
      >
        <RowFixed>
          <TransactionStatusText>
            <TYPE.description3>{summary ?? hash}</TYPE.description3>
          </TransactionStatusText>
        </RowFixed>

        {pending ? (
          <Box padding="4px">
            <Loader />
          </Box>
        ) : success ? (
          <IconWrapperWithBg size={16} bg={theme.popUpInputBorder} padding="4px">
            <Check />
          </IconWrapperWithBg>
        ) : (
          <IconWrapper size={16}>
            <Failed />
          </IconWrapper>
        )}
      </TransactionState>
    </TransactionWrapper>
  )
}
