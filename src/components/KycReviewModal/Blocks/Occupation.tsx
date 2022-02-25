import React from 'react'

import { IndividualKyc } from 'state/admin/actions'
import { GridContainer, GridItem } from 'components/Grid'

import { Block } from '../molecules/Block'
import { ocupationKeys } from '../utils/constants'
import { Field } from '../molecules/Field'

interface Props {
  data: IndividualKyc
}

export const Occupation = ({ data }: Props) => {
  return (
    <Block title="Occupation">
      <GridContainer spacing={30}>
        {ocupationKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={data?.[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
