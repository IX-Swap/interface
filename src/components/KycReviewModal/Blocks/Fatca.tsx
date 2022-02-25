import React from 'react'
import styled from 'styled-components'

import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { RowWithCheck } from '../molecules/RowWithCheck'
import { fatcaKeys } from '../utils/constants'
import { Field } from '../molecules/Field'

interface Props {
  data: IndividualKyc | CorporateKyc
}

export const Fatca = ({ data }: Props) => {
  const isCheched = (index: number) => {
    if (index) return !data.usTin
    return !!data.usTin
  }

  return (
    <Block title="Fatca">
      <Content>
        {fatcaKeys.map(({ key, label }, index) => (
          <>
            <RowWithCheck key={key} text={label} isDone={isCheched(index)} />
            {isCheched(index) && data.usTin && <Field label="ID Number" value={data.usTin} />}
          </>
        ))}
      </Content>
    </Block>
  )
}

const Content = styled.div`
  display: grid;
  row-gap: 20px;
`
