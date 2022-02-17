import React, { FC } from 'react'
import { Flex } from 'rebass'
import { NavLink } from 'react-router-dom'
import { isMobileOnly } from 'react-device-detect'

import Column from 'components/Column'
import { TYPE } from 'theme'
import { Status } from './Status'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import CurrencyLogo from 'components/CurrencyLogo'

import { MySecTokenCard } from './styleds'

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
        <Flex flexDirection={isMobileOnly ? 'column' : 'row'} justifyContent="space-between">
          <Flex
            width="-webkit-fill-available"
            marginRight="8px"
            marginBottom={isMobileOnly ? '16px' : '0px'}
            alignItems="center"
          >
            {token.logo ? (
              <img style={{ marginRight: 16, borderRadius: 24 }} width="46px" height="46px" src={token.logo.public} />
            ) : (
              <CurrencyLogo currency={undefined} size={'46px'} style={{ marginRight: 16, minWidth: 46 }} />
            )}
            <Column>
              <TYPE.title5>{token.ticker}</TYPE.title5>
              <TYPE.small fontWeight={600} color="text2" lineHeight="16.5px">
                {wrappedToken.name}
              </TYPE.small>
            </Column>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent={isMobileOnly ? 'flex-start' : 'flex-end'}
            width="-webkit-fill-available"
          >
            <Status
              status={wrappedToken.accreditationRequests[0]?.status}
              amount={balance}
              decimals={token.token.decimals ?? 18}
            />
          </Flex>
        </Flex>
      </MySecTokenCard>
    </NavLink>
  )
}
