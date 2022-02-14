import React from 'react'

import { kycData } from './utils/kyc-data'

import { Block } from './molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { addressKeys } from './utils/constants'
import { Field } from './molecules/Field'

export const Address = () => {
  return (
    <Block title="Address">
      <GridContainer spacing={30}>
        {addressKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={kycData[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
