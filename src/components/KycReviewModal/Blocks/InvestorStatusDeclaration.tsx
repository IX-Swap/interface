import React from 'react'
import styled from 'styled-components'

import { TYPE } from 'theme'
import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'

interface Props {
  data: IndividualKyc | CorporateKyc
  kycKey: any
}

export const InvestorStatusDeclaration = ({ data, kycKey }: Props) => {
  const isRetailInvestor = data.accredited !== 1
  const investorType = kycKey === 'individual' ? 'Individual' : 'Corporate'

  return (
    <Block title="Investor Status Declaration">
      <LabeledCheckBox>
        <TYPE.small color="#292933">
          {isRetailInvestor
            ? 'I declare I am a Retail Investor'
            : `I declare that I am a ${investorType} Accredited Investor`}
        </TYPE.small>
      </LabeledCheckBox>
    </Block>
  )
}

const LabeledCheckBox = styled.div`
  display: grid;
  // grid-template-columns: 40px 1fr;
  grid-template-rows: auto;
  place-items: start;
`
