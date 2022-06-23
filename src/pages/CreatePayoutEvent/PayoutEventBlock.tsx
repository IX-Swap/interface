import React, { FC, useMemo, useState } from 'react'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import moment from 'moment'

import { TYPE } from 'theme'
import { ExtraInfoCard, FormGrid } from 'pages/KYC/styleds'
import { Select, TextInput, Uploader } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { Textarea } from 'components/Input'
import { Label } from 'components/Label'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { momentFormatDate } from 'pages/PayoutItem/utils'
import { useTokensList } from 'hooks/useTokensList'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { useShowError } from 'state/application/hooks'

import { PayoutType } from './PayoutType'
import { FormCard } from './styleds'
import { PublishPayoutModal } from './PublishPayoutModal'

interface Props {
  values: any
  onValueChange: (key: string, value: any) => void
  isRecordFuture: boolean
  totalSecTokenSum: number
}

export const PayoutEventBlock: FC<Props> = ({ isRecordFuture, totalSecTokenSum, values, onValueChange }) => {
  const [openModal, setOpenModal] = useState(false)
  const { token, tokenAmount, recordDate, startDate, secToken } = values
  const { tokensOptions } = useTokensList()
  const showError = useShowError()

  const open = () => {
    setOpenModal(true)
  }

  const close = () => {
    setOpenModal(false)
  }

  const handleDropImage = (acceptedFile: any) => {
    const file = acceptedFile
    if (file?.size > MAX_FILE_UPLOAD_SIZE) {
      showError(MAX_FILE_UPLOAD_SIZE_ERROR)
    } else {
      const arrayOfFiles = [...values.files]
      arrayOfFiles.push(file)

      onValueChange('files', arrayOfFiles)
    }
  }

  const handleImageDelete = (index: number) => {
    const arrayOfFiles = [...values.files]
    arrayOfFiles.splice(index, 1)

    onValueChange('files', arrayOfFiles)
  }

  const isButtonDisabled = useMemo(() => {
    for (const key in values) {
      if (['secTokenAmount', 'id', 'otherType', 'tokenAmount', 'endDate'].includes(key)) continue
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
            selectedItem={token}
            items={tokensOptions}
            onSelect={(item) => onValueChange('token', item)}
            required
          />
          <TextInput
            placeholder="1000"
            label="Amount of Token"
            onChange={(e: any) => onValueChange('tokenAmount', e.currentTarget.value)}
            value={tokenAmount}
          />
        </FormGrid>
        {!isRecordFuture && recordDate && tokenAmount && token && secToken && (
          <ExtraInfoCard>
            <TYPE.description2 fontWeight={400}>
              {t`Payout token computed as of ${momentFormatDate(recordDate, 'LL')} at ${(
                totalSecTokenSum / +tokenAmount
              ).toFixed(2)} ${token.label} per SEC token`}
            </TYPE.description2>
          </ExtraInfoCard>
        )}
      </Box>

      <FormGrid style={{ marginBottom: 24 }}>
        <DateInput
          label="Payment Start Date"
          placeholder="Choose start date"
          maxHeight={60}
          minDate={recordDate && moment(new Date(recordDate)).add(1, 'days')}
          openTo="date"
          value={startDate}
          onChange={(newDate) => onValueChange('startDate', newDate)}
          required
        />
        <DateInput
          label="Payment Deadline"
          placeholder="Choose deadline"
          maxHeight={60}
          minDate={startDate && moment(new Date(startDate)).add(1, 'days')}
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

      <Uploader
        title="Payout Attachments"
        files={values.files}
        onDrop={handleDropImage}
        handleDeleteClick={handleImageDelete}
        required
      />

      <Flex justifyContent="center" marginTop="32px">
        <ButtonGradientBorder type="submit" padding="16px 24px" marginRight="32px" disabled={true}>
          <Trans>Save as Draft</Trans>
        </ButtonGradientBorder>
        <ButtonIXSGradient type="button" padding="16px 24px" onClick={open} disabled={isButtonDisabled}>
          Publish Payout Event
        </ButtonIXSGradient>
      </Flex>

      {openModal && <PublishPayoutModal values={values} close={close} isRecordFuture={isRecordFuture} />}
    </FormCard>
  )
}
