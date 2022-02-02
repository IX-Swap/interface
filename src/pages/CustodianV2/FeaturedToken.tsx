import React, { FC } from 'react'
import { Flex } from 'rebass'

import Column from 'components/Column'
import { MouseoverTooltip } from 'components/Tooltip'
import { TYPE } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'

import { FeaturedTokenCard } from './styleds'
import { ReactComponent as Tradable } from '../../assets/images/tradable.svg'
import { ReactComponent as NonTradable } from '../../assets/images/non-tradable.svg'

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
    <FeaturedTokenCard>
      <Flex flexDirection="row-reverse">
        <MouseoverTooltip
          style={{ padding: 8 }}
          placement="top"
          text={`${token.tradable ? 'Ready' : 'Not ready'} for trading on IXSwap`}
        >
          {token.tradable ? <Tradable width={22} height={22} /> : <NonTradable width={22} height={22} />}
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
      <Info label="Issuer" title={token.issuer.name} />
      <Info label="Country" title={token.country} />
      <Info label="Industry:" title={token.industry} />
    </FeaturedTokenCard>
  )
}
