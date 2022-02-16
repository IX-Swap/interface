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

import { MySecTokenCard } from './styleds'
import { isMobile } from 'react-device-detect'

interface Props {
  token: any
}

export const MySecToken: FC<Props> = ({ token }: Props) => {
  const wrappedToken = token?.token
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, { isToken: true, ...wrappedToken } ?? undefined)

  return (
    <NavLink style={{ textDecoration: 'none', overflow: 'hidden' }} to={`/security-tokens/${token.id}`}>
      <MySecTokenCard isPending={wrappedToken.status !== 'approved'}>
        <Flex flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between">
          <Flex
            width="-webkit-fill-available"
            marginRight="8px"
            marginBottom={isMobile ? '16px' : '0px'}
            alignItems="center"
          >
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
          <Box width="-webkit-fill-available">
            <Status
              status={wrappedToken.accreditationRequest?.status || 'approved'}
              amount={balance}
              decimals={token.token.decimals ?? 18}
            />
          </Box>
        </Flex>
      </MySecTokenCard>
    </NavLink>
  )
}
