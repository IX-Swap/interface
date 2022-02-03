import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
import { Token } from '@ixswap1/sdk-core'
import { NavLink } from 'react-router-dom'

import Column from 'components/Column'
import { RowBetween } from 'components/Row'
import { TYPE } from 'theme'
import { Status } from './Status'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import CurrencyLogo from 'components/CurrencyLogo'
import { AccreditationStatusEnum } from 'components/Vault/enum'

import { MySecTokenCard } from './styleds'

interface Props {
  token: Token
}

export const MySecToken: FC<Props> = ({ token }: Props) => {
  const tokenInfo = (token as any)?.tokenInfo
  const status: AccreditationStatusEnum = tokenInfo?.accreditationRequest?.status
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, token ?? undefined)

  return (
    <NavLink style={{ textDecoration: 'none' }} to={`/security-tokens/${tokenInfo.address}`}>
      <MySecTokenCard isPending={status !== 'approved'}>
        <RowBetween>
          <Flex alignItems="center">
            <CurrencyLogo currency={token} size={'46px'} style={{ marginRight: 16 }} />
            <Column>
              <TYPE.title5>{token.symbol}</TYPE.title5>
              <TYPE.small fontWeight={600} color="text2" lineHeight="16.5px">
                {token.name}
              </TYPE.small>
            </Column>
          </Flex>
          <Box>
            <Status status={status} amount={balance} decimals={tokenInfo?.decimals ?? 18} />
          </Box>
        </RowBetween>
      </MySecTokenCard>
    </NavLink>
  )
}
