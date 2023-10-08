import React, { FC } from 'react'

import { Block } from '../molecules/Block'
// import { GridContainer, GridItem } from 'components/Grid'
import { Field } from '../molecules/Field'
import { IndividualKyc } from 'state/admin/actions'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  data: IndividualKyc
}

export const TaxDeclarations: FC<Props> = ({ data }: Props) => {
  if (data.taxDeclarations.length === 0) {
    return null
  }
  return (
    <Block title="Tax Declarations">
      <GridContainer>
        {data?.taxDeclarations?.map((declaration, index) => (
          <>
            <GridItem key={`declaration-${index}-country`}>
              <Field label={'Country of Tax Declaration'} value={declaration?.country} />
            </GridItem>

            <GridItem key={`declaration-${index}-idNumber`}>
              <Field
                label={'Tax Identification Number (TIN)'}
                value={declaration?.isAdditional ? 'Not available' : declaration?.idNumber || ''}
              />
            </GridItem>

            {declaration.isAdditional ? (
              <GridItem key={`declaration-${index}-reason`}>
                <Field label={'Reason '} value={declaration?.reason ?? 'Not Avaliable'} />
              </GridItem>
            ) : null}
          </>
        ))}
      </GridContainer>
    </Block>
  )
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const GridItem = styled.div`
  width: calc(33% - 10px); /* 4 columns with 15px spacing between them */

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: calc(50% - 15px); /* 2 columns with 15px spacing between them */
  }
`
