import React from 'react'
import styled from 'styled-components'

import { TYPE } from 'theme'
import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'

interface Props {
  data: IndividualKyc | CorporateKyc
  kycKey: any
}

export const InvestorStatusDeclaration = ({ data, kycKey }: Props) => {
  const isRetailInvestor = data.accredited !== 1
  const investorType = kycKey === 'individual' ? 'Individual' : 'Corporate'

  return (
    <Block title="Investor Status Declaration">
      <>
        <Column style={{ gap: '16px' }}>
          <LabeledCheckBox>
            <Checkbox scaleSize={0.9} isRadio checked={data.accredited !== 1} disabled label="" />
            <TYPE.small color="#292933">I declare I am a Retail Investor</TYPE.small>
          </LabeledCheckBox>

          <LabeledCheckBox>
            <Checkbox scaleSize={0.9} isRadio checked={data.accredited === 1} disabled label="" />
            <TYPE.small>
              {`I declare that I am ${kycKey === 'individual' ? 'an Individual' : 'a Corporate'} Accredited Investor`}
            </TYPE.small>
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
