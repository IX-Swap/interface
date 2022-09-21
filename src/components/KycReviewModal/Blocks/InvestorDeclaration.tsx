import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { TYPE } from 'theme'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'
import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { RowBetween } from 'components/Row'

interface Props {
  data: IndividualKyc | CorporateKyc
}

export const InvestorDeclaration = ({ data }: Props) => {
  console.log(data)
  return (
    <Block title="Investor Declaration">
      <>
        <Column style={{ margin: '1rem', marginLeft: 0, gap: "1rem" }}>
          <LabeledCheckBox>
            <Checkbox label="" isRadio disabled checked={data.investorDeclarationStatus === 'total-assets'} />
            <TYPE.description3>
              My total net personal assets (including up to SGD 1 million of your primary residence) exceed SGD 2 million
            </TYPE.description3>
          </LabeledCheckBox>

          <LabeledCheckBox>
            <Checkbox label="" isRadio disabled checked={data.investorDeclarationStatus === 'annual-income'} />
            <TYPE.description3>
              My income in the preceding 12 months is not less than SGD 300,000 (or its equivalent in a foreign currency)
            </TYPE.description3>
          </LabeledCheckBox>

          <LabeledCheckBox>
            <Checkbox label="" isRadio disabled checked={data.investorDeclarationStatus === 'financial-assets'} />
            <TYPE.description3>
              My personal financial asset (e.g. deposits and investment product) exceed SGD 1 million or 
              its equivalent (or its equivalent in foreign currency)
            </TYPE.description3>
          </LabeledCheckBox>
          
          <LabeledCheckBox>
            <Checkbox label="" isRadio disabled checked={data.investorDeclarationStatus === 'joint-income'} />
            <TYPE.description3>
              My jointly held account with my spouse/any individual meets any of the above
            </TYPE.description3>
          </LabeledCheckBox>

          
          <RowBetween marginTop="32px">
            <TYPE.title7 style={{ textTransform: 'uppercase' }}>
              <Trans>Opt-in requirement</Trans>
            </TYPE.title7>
          </RowBetween>

          <LabeledCheckBox>
            <Checkbox label='' disabled checked={data.acceptOfQualification} />

            <TYPE.description3>
              I have been informed of and understand the consequences of my qualification as an Accredited Investor, 
              in particular the reduced regulatory investor safeguards for Accredited Investors.
            </TYPE.description3>
          </LabeledCheckBox>
          
          <LabeledCheckBox>
            <Checkbox label='' disabled checked={data.acceptRefusalRight} />

            <TYPE.description3>
              I have been informed of and understand my right to opt out of the Accredited Investors status
            </TYPE.description3>
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
