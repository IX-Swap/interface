import React from 'react'

import { IndividualKyc } from 'state/admin/actions'
import { GridContainer, GridItem } from 'components/Grid'

import { Block } from '../molecules/Block'
import { corporateInfoKeys, personalInfoKeys } from '../utils/constants'
import { Field } from '../molecules/Field'
import { RowWithCheck } from '../molecules/RowWithCheck'

interface Props {
  data: IndividualKyc
  kycKey: string
}

export const Information = ({ data, kycKey }: Props) => {
  const keys = kycKey === 'individual' ? personalInfoKeys : corporateInfoKeys

  return (
    <Block title={`${kycKey === 'individual' ? 'Personal' : 'Corporate'} Information`}>
      <GridContainer spacing={30}>
        {keys.map(({ key, label, width = {}, format }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={format ? format(data?.[key]) : data?.[key]} />
          </GridItem>
        ))}
        {kycKey === 'corporate' && (
          <GridItem xs={12}>
            <RowWithCheck
              text="Is The Ultimate Holding Company A Regulated Entity Or Listed Company In a FATF Jurisdiction?"
              isDone={data?.inFatfJurisdiction}
            />
          </GridItem>
        )}
      </GridContainer>
    </Block>
  )
}
