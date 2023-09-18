import React, { FC } from 'react'
import { Flex } from 'rebass'
import { NavLink } from 'react-router-dom'

import Column from 'components/Column'
import { MouseoverTooltip } from 'components/Tooltip'
import { TYPE } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { routes } from 'utils/routes'

import { FeaturedTokenCard, StyledNonTradable, StyledTradable } from './styleds'
import { NewApproveButton } from 'components/Button'

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
  const { config } = useWhitelabelState()

  return (
    <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={routes.securityToken(token.id)}>
      <FeaturedTokenCard>
        <Flex alignItems="center">
          {token.logo ? (
            <img
              style={{ margin: '10px', borderRadius: '50%' }}
              width="64px"
              height="64px"
              src={token.logo.public}
              alt="Token Logo"
            />
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
        {/* <MouseoverTooltip
          style={{ padding: '8px' }}
          placement="top"
          text={`${token.token ? 'Ready' : 'Not ready'} for trading on ${config?.name || 'IX Swap'}`}
        >
          {token.token ? <StyledTradable width={22} height={22} /> : <StyledNonTradable width={22} height={22} />}
        </MouseoverTooltip> */}

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
