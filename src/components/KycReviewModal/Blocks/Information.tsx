import React from 'react'

import { CorporateKyc, IndividualKyc } from 'state/admin/actions'
// import { GridContainer, GridItem } from 'components/Grid'

import { Block } from '../molecules/Block'
import { corporateInfoKeys, personalInfoKeys } from '../utils/constants'
import { Field } from '../molecules/Field'
import { RowWithCheck } from '../molecules/RowWithCheck'
import { Line } from 'components/Line'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  data: IndividualKyc | CorporateKyc
  kycKey: any
}

export const Information = ({ data, kycKey }: Props) => {
  const keys = kycKey === 'individual' ? personalInfoKeys : corporateInfoKeys
  return (
    <Block title={`${kycKey === 'individual' ? 'Personal' : 'Corporate'} Information`}>
      <GridContainer>
        {keys.map(({ key, label, width = {}, format }) => (
          <GridItem key={key} {...width}>
            <Field data={data} label={label} value={format ? format(data?.[key]) : data?.[key]} />
          </GridItem>
        ))}
        {/* {kycKey === 'corporate' && (
          <GridItemNew>
            <RowWithCheck
              text="Is The Ultimate Holding Company A Regulated Entity Or Listed Company In a FATF Jurisdiction?"
              isDone={data?.inFatfJurisdiction}
            />
          </GridItemNew>
        )} */}
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
