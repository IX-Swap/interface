import React, { FC } from 'react'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { companyAuthorizedPersonnelKeys } from '../utils/constants'
import { Field } from '../molecules/Field'
import { Documents } from '../molecules/Documents'
import { CorporateKyc } from 'state/admin/actions'

interface Props {
  data: CorporateKyc
}

export const CompanyAuthorizedPersonnel: FC<Props> = ({ data }: Props) => {
  return (
    <Block title="Company Authorized Personnel">
      <GridContainer spacing={30}>
        {companyAuthorizedPersonnelKeys.map(({ key, label, width = {}, format }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={format ? format(data[key]) : data[key]} />
          </GridItem>
        ))}
        <Documents
          documents={data.documents.filter(({ type }) => type === 'authorization')}
          title="Authorization Document"
        />
      </GridContainer>
    </Block>
  )
}
