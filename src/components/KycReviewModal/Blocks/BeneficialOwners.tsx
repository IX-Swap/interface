import React, { FC } from 'react'

import { Block } from '../molecules/Block'
import { GridContainer, GridItem } from 'components/Grid'
import { Field } from '../molecules/Field'
import { Documents } from '../molecules/Documents'

interface Props {
  owners: any[]
}

export const BeneficialOwners: FC<Props> = ({ owners }: Props) => {
  return (
    <Block title="Beneficial Owners Information">
      <GridContainer spacing={30}>
        {owners.map(({ fullName, shareholding, proofOfIdentity, proofOfAddress }, index) => (
          <React.Fragment key={`owner-${index}`}>
            <GridItem xs={12} sm={6}>
              <Field label="Full Name" value={fullName} />
            </GridItem>

            <GridItem xs={12} sm={6}>
              <Field label="Shareholding" value={shareholding} />
            </GridItem>

            <GridItem style={{ marginBottom: index !== owners.length - 1 ? 32 : 0 }}>
              <Documents
                documents={[
                  { id: 0, type: 'Proof of Identity', asset: proofOfIdentity } as any,
                  { id: 1, type: 'Proof of Address', asset: proofOfAddress } as any,
                ]}
                title="Documents"
              />
            </GridItem>
          </React.Fragment>
        ))}
      </GridContainer>
    </Block>
  )
}
