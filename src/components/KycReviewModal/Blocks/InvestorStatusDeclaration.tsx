import React from 'react'
import styled from 'styled-components'

import { TYPE } from 'theme'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'
import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'

interface Props {
  data: IndividualKyc | CorporateKyc
  kycKey: string
}

export const InvestorStatusDeclaration = ({ data, kycKey }: Props) => {
  return (
    <Block title="Investor Status Declaration">
      <>
        <Column style={{ gap: '16px' }}>
          <LabeledCheckBox>
            <Checkbox scaleSize={1.4} isRadio checked={data.accredited === 0} disabled label='' />
            <TYPE.title6 style={{ textTransform: 'uppercase' }}>I am not an accredited investor</TYPE.title6>
          </LabeledCheckBox>

          <LabeledCheckBox>
            <Checkbox scaleSize={1.4} isRadio checked={data.accredited === 1} disabled label='' />
            <TYPE.title6 style={{ textTransform: 'uppercase' }}>
              {`I declare that i am “${ kycKey === 'individual' ? 'individual' : 'corporate' } accredited Investor”`}
            </TYPE.title6>
          </LabeledCheckBox>
        </Column>
      </>
    </Block>
  )
}

const LabeledCheckBox = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto;

  place-items: start;
`
