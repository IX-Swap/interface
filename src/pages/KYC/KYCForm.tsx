import React, { FC, useState } from 'react'

import Column from 'components/Column'
import { ProgressBar } from './ProgressBar'
import { ButtonText } from 'components/Button'

import { mockTopics } from './mock'
import { Grid, FormCard } from './styleds'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { TYPE } from 'theme'
import { GradientText } from 'pages/CustodianV2/styleds'

interface Props {
  goBack: () => void
}

export const KYCForm: FC<Props> = ({ goBack }: Props) => {
  const [topics] = useState(mockTopics)

  return (
    <>
      <ButtonText style={{ textDecoration: 'none' }} display="flex" marginBottom="64px" onClick={goBack}>
        <ArrowLeft />
        <TYPE.title4 display="flex" marginLeft="10px">
          KYC as <GradientText style={{ marginLeft: 8 }}>Individual</GradientText>
        </TYPE.title4>
      </ButtonText>

      <Grid>
        <div style={{ maxHeight: '800px', overflowY: 'scroll', gap: '35px' }}>
          <Column style={{ gap: '35px' }}>
            <FormCard style={{ height: 400 }} id="personal">
              Personal Information
            </FormCard>
            <FormCard style={{ height: 400 }} id="address">
              Address
            </FormCard>
            <FormCard style={{ height: 400 }} id="sourceOfFunds">
              Source of funds
            </FormCard>
            <FormCard style={{ height: 400 }} id="investorStatus">
              Investor status
            </FormCard>
            <FormCard style={{ height: 400 }} id="fatca">
              FATCA
            </FormCard>
            <FormCard style={{ height: 400 }} id="optInRequirement">
              Opt-in Requirement
            </FormCard>
            <FormCard style={{ height: 400 }} id="tax">
              Tax
            </FormCard>
            <FormCard style={{ height: 400 }} id="upload">
              Upload
            </FormCard>
          </Column>
        </div>

        <Column>
          <ProgressBar
            topics={topics}
            description="Sed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
            reasons={['Last name', 'Gender', 'Middle name']}
          />
        </Column>
      </Grid>
    </>
  )
}
