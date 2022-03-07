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
          <Checkbox
            scaleSize={1.4}
            isRadio
            checked={data.accredited === 0}
            disabled
            label={<TYPE.title6 style={{ textTransform: 'uppercase' }}>I am not an accredited investor</TYPE.title6>}
          />
          <Checkbox
            scaleSize={1.4}
            isRadio
            checked={data.accredited === 1}
            disabled
            label={
              <TYPE.title6 style={{ textTransform: 'uppercase' }}>{`I declare that i am “${
                kycKey === 'individual' ? 'individual' : 'corporate'
              } accredited Investor”`}</TYPE.title6>
            }
          />
        </Column>
      </>
    </Block>
  )
}

const Content = styled.div`
  display: grid;
  row-gap: 20px;
  margin-top: 32px;
`
