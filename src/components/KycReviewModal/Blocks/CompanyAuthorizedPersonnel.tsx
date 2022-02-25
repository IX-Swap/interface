import React from 'react'

import { kycData } from '../utils/kyc-data'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { companyAuthorizedPersonnelKeys } from '../utils/constants'
import { Field } from '../molecules/Field'
import { Documents } from '../molecules/Documents'

export const CompanyAuthorizedPersonnel = () => {
  return (
    <Block title="Company Authorized Personnel">
      <GridContainer spacing={30}>
        {companyAuthorizedPersonnelKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={kycData[key]} />
          </GridItem>
        ))}
        <Documents documents={[]} title="Proof of Identity" />
      </GridContainer>
    </Block>
  )
}
