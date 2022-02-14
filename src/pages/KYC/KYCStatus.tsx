import React, { FC } from 'react'
import { Flex } from 'rebass'

import { useActiveWeb3React } from 'hooks/web3'
import { shortAddress } from 'utils'
import { TYPE } from 'theme'

import { KYCStatuses } from './enum'
import { KYCStatusCard, getStatusInfo } from './styleds'

interface Props {
  status: KYCStatuses
}

export const KYCStatus: FC<Props> = ({ status }: Props) => {
  const { account } = useActiveWeb3React()
  const { icon, text, color } = getStatusInfo(status)

  return (
    <KYCStatusCard>
      <TYPE.main1 marginRight="16px">{shortAddress(account ?? '')}</TYPE.main1>
      <Flex style={{ whiteSpace: 'nowrap' }} alignItems="center">
        <TYPE.main1 fontWeight={400} marginRight="10px" color={color}>
          {text}
        </TYPE.main1>
        {icon()}
      </Flex>
    </KYCStatusCard>
  )
}
