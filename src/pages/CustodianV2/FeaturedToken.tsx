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
  num: number
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

export const FeaturedToken: FC<Props> = ({ num }: Props) => {
  return (
    <FeaturedTokenCard>
      <Flex flexDirection="row-reverse">
        <MouseoverTooltip style={{ padding: 8 }} placement="top" text={`Ready for trading on IXSwap`}>
          {num === 2 ? <Tradable width={22} height={22} /> : <NonTradable width={22} height={22} />}
        </MouseoverTooltip>
      </Flex>
      <Flex alignItems="center" marginBottom="32px">
        <CurrencyLogo currency={undefined} size={'46px'} style={{ marginRight: 16 }} />
        <Column>
          <TYPE.title5>LMX</TYPE.title5>
          <TYPE.small fontWeight={600} color="text2" lineHeight="16.5px">
            Liquid Mining
          </TYPE.small>
        </Column>
      </Flex>
      <Info label="Issuer" title="Liquid Mining Fund" />
      <Info label="Country" title="USA" />
      <Info label="Industry:" title="Finance" />
    </FeaturedTokenCard>
  )
}
