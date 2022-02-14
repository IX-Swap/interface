import React from 'react'

import { kycData } from './kyc-data'

import { Block } from './molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { companyAuthorizedPersonnelKeys } from './constants'
import { Field } from './molecules/Field'
import { Documents } from './molecules/Documents'

export const BeneficialOwners = () => {
  return (
    <Block title="Beneficial Owners Information">
      <GridContainer spacing={30}>
        {companyAuthorizedPersonnelKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={kycData[key]} />
          </GridItem>
        ))}
        <Documents
          documents={[
            { fileName: 'Identification. pdf', type: 'Proof of Identity', createdAt: new Date().toISOString() },
            { fileName: 'Identification. pdf', type: 'Proof of Address', createdAt: new Date().toISOString() },
          ]}
          title="Proof of Identity"
        />
      </GridContainer>
    </Block>
  )
}
