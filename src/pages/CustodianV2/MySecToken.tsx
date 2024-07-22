import React, { FC, useMemo } from 'react'
import { Flex } from 'rebass'
import { NavLink } from 'react-router-dom'
import { isMobileOnly } from 'react-device-detect'
import styled from 'styled-components'

import Column from 'components/Column'
import { TYPE } from 'theme'
import { Status } from './Status'
import CurrencyLogo from 'components/CurrencyLogo'

import { MySecTokenCard } from './styleds'
import { routes } from 'utils/routes'
import { NETWORK_LOGOS } from 'constants/chains'

interface Props {
  token: any
}

export const MySecToken: FC<Props> = ({ token }: Props) => {
  const wrappedToken = token?.token

  const network = token?.token?.network
  const balance = token?.token?.balance
  const networkLogo = network ? NETWORK_LOGOS[network] : ''

  const status = useMemo(() => {
    const statuses = [
      wrappedToken.accreditationRequest?.brokerDealerStatus,
      wrappedToken.accreditationRequest?.custodianStatus,
    ]

    if (statuses.every((status) => status === 'approved')) {
      return 'approved'
    }

    if (statuses.some((status) => status === 'pending')) {
      return 'pending'
    }

    if (statuses.some((status) => status === 'declined')) {
      return 'declined'
    }

    if (statuses.some((status) => status === 'faild')) {
      return 'faild'
    }

    return 'pending'
  }, [wrappedToken])

  return (
    <NavLink style={{ textDecoration: 'none', overflow: 'hidden' }} to={routes.securityToken(token.id)}>
      <MySecTokenCard isPending={status !== 'approved'}>
        <Flex flexDirection={isMobileOnly ? 'column' : 'row'} justifyContent="space-between">
          <Flex
            width="-webkit-fill-available"
            marginRight="8px"
            marginBottom={isMobileOnly ? '16px' : '0px'}
            alignItems="center"
          >
            <div style={{ position: 'relative' }}>
              {token.logo ? (
                <img style={{ marginRight: 16, borderRadius: 24 }} width="46px" height="46px" src={token.logo.public} />
              ) : (
                <CurrencyLogo currency={undefined} size={'46px'} style={{ marginRight: 16, minWidth: 46 }} />
              )}

              {networkLogo ? (
                <LogoWrap>
                  <NetworkLogo src={networkLogo} alt="network logo" />
                </LogoWrap>
              ) : null}
            </div>

            <Column>
              <TYPE.title11>{token.ticker}</TYPE.title11>
            </Column>
            <Column style={{ minWidth: '100%', marginLeft: '10px' }}>
              <TYPE.small fontWeight={600}>{wrappedToken.name}</TYPE.small>
            </Column>
          </Flex>

          <Status status={status} amount={balance} decimals={token.token.decimals ?? 18} />
        </Flex>
      </MySecTokenCard>
    </NavLink>
  )
}

const LogoWrap = styled.div`
  position: absolute;
  top: 0px;
  right: 8px;
`

const NetworkLogo = styled.img`
  height: 16px;
  width: 16px;
`
