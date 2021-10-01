import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import CurrencyLogo from 'components/CurrencyLogo'
import React from 'react'
import { SemiTransparent, TYPE } from 'theme'
import { RowFixed } from '../Row'
import { Dots } from '../swap/styleds'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'

const NameWrapper = styled.div`
  display: flex;
  margin-left: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   flex-direction: column;
  `};
`
const Marginer = styled.div`
  margin-left: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   margin-left: 0;
  `};
`
const NameText = styled(TYPE.body4)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
   line-height: 19px;
  `};
`
const Name = ({ name }: { name?: string }) => {
  const theme = useTheme()
  return (
    <Marginer>
      <SemiTransparent>
        <NameText style={{ fontWeight: 'normal', lineHeight: '19px' }} color={theme.text2}>
          {name}
        </NameText>
      </SemiTransparent>
    </Marginer>
  )
}
export const CurrencyHeader = ({ currency, showFullName }: { currency: Currency; showFullName?: boolean }) => {
  return (
    <RowFixed>
      {currency && (
        <>
          <CurrencyLogo currency={currency} size={'33px'} style={{ margin: 0 }} />
          <NameWrapper>
            <NameText style={{ lineHeight: '19px' }}>{currency.symbol}</NameText>
            {showFullName && <Name name={currency?.name} />}
          </NameWrapper>
        </>
      )}
      {!currency && (
        <TYPE.title4>
          <Dots>
            <Trans>Loading</Trans>
          </Dots>
        </TYPE.title4>
      )}
    </RowFixed>
  )
}
