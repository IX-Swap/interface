import React, { FC, useMemo } from 'react'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'

import { TYPE } from 'theme'
import { ExtraInfoCard, FormGrid } from 'pages/KYC/styleds'
import { Select, TextInput, Uploader } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { Textarea } from 'components/Input'
import { Label } from 'components/Label'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { momentFormatDate } from 'pages/PayoutItem/utils'

import { PayoutType } from './PayoutType'
import { FormCard } from './styleds'
import { mockSecTokens } from './mock'

interface Props {
  values: any
  onValueChange: (key: string, value: any) => void
}

export const PayoutEventBlock: FC<Props> = ({ values, onValueChange }) => {
  const { tokenId, tokenAmount, recordDate } = values

  const isButtonDisabled = useMemo(() => {
    for (const key in values) {
      if (['secTokenAmount', 'id', 'otherType'].includes(key)) continue
      if (!values[key]) return true
    }
    return false
  }, [values]) // temporary

  return (
    <FormCard>
      <TYPE.title6 marginBottom="28px">
        <Trans>PAYOUT EVENT</Trans>
      </TYPE.title6>

      <PayoutType values={values} onValueChange={onValueChange} />

      <Box marginBottom="20px">
        <FormGrid style={{ marginBottom: 8 }}>
          <Select
            label="Payout Token"
            placeholder="Select token"
            selectedItem={tokenId}
            items={mockSecTokens}
            onSelect={(item) => onValueChange('tokenId', item)}
            required
          />
          <TextInput
            placeholder="1000"
            label="Amount of Token"
            onChange={(e: any) => onValueChange('tokenAmount', e.currentTarget.value)}
            value={tokenAmount}
          />
        </FormGrid>
        {recordDate && tokenAmount && tokenId && (
          <ExtraInfoCard>
            <TYPE.description2 fontWeight={400}>
              {t`Payout token computed as of ${momentFormatDate(recordDate, 'LL')} at ${tokenAmount} ${
                tokenId.label
              } per SEC token`}
            </TYPE.description2>
          </ExtraInfoCard>
        )}
      </Box>

      <FormGrid style={{ marginBottom: 24 }}>
        <DateInput
          label="Payment Start Date"
          placeholder="Choose start date"
          maxHeight={60}
          openTo="date"
          value={values.startDate}
          onChange={(newDate) => onValueChange('startDate', newDate)}
          required
        />
        <DateInput
          label="Payment Deadline"
          placeholder="Choose deadline"
          maxHeight={60}
          openTo="date"
          value={values.endDate}
          onChange={(newDate) => onValueChange('endDate', newDate)}
        />
      </FormGrid>

      <FormGrid columns={1} style={{ marginBottom: 24 }}>
        <TextInput
          placeholder="Provide a name for this payout event"
          label="Headline"
          onChange={(e: any) => onValueChange('title', e.currentTarget.value)}
          value={values.title}
          required
        />
      </FormGrid>

      <FormGrid columns={1} style={{ marginBottom: 24 }}>
        <Box>
          <Label label="Payout Description" required />
          <Textarea
            placeholder="Give a brief description of this payout event"
            value={values.description}
            style={{ height: '126px', background: '#271F4A66', marginBottom: 0 }}
            onChange={(e: any) => onValueChange('description', e.currentTarget.value)}
          />
        </Box>
      </FormGrid>

      <Uploader title="Payout Attachments" files={[]} onDrop={() => null} handleDeleteClick={() => null} required />

      <Flex justifyContent="center" marginTop="32px">
        <ButtonGradientBorder type="submit" padding="16px 24px" marginRight="32px" disabled={isButtonDisabled}>
          <Trans>Save as Draft</Trans>
        </ButtonGradientBorder>
        <ButtonIXSGradient padding="16px 24px" disabled>
          Publish Payout Event
        </ButtonIXSGradient>
      </Flex>
    </FormCard>
  )
}
