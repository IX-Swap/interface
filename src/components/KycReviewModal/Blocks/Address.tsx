import React from 'react'

import { IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { addressKeys } from '../utils/constants'
import { Field } from '../molecules/Field'

interface Props {
  data: IndividualKyc
}

export const Address = ({ data }: Props) => {
  return (
    <Block title="Address">
      <GridContainer spacing={30}>
        {addressKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={data?.address?.[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
