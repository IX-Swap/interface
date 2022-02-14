import React from 'react'

import { kycData } from './kyc-data'

import { Block } from './molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { residentialAddressKeys } from './constants'
import { Field } from './molecules/Field'

export const ResidentialAddress = () => {
  return (
    <Block title="Residential Address">
      <GridContainer spacing={30}>
        {residentialAddressKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={kycData[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
