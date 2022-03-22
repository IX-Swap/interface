import React from 'react'

import { IndividualKyc } from 'state/admin/actions'
import { GridContainer, GridItem } from 'components/Grid'

import { Block } from '../molecules/Block'
import { corporateInfoKeys, personalInfoKeys } from '../utils/constants'
import { Field } from '../molecules/Field'

interface Props {
  data: IndividualKyc
  kycKey: string
}

export const Information = ({ data, kycKey }: Props) => {
  const keys = kycKey === 'individual' ? personalInfoKeys : corporateInfoKeys

  return (
    <Block title={`${kycKey === 'individual' ? 'Personal' : 'Corporate'} Information`}>
      <GridContainer spacing={30}>
        {keys.map(
          ({ key, label, width = {}, format }) =>
            (key === 'otherEntity' ? Boolean(data?.[key]) : true) && (
              <GridItem key={key} {...width}>
                <Field label={label} value={format ? format(data?.[key]) : data?.[key]} />
              </GridItem>
            )
        )}
      </GridContainer>
    </Block>
  )
}
