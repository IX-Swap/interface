import React, { FC } from 'react'
import { Flex } from 'rebass'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Column from 'components/Column'
import { TYPE } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'
import { routes } from 'utils/routes'
import { FeaturedTokenCard } from './styleds'
import { NewApproveButton } from 'components/Button'
import { NETWORK_LOGOS } from 'constants/chains'
import { TokenLogo } from 'components/TokenLogo'
import { Box } from '@mui/material'

interface Props {
  token: any
}

interface InfoProps {
  label: string
  title: string
}

const Info: FC<InfoProps> = ({ label, title }: InfoProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E6E6FF',
        paddingBottom: '3px',
        marginBottom: '3px',
        marginLeft: '15px',
        marginRight: '10px',
        marginTop: '14px',
      }}
    >
      <TYPE.description3>{label}</TYPE.description3>
      <TYPE.buttonMuted>{title}</TYPE.buttonMuted>
    </div>
  )
}

export const FeaturedToken: FC<Props> = ({ token }: Props) => {
  const network = token?.token?.network
  const networkLogo = network ? NETWORK_LOGOS[network] : ''

  return (
    <NavLink
      style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}
      to={routes.securityToken(token.id)}
    >
      {networkLogo ? (
        <LogoWrap>
          <NetworkLogo src={networkLogo} alt="network logo" />
        </LogoWrap>
      ) : null}
      <FeaturedTokenCard>
        <Flex alignItems="center">
          {token.logo ? (
            <TokenLogo logo={token.logo} width="64px" height="64px" />
          ) : (
            <CurrencyLogo currency={undefined} size={'64px'} style={{ margin: '10px' }} />
          )}
        </Flex>
        <Column style={{ margin: '0px 15px', borderBottom: '1px solid #E6E6FF' }}>
          <TYPE.title5>{token.ticker}</TYPE.title5>
          <TYPE.small marginBottom={10} fontWeight={400} color="#666680" lineHeight="16.5px">
            {token.companyName}
          </TYPE.small>
        </Column>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Info label="Issuer:" title={token.issuer.name} />
          <Info label="Country:" title={token.country} />
          <Info label="Industry:" title={token.industry} />
        </div>

        <NewApproveButton
          style={{
            border: '1px solid #E6E6FF',
            color: '#6666FF',
            fontWeight: '600',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          Trade Now
        </NewApproveButton>
      </FeaturedTokenCard>
    </NavLink>
  )
}

const LogoWrap = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
`

const NetworkLogo = styled.img`
  height: 32px;
  width: 32px;
`
