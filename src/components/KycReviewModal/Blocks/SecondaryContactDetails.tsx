import React from 'react'
import { IndividualKyc } from 'state/admin/actions'
import { Block } from '../molecules/Block'
import { Field } from '../molecules/Field'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'
import { businessEmailKeys, socialPlatformKeys } from '../utils/constants'
import { SecondaryContactType } from 'pages/KYC/enum'

interface Props {
  data: IndividualKyc
}

export const SecondaryContactDetails = ({ data }: Props) => {
  const keys = data?.secondaryContactDetails === SecondaryContactType.BUSINESS_EMAIL_ADDRESS ? businessEmailKeys : socialPlatformKeys;

  return (
    data?.secondaryContactDetails !== SecondaryContactType.PROOF_OF_ADDRESS ?
    <Block title="Secondary Contact Details">
      <GridContainer>
        {keys.map(({ key, label }, index) => (
          <GridItem key={key} style={{ width: index === 1 || index === 2 ? '15%' : '35%' }}>
            <Field label={label} value={data?.[key]} />
          </GridItem>
        ))}
      </GridContainer>
    </Block> : <></>
  )
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
    // justify-content: space-between;
  }
`

const GridItem = styled.div`
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: calc(50% - 15px); /* 2 columns with 15px spacing between them */
  }
`

export default SecondaryContactDetails
