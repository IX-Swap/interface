import React, { FC } from 'react'

import { Block } from '../molecules/Block'
// import { GridContainer, GridItem } from 'components/Grid'
import { companyAuthorizedPersonnelKeys } from '../utils/constants'
import { Field } from '../molecules/Field'
import { Documents } from '../molecules/Documents'
import { CorporateKyc } from 'state/admin/actions'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'


interface Props {
  data: CorporateKyc
}

export const CompanyAuthorizedPersonnel: FC<Props> = ({ data }: Props) => {
  return (
    <Block title="Authorized Personnel">
      <GridContainer>
        {companyAuthorizedPersonnelKeys.map(({ key, label, width = {}, format }) => (
          <GridItem key={key} {...width}>
            <Field label={label} value={format ? format(data[key]) : data[key]} />
          </GridItem>
        ))}
        <div style={{ marginTop: '40px' }}>
          <Documents
            documents={data.documents.filter(({ type }) => type === 'authorization' || type === 'authorizationIdentity')}
            title="Authorization Document"
            kycKey="individual"
          />
        </div>
      </GridContainer>
    </Block>
  )
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
`

const GridItem = styled.div`
  width: calc(25% - 10px); /* 4 columns with 15px spacing between them */

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: calc(50% - 15px); /* 2 columns with 15px spacing between them */
    padding: 0px 10px 0px 0px;
  }
`
