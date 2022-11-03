import React, { FC } from 'react'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { Field } from '../molecules/Field'
import { IndividualKyc } from 'state/admin/actions'

interface Props {
  data: IndividualKyc
}

export const TaxDeclarations: FC<Props> = ({ data }: Props) => {
  if (data.taxDeclarations.length === 0) {
    return null
  }

  return (
    <Block title="Tax Declarations">
      <GridContainer spacing={30}>
        {data.taxDeclarations.map((declaration, index) => (
          <>
            <GridItem key={`declaration-${index}-country`} md={4}>
              <Field label={'Country of Tax Declaration'} value={declaration.country} />
            </GridItem>
            
            <GridItem key={`declaration-${index}-idNumber`} md={4}>
              <Field label={'Tax Identification Number (TIN)'} value={declaration.idNumber ?? 'Not available'} />
            </GridItem>
            
            <GridItem key={`declaration-${index}-reason`} md={4}>
              {declaration.reason ? (<Field label={'Reason'} value={declaration.reason} />) : (<div></div>)}
            </GridItem>
          </>
        ))}
      </GridContainer>
    </Block>
  )
}
