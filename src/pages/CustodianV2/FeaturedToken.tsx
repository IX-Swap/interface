import React, { FC } from 'react'
import { Flex } from 'rebass'

import Column from 'components/Column'
import { MouseoverTooltip } from 'components/Tooltip'
import { TYPE } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'

import { FeaturedTokenCard } from './styleds'
import { ReactComponent as Tradable } from '../../assets/images/tradable.svg'
import { ReactComponent as NonTradable } from '../../assets/images/non-tradable.svg'
import { NavLink } from 'react-router-dom'
import { routes } from 'utils/routes'

interface Props {
  token: any
}

interface InfoProps {
  label: string
  title: string
}

const Info: FC<InfoProps> = ({ label, title }: InfoProps) => {
  return (
    <>
      <TYPE.description3 marginBottom="5px">{label}</TYPE.description3>
      <TYPE.buttonMuted marginBottom="6px">{title}</TYPE.buttonMuted>
    </>
  )
}

export const FeaturedToken: FC<Props> = ({ token }: Props) => {
  return (
    <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={routes.securityToken(token.id)}>
      <FeaturedTokenCard>
        <Flex flexDirection="row-reverse">
          <MouseoverTooltip
            style={{ padding: 8 }}
            placement="top"
            text={`${token.token ? 'Ready' : 'Not ready'} for trading on IX Swap`}
          >
            {token.token ? <Tradable width={22} height={22} /> : <NonTradable width={22} height={22} />}
          </MouseoverTooltip>
        </Flex>
        <Flex alignItems="center" marginBottom="32px">
          {token.logo ? (
            <img style={{ marginRight: 16, borderRadius: 24 }} width="46px" height="46px" src={token.logo.public} />
          ) : (
            <CurrencyLogo currency={undefined} size={'46px'} style={{ marginRight: 16 }} />
          )}
          <Column>
            <TYPE.title5>{token.ticker}</TYPE.title5>
            <TYPE.small fontWeight={600} color="text2" lineHeight="16.5px">
              {token.companyName}
            </TYPE.small>
          </Column>
        </Flex>
        <Info label="Issuer:" title={token.issuer.name} />
        <Info label="Country:" title={token.country} />
        <Info label="Industry:" title={token.industry} />
      </FeaturedTokenCard>
    </NavLink>
  )
}
