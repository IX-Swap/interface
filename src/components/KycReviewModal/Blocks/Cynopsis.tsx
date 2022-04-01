import React, { FC } from 'react'
import styled from 'styled-components'

import { Block } from '../molecules/Block'
import { RowWithCheck } from '../molecules/RowWithCheck'

interface Props {
  riskJSON?: any
}

export const Cynopsis: FC<Props> = ({ riskJSON }: Props) => {
  return riskJSON?.riskScore ? (
    <Block
      title="Cynopsis"
      additionalTitleInfo={
        <Percent risk={riskJSON.riskRating}>
          <span>&nbsp;-&nbsp;</span>
          <span>{`${riskJSON.riskScore.toFixed(2)}% (${riskJSON.riskRating})`}</span>
        </Percent>
      }
    >
      <Content>
        {Object.keys(riskJSON.componentScore).map((key) => (
          <RowWithCheck
            key={key}
            text={`${key.toLocaleUpperCase()} - ${riskJSON.componentScore[key].toFixed(2)}`}
            isDone={true}
          />
        ))}
      </Content>
    </Block>
  ) : null
}

const Percent = styled.div<{ risk: string }>`
  display: flex;
  align-items: center;
  > :last-child {
    color: ${({ theme: { green1, yellow1, red1 }, risk }) => {
      const riskColors = {
        LOW: green1,
        MEDIUM: yellow1,
        HIGH: red1,
      } as Record<string, string>

      return riskColors[risk] || 'gray'
    }};
  }
`

const Content = styled.div`
  display: grid;
  row-gap: 20px;
`
