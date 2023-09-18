import React, { FC, useMemo } from 'react'
import { Flex } from 'rebass'

import { useActiveWeb3React } from 'hooks/web3'
import { shortAddress } from 'utils'
import { TYPE } from 'theme'

import { KYCStatuses } from './enum'
import { KYCStatusCard, getStatusInfo } from './styleds'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected, walletconnect } from '../../connectors'
import Identicon from 'components/Identicon'
import styled, { css } from 'styled-components'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'

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
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return <Identicon />
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={'WalletConnect'} />
      </IconWrapper>
    )
  }

  return null
}

export const KYCStatus: FC<Props> = ({ status }: Props) => {
  const { account, connector } = useActiveWeb3React()
  const { icon, text, color } = getStatusInfo(status)
  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length

  return (
    <KYCStatusCard style={{ borderRadius: '8px' }}>
      {!hasPendingTransactions && connector && <StatusIcon connector={connector} />}
      <TYPE.main1 marginLeft={'10px'} marginRight="16px">
        {shortAddress(account ?? '')}
      </TYPE.main1>
      <VerticalLine />
      <Flex style={{ whiteSpace: 'nowrap' }} alignItems="center">
        <TYPE.main1 marginLeft={'10px'} marginRight="10px" data-testid="kycStatus">
          {text}
        </TYPE.main1>
        {icon()}
      </Flex>
    </KYCStatusCard>
  )
}
