import React, { FC, useMemo } from 'react'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'

import { useWeb3React } from 'hooks/useWeb3React'
import { shortAddress } from 'utils'
import { TYPE } from 'theme'
import { KYCStatuses } from './enum'
import { KYCStatusCard, getStatusInfo } from './styleds'
import styled from 'styled-components'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { useAccount } from 'hooks/useAccount'
import { CONNECTOR_ICON_OVERRIDE_MAP } from 'components/Web3Provider/constants'
interface Props {
  status: KYCStatuses
}
const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const VerticalLine = styled.div`
  border-left: 1px solid #e6e6ff;
  height: 32px;
  // margin-left: 10px;
`

function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

// eslint-disable-next-line react/prop-types
function StatusIcon() {
  const { connector } = useAccount()
  const icon = connector ? CONNECTOR_ICON_OVERRIDE_MAP[connector?.id] ?? connector?.icon : undefined

  return (
    <>
      {icon ? (
        <IconWrapper size={20}>
          <img src={icon} alt={'Icon'} style={{ borderRadius: 12 }} />
        </IconWrapper>
      ) : null}
    </>
  )
}

export const KYCStatus: FC<Props> = ({ status }: Props) => {
  const { account } = useWeb3React()
  const { icon, text } = getStatusInfo(status)
  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length

  return (
    <KYCStatusCard style={{ borderRadius: '8px' }}>
      {!hasPendingTransactions && <StatusIcon />}
      <TYPE.main1 marginLeft={'10px'} marginRight="16px">
        {shortAddress(account ?? '')}
      </TYPE.main1>
      <VerticalLine />
      <Flex style={{ whiteSpace: 'nowrap' }} alignItems="center">
        <TYPE.main1 marginLeft={'10px'} marginRight="10px" data-testid="kycStatus">
          <Trans>{text}</Trans>
        </TYPE.main1>
        {icon()}
      </Flex>
    </KYCStatusCard>
  )
}
