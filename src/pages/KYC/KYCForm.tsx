import React, { FC, useState } from 'react'

import Column from 'components/Column'
import { ProgressBar } from './ProgressBar'

import { mockTopics } from './mock'
import { Grid, FormCard } from './styleds'

export const KYCForm: FC = () => {
  const [topics] = useState(mockTopics)

  return (
    <Grid>
      <Column style={{ gap: '35px' }}>
        <FormCard style={{ height: 1000 }} id="personal" />
        <FormCard style={{ height: 1000 }} id="address" />
        <FormCard style={{ height: 1000 }} id="sourceOfFunds" />
        <FormCard style={{ height: 1000 }} id="investorStatus" />
        <FormCard style={{ height: 1000 }} id="fatca" />
        <FormCard style={{ height: 1000 }} id="optInRequirement" />
        <FormCard style={{ height: 1000 }} id="tax" />
        <FormCard style={{ height: 1000 }} id="upload" />
      </Column>
      <Column style={{ position: 'fixed', right: 16, width: 300 }}>
        <ProgressBar
          topics={topics}
          description="Sed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
          reasons={['Last name', 'Gender', 'Middle name']}
        />
      </Column>
    </Grid>
  )
}
