import React from 'react'

import { IndividualKyc } from 'state/admin/actions'
// import { GridContainer, GridItem } from 'components/Grid'

import { Block } from '../molecules/Block'
import { corporateInfoKeys, personalInfoKeys, socialMediaKeys } from '../utils/constants'
import { Field } from '../molecules/Field'
import { RowWithCheck } from '../molecules/RowWithCheck'
import { Line } from 'components/Line'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  data: IndividualKyc
  kycKey: any
}

interface SocialMediaKey {
  key: string
  label: string
  width: { xs: number; sm: number }
  format?: (value: any) => string
}

export const SocialMedia = ({ data, kycKey }: Props) => {
  const keys: SocialMediaKey[] = socialMediaKeys

  return (
    <Block title={`Secondary Contact Details`}>
      <GridContainer>
        {keys.map(({ key, label, width = {}, format }) => {
          const value = format ? format(data?.[key]) : data?.[key];

          // Skip rendering if the value is falsy (undefined, null, or empty string)
          if (!value) {
            return null;
          }

          return (
            <GridItem key={key} {...width}>
              <Field label={label} value={value} />
            </GridItem>
          );
        })}
      </GridContainer>
    </Block>
  );
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
    width: calc(100% - 15px); /* 2 columns with 15px spacing between them */
    padding: 0px 10px 0px 0px;
  }
`
