import React, { FC, useState } from 'react'
import { Box, Flex } from 'rebass'
import { Trans } from '@lingui/macro'

import { TYPE } from 'theme'
import { PayoutType } from './PayoutType'
import { ExtraInfoCard, FormGrid } from 'pages/KYC/styleds'
import { Select, TextInput, Uploader } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'

import { FormCard } from './styleds'
import { mockSecTokens } from './mock'
import { Textarea } from 'components/Input'
import { Label } from 'components/Label'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'

export const PayoutForm: FC = () => {
  const [desc, setDesc] = useState('')

  return (
    <FormCard>
      <TYPE.title6 marginBottom="28px">
        <Trans>PAYOUT EVENT</Trans>
      </TYPE.title6>

      <PayoutType />

      <Box marginBottom="20px">
        <FormGrid style={{ marginBottom: 8 }}>
          <Select
            label="Payout Token"
            placeholder="Select token"
            selectedItem={null}
            items={mockSecTokens}
            onSelect={() => null}
            required
          />
          <TextInput placeholder="1000" label="Amount of Token" onChange={() => null} value={''} />
        </FormGrid>
        <ExtraInfoCard>
          <TYPE.description2 fontWeight={400}>
            Payout token computed as of May 22, 2022 at 1 USDT per SEC token
          </TYPE.description2>
        </ExtraInfoCard>
      </Box>

      <FormGrid style={{ marginBottom: 24 }}>
        <DateInput
          label="Payment Start Date"
          placeholder="Choose start date"
          maxHeight={60}
          openTo="date"
          value={''}
          onChange={() => null}
          required
        />
        <DateInput
          label="Payment Deadline"
          placeholder="Choose deadline"
          maxHeight={60}
          openTo="date"
          value={''}
          onChange={() => null}
        />
      </FormGrid>

      <FormGrid columns={1} style={{ marginBottom: 24 }}>
        <TextInput
          placeholder="Provide a name for this payout event"
          label="Headline"
          onChange={() => null}
          value={''}
          required
        />
      </FormGrid>

      <FormGrid columns={1} style={{ marginBottom: 24 }}>
        <Box>
          <Label text="Payout Description" required />
          <Textarea
            placeholder="Give a brief description of this payout event"
            value={desc}
            style={{ height: '126px', background: '#271F4A66', marginBottom: 0 }}
            onChange={(e) => setDesc(e.currentTarget.value)}
          />
        </Box>
      </FormGrid>

      <Uploader title="Payout Attachments" files={[]} onDrop={() => null} handleDeleteClick={() => null} required />

      <Flex justifyContent="center" marginTop="32px">
        <ButtonGradientBorder padding="16px 24px" marginRight="32px" disabled>
          <Trans>Save as Draft</Trans>
        </ButtonGradientBorder>
        <ButtonIXSGradient padding="16px 24px" disabled>
          Publish Payout Event
        </ButtonIXSGradient>
      </Flex>
    </FormCard>
  )
}
