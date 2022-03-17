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
        <Percent>
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

const Percent = styled.div`
  display: flex;
  align-items: center;
  > :last-child {
    color: ${({ theme: { green1 } }) => green1};
  }
`

const Content = styled.div`
  display: grid;
  row-gap: 20px;
`
