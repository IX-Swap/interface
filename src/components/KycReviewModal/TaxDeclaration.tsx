import React from 'react'

import { kycData } from './kyc-data'

import { Block } from './Block'
import { GridContainer, GridItem } from 'components/Grid'
import { taxDeclarationKeys } from './constants'
import { Field } from './Field'

export const TaxDeclaration = () => {
  return (
    <Block title="Tax Declaration">
      <GridContainer spacing={30}>
        {taxDeclarationKeys.map(({ key, label }) => (
          <GridItem key={key}>
            <Field label={label} value={kycData[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block>
  )
}
