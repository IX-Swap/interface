import React from 'react'

import { kycData } from '../utils/kyc-data'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { taxDeclarationKeys } from '../utils/constants'
import { Field } from '../molecules/Field'

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
