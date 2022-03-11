import React, { FC } from 'react'

import { kycData } from '../utils/kyc-data'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { addressKeys } from '../utils/constants'
import { Field } from '../molecules/Field'

interface Props {
  data: any
}

export const ResidentialAddress: FC<Props> = ({ data }: Props) => {
  return (
    <Block title="Residential Address">
      <GridContainer spacing={30}>
        {addressKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={(data && data[key]) || 'Lorem Ipsum'} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
