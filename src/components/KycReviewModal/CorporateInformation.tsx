import React from 'react'

import { kycData } from './kyc-data'

import { Block } from './molecules/Block'
import { RowWithCheck } from './molecules/RowWithCheck'
import { GridContainer, GridItem } from 'components/Grid'
import { corporateInfoKeys } from './constants'
import { Field } from './molecules/Field'

export const CorporateInformation = () => {
  return (
    <Block title="Corporate Information">
      <GridContainer spacing={30}>
        {corporateInfoKeys.map(({ key, label, width = {} }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={kycData[key]} />
          </GridItem>
        ))}
        <GridItem xs={12}>
          <RowWithCheck text="Is Incorporated" isDone />
        </GridItem>
      </GridContainer>
    </Block>
  )
}
