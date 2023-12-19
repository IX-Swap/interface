import React, { FC } from 'react'

import { Block } from '../molecules/Block'
// import { GridContainer, GridItem } from 'components/Grid'
import { Field } from '../molecules/Field'
import { Documents } from '../molecules/Documents'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  owners: any[]
}

export const CorporateMembers: FC<Props> = ({ owners }: Props) => {
  return (
    <Block title="Directors / Officers / Managers Information">
      <GridContainer>
        {owners.map(({ fullName, nationality, designation, proofOfIdentity }, index) => (
          <React.Fragment key={`owner-${index}`}>
            <GridItem>
              <Field label="Full Name" value={fullName} />
            </GridItem>

            <GridItem>
              <Field label="Nationality" value={nationality} />
            </GridItem>

            <GridItem>
              <Field label="Designation" value={designation} />
            </GridItem>

            <GridItemNew style={{ marginBottom: index !== owners.length - 1 ? 32 : 0, display: 'flex' }}>
              <Documents
                documents={[
                  { id: 0, type: 'Proof of Identity', asset: proofOfIdentity } as any,
                ]}
                title="Documents"
              />
            </GridItemNew>
          </React.Fragment>
        ))}
      </GridContainer>
    </Block>
  )
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
`

const GridItem = styled.div`
  width: calc(25% - 10px); /* 4 columns with 15px spacing between them */
  margin-bottom: 30px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: calc(50% - 15px); /* 2 columns with 15px spacing between them */
  }
`

const GridItemNew = styled.div`
  width: calc(100% - 10px); /* 4 columns with 15px spacing between them */
  margin-top: 40px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: calc(50% - 15px); /* 2 columns with 15px spacing between them */
  }
`
