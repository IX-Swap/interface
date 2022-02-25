import React from 'react'
import styled from 'styled-components'

import { TYPE } from 'theme'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'
import { CorporateKyc, IndividualKyc } from 'state/admin/actions'
import { corporateRepresentOptions, individualRepresentOptions } from 'pages/KYC/mock'

import { kycData } from '../utils/kyc-data'

import { Block } from '../molecules/Block'
import { RowWithCheck } from '../molecules/RowWithCheck'
import { investorStatusDeclarationKeys } from '../utils/constants'

interface Props {
  data: IndividualKyc | CorporateKyc
  kycKey: string
}

export const InvestorStatusDeclaration = ({ data, kycKey }: Props) => {
  const keys = kycKey === 'individual' ? individualRepresentOptions : corporateRepresentOptions

  return (
    <Block title="Investor Status Declaration">
      <>
        <Column style={{ gap: '16px' }}>
          <Checkbox
            scaleSize={1.4}
            isRadio
            checked={!data.accredited}
            disabled
            label={<TYPE.title6 style={{ textTransform: 'uppercase' }}>I am not an accredited investor</TYPE.title6>}
          />
          <Checkbox
            scaleSize={1.4}
            isRadio
            checked={!!data.accredited}
            disabled
            label={
              <TYPE.title6 style={{ textTransform: 'uppercase' }}>{`I declare that i am “${
                kycKey === 'individual' ? 'individual' : 'corporate'
              } accredited Investor”`}</TYPE.title6>
            }
          />
        </Column>
        <Content>
          {!!data.accredited &&
            keys.map((option, index) => (
              <RowWithCheck key={index} text={option} isDone={index + 1 === data.accredited} />
            ))}
        </Content>
      </>
    </Block>
  )
}

const Content = styled.div`
  display: grid;
  row-gap: 20px;
  margin-top: 32px;
`
