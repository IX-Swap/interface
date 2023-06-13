import React, { FC } from 'react'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { taxDeclarationKeys } from '../utils/constants'
import { Field } from '../molecules/Field'
import { CorporateKyc } from 'state/admin/actions'

interface Props {
  data: CorporateKyc
}

export const TaxDeclaration: FC<Props> = ({ data }: Props) => {
  return (
    <Block title="Tax Declaration">
      <GridContainer spacing={30}>
        {taxDeclarationKeys.map(({ key, label }) => (
          <GridItem key={key}>
            <Field label={label} value={data[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
