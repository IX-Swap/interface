import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'

import dayjs from 'dayjs'

import { TYPE } from 'theme'

import { momentFormatDate } from 'pages/PayoutItem/utils'
import { ExtraInfoCard, FormGrid } from 'pages/KYC/styleds'
import { Select, TextareaInput, TextInput, Uploader } from 'pages/KYC/common'

import { DateInput } from 'components/DateInput'

import { ButtonError, ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { useTokensList } from 'hooks/useTokensList'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'

import useTheme from 'hooks/useTheme'
import { PAYOUT_STATUS } from 'constants/enums'
import { useDeletePayoutItem } from 'state/payout/hooks'
import { AreYouSureModal } from 'components/AreYouSureModal'

import { useShowError } from 'state/application/hooks'

import { FormValues } from './utils'
import { PayoutType } from './PayoutType'
import { PublishPayoutModal } from './PublishPayoutModal'

import { FormCard, ButtonsContainer } from './styleds'

interface Props {
  onValueChange: (key: string, value: any) => void
  isRecordFuture: boolean
  isEdit: boolean
  paid: boolean
  totalSecTokenSum: number
  availableForEditing: string[]
  status: PAYOUT_STATUS
  payoutId?: number
}

export const PayoutEventBlock: FC<Props> = ({
  isRecordFuture,
  totalSecTokenSum,
  onValueChange,
  availableForEditing,
  status,
  isEdit,
  payoutId,
  paid,
}) => {
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const { values, errors, touched, validateForm, setTouched } = useFormikContext<FormValues>()

  const { bg19 } = useTheme()
  const [openModal, setOpenModal] = useState(false)
  const { token, tokenAmount, recordDate, startDate, secToken, endDate } = values
  const { tokensOptions } = useTokensList()
  const deletePayout = useDeletePayoutItem()
  const showError = useShowError()
  const history = useHistory()

  const toggleIsWarningOpen = () => setIsWarningOpen((state) => !state)

  useEffect(() => {
    const { title, secToken, type } = values
    if (!title && secToken?.value && type) {
      onValueChange('title', `${type} payout event for ${secToken.label}`)
    }
  }, [values])

  const onDelete = () => {
    toggleIsWarningOpen()

    if (payoutId) {
      deletePayout(payoutId)
      history.push('/token-manager/my-tokens')
    }
  }

  const open = async () => {
    setTouched({
      title: true,
      description: true,
      type: true,
      otherType: true,
      secTokenAmount: true,
      tokenAmount: true,
      recordDate: true,
      startDate: true,
      endDate: true,
      secToken: true,
      token: true,
      files: true,
    })
    const errors = await validateForm()
    if (Object.keys(errors).length === 0) {
      setOpenModal(true)
    }
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

  return (
    <FormCard>
      <AreYouSureModal
        onAccept={onDelete}
        onDecline={toggleIsWarningOpen}
        isOpen={isWarningOpen}
        declineText="Cancel"
      />
      <TYPE.title6 marginBottom="28px">
        <Trans>PAYOUT EVENT</Trans>
      </TYPE.title6>

      <PayoutType onValueChange={onValueChange} availableForEditing={availableForEditing} />

      <Box marginBottom="20px">
        <FormGrid style={{ marginBottom: 8 }}>
          <Select
            label="Payout Token"
            placeholder="Select token"
            selectedItem={token}
            items={tokensOptions}
            onSelect={(item) => onValueChange('token', item)}
            required
            error={touched.token ? errors.token : ''}
            tooltipText="Select the token you want to distribute for this payout event. (Used if your security token has other tokens in its governance)."
            isDisabled={!availableForEditing.includes('token')}
          />
          <TextInput
            placeholder="1000"
            label="Token Amount"
            onChange={(e: any) => onValueChange('tokenAmount', e.currentTarget.value)}
            value={tokenAmount}
            error={touched.tokenAmount ? errors.tokenAmount : ''}
            tooltipText="Indicate the total number of tokens you want to distribute for this payout event."
            disabled={!availableForEditing.includes('tokenAmount')}
          />
        </FormGrid>
        {!isRecordFuture && recordDate && tokenAmount && token && secToken && (
          <ExtraInfoCard>
            <TYPE.description2 fontWeight={400}>
              {t`Payout token computed as of ${momentFormatDate(recordDate, 'LL')} at ${(
                +tokenAmount / totalSecTokenSum
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
          minDate={dayjs(new Date()).add(1, 'days')}
          maxDate={endDate ? dayjs(endDate).subtract(1, 'days') : undefined}
          openTo="date"
          value={startDate}
          onChange={(newDate) => onValueChange('startDate', dayjs(newDate).local().format('YYYY-MM-DD'))}
          required
          error={touched.startDate ? errors.startDate : ''}
          tooltipText="Select the date when the distribution of tokens for this payout event will start."
          isDisabled={!availableForEditing.includes('startDate')}
        />
        <DateInput
          label="Payment Deadline"
          placeholder="Choose deadline"
          maxHeight={60}
          minDate={startDate ? dayjs(startDate).add(1, 'days') : dayjs(new Date()).add(2, 'days')}
          openTo="date"
          value={values.endDate}
          onChange={(newDate) => onValueChange('endDate', dayjs(newDate).local().format('YYYY-MM-DD'))}
          error={touched.endDate ? errors.endDate : ''}
          tooltipText="Select the deadline when the distribution of tokens for this payout event will end."
          isDisabled={!availableForEditing.includes('endDate')}
        />
      </FormGrid>

      <FormGrid columns={1} style={{ marginBottom: 24 }}>
        <TextInput
          placeholder="Provide a name for this payout event"
          label="Event name"
          onChange={(e: any) => onValueChange('title', e.currentTarget.value)}
          value={values.title}
          required
          error={touched.title ? errors.title : ''}
          tooltipText="Select a name for this payout event. Note that this will be the title of this payout that your token holders can use as a reference."
          disabled={!availableForEditing.includes('title')}
        />
      </FormGrid>

      <FormGrid columns={1} style={{ marginBottom: 24 }}>
        <TextareaInput
          label="Payout Memo"
          required
          placeholder="Give a brief description of this payout event"
          value={values.description}
          style={{ height: '162px', background: bg19, marginBottom: 0 }}
          onChange={(e: any) => onValueChange('description', e.currentTarget.value)}
          error={touched.description ? errors.description : ''}
          disabled={!availableForEditing.includes('description')}
        />
      </FormGrid>

      <Uploader
        title="Payout Attachments"
        files={values.files}
        onDrop={handleDropImage}
        handleDeleteClick={handleImageDelete}
        error={touched.files ? errors.files : ''}
        tooltipText="Please attach any documentation relevant to the payout event (optional)."
        isDisabled={!availableForEditing.includes('files')}
      />

      <ButtonsContainer>
        {!isEdit && (
          <ButtonGradientBorder type="submit">
            <Trans>Save as Draft</Trans>
          </ButtonGradientBorder>
        )}

        {isEdit && status === PAYOUT_STATUS.DRAFT && (
          <ButtonError error type="button" onClick={toggleIsWarningOpen}>
            <Trans>Delete Draft</Trans>
          </ButtonError>
        )}

        {isEdit && (
          <ButtonGradientBorder type="submit">
            <Trans>Save Changes</Trans>
          </ButtonGradientBorder>
        )}

        {[PAYOUT_STATUS.DRAFT].includes(status) ? (
          <ButtonIXSGradient type="button" onClick={open}>
            <Trans>Publish Event</Trans>
          </ButtonIXSGradient>
        ) : (
          !paid && (
            <ButtonIXSGradient type="button" onClick={open}>
              <Trans>Pay</Trans>
            </ButtonIXSGradient>
          )
        )}
      </ButtonsContainer>

      {openModal && <PublishPayoutModal values={values} close={close} isRecordFuture={isRecordFuture} />}
    </FormCard>
  )
}
