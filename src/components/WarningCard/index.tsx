import { Trans } from '@lingui/macro'
import Attention from 'assets/images/attention.svg'
import { DarkCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { RowCenter } from 'components/Row'
import React from 'react'
import { SvgIconWrapper, TYPE } from 'theme'

export const WarningCard = ({
  message,
  style,
  name,
}: {
  message: React.ReactNode
  style?: React.CSSProperties
  name?: string
}) => {
  return (
    <DarkCard style={style}>
      <AutoColumn gap="8px">
        <RowCenter style={{ gap: '12px' }}>
          <SvgIconWrapper size={24}>{/* <img src={Attention} alt={'Error'} /> */}</SvgIconWrapper>
          {name === 'liquidPage' ? (
            <TYPE.body1 color={'#B8B8CC'}>
              <Trans>{message}</Trans>
            </TYPE.body1>
          ) : (
            <TYPE.body1>
              <Trans>{message}</Trans>
            </TYPE.body1>
          )}
        </RowCenter>
      </AutoColumn>
    </DarkCard>
  )
}
