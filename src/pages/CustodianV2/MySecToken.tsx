import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
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
import { useAccreditationStatus } from 'state/secTokens/hooks'

interface Props {
  token: any
}

export const MySecToken: FC<Props> = ({ token }: Props) => {
  const wrappedToken = token?.token
  const { account } = useActiveWeb3React()
  // const { status, accreditationRequest } = useAccreditationStatus(wrappedToken.id)
  // console.log(wrappedToken.name, status, accreditationRequest)
  const balance = useCurrencyBalance(account ?? undefined, token.token ?? undefined)

  return (
    <NavLink style={{ textDecoration: 'none' }} to={`/security-tokens/${token.id}`}>
      <MySecTokenCard isPending={wrappedToken.status !== 'approved'}>
        <RowBetween>
          <Flex alignItems="center">
            {token.logo ? (
              <img style={{ marginRight: 16, borderRadius: 24 }} width="46px" height="46px" src={token.logo.public} />
            ) : (
              <CurrencyLogo currency={undefined} size={'46px'} style={{ marginRight: 16 }} />
            )}
            <Column>
              <TYPE.title5>{token.ticker}</TYPE.title5>
              <TYPE.small fontWeight={600} color="text2" lineHeight="16.5px">
                {wrappedToken.name}
              </TYPE.small>
            </Column>
          </Flex>
          <Box>
            <Status status={wrappedToken.status} amount={balance} decimals={token.token.decimals ?? 18} />
          </Box>
        </RowBetween>
      </MySecTokenCard>
    </NavLink>
  )
}
