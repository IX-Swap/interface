import React from 'react'

import { IndividualKyc } from 'state/admin/actions'
import { GridContainer, GridItem } from 'components/Grid'

import { Block } from '../molecules/Block'
import { individualDocumentKeys } from '../utils/constants'
import { Field } from '../molecules/Field'

interface Props {
  data: IndividualKyc
}

export const IndividualDocument = ({ data }: Props) => {
  return (
    <Block title="Individual Document">
      <GridContainer spacing={30}>
        {individualDocumentKeys.map(({ key, label, width = {}, format }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={format ? format(data?.[key]) : data?.[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
