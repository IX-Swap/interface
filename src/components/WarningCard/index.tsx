import Attention from 'assets/images/attention.svg'
import { DarkCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { RowCenter } from 'components/Row'
import React from 'react'
import { SvgIconWrapper, TYPE } from 'theme'

export const WarningCard = ({ message, style }: { message: React.ReactNode; style?: React.CSSProperties }) => {
  return (
    <DarkCard style={style}>
      <AutoColumn gap="8px">
        <RowCenter style={{ gap: '12px' }}>
          <SvgIconWrapper size={24}>
            <img src={Attention} alt={'Error'} />
          </SvgIconWrapper>
          <TYPE.body1>{message}</TYPE.body1>
        </RowCenter>
      </AutoColumn>
    </DarkCard>
  )
}
