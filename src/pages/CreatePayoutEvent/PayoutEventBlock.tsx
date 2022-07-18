import React, { FC, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'

import dayjs from 'dayjs'
import styled from 'styled-components'

import { TYPE } from 'theme'

import { momentFormatDate } from 'pages/PayoutItem/utils'
import { ExtraInfoCard, FormGrid } from 'pages/KYC/styleds'
import { Select, TextareaInput, TextInput, Uploader } from 'pages/KYC/common'

import { DateInput } from 'components/DateInput'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'

import { PAYOUT_STATUS } from 'constants/enums'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'

import { useTokensList } from 'hooks/useTokensList'
import useTheme from 'hooks/useTheme'

import { FormCard } from './styleds'
import { FormValues } from './utils'
import { PayoutType } from './PayoutType'
import { PublishPayoutModal } from './PublishPayoutModal'

import { ReactComponent as Calendar } from 'assets/images/calendar.svg'

import { useDeleteDraftPayout } from 'state/payout/hooks'
import { useShowError } from 'state/application/hooks'
import { useUserState } from 'state/user/hooks'

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

const READONLY_STATUSES = [PAYOUT_STATUS.STARTED, PAYOUT_STATUS.SCHEDULED, PAYOUT_STATUS.ENDED]

export const PayoutEventBlock: FC<Props> = ({
  isRecordFuture,
  totalSecTokenSum,
  onValueChange,
  availableForEditing,
  status,
  isEdit,
  payoutId
}) => {
  const { values, errors, touched, validateForm, setTouched } = useFormikContext<FormValues>()

  const { bg19 } = useTheme()
  const { me } = useUserState()
  const [openModal, setOpenModal] = useState(false)
  const { token, tokenAmount, recordDate, startDate, secToken, endDate } = values
  const { tokensOptions, secTokensOptions } = useTokensList()
  const showError = useShowError()
  const deleteDraft = useDeleteDraftPayout()
  const history = useHistory()

  const infoIsReadonly = useMemo(() => READONLY_STATUSES.includes(status), [])
  
  const secTokenLogo = useMemo(() => {
    const targetToken = secTokensOptions.find(t => t.value === secToken?.value);

    if (!targetToken) {
      return null
    }

    return targetToken.icon
  }, [me])

  useEffect(() => {
    const { title, secToken, type } = values
    if (!title && secToken?.value && type) {
      onValueChange('title', `${type} payout event for ${secToken.label}`)
    }
  }, [values])

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

  const deleteDraftOnclick = async () => {
    if (payoutId) {
      await deleteDraft(payoutId)
      history.push('/token-manager/my-tokens')
    }
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
      <TYPE.title6 marginBottom="28px">
        <Trans>PAYOUT EVENT</Trans>
      </TYPE.title6>


      {infoIsReadonly && (
        <ReadonlyItemsContainer>
          <div>
            <ReadonlyItemTitle>Payout Type</ReadonlyItemTitle>
            <ReadonlyItemContent>{values.type}</ReadonlyItemContent>
          </div>
          
          <div>
            <ReadonlyItemTitle>Payout Tokens</ReadonlyItemTitle>
            <ReadonlyItemContent>
              <div>
                {secTokenLogo}
              </div>
              <div>
                {values.secToken?.label}
              </div>
            </ReadonlyItemContent>
          </div>
          
          <div>
            <ReadonlyItemTitle>Payment Start Date</ReadonlyItemTitle>
            <ReadonlyItemContent>{momentFormatDate(values.startDate)} <Calendar /></ReadonlyItemContent>
          </div>
          
          <div>
            <ReadonlyItemTitle>Payment deadline</ReadonlyItemTitle>
            <ReadonlyItemContent>{momentFormatDate(values.endDate)} <Calendar /></ReadonlyItemContent>
          </div>
        </ReadonlyItemsContainer>
      )}

      {!infoIsReadonly && (
        <>
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
        </>
      )}

      {!infoIsReadonly && (
        <FormGrid style={{ marginBottom: 24 }}>
          <DateInput
            label="Payment Start Date"
            placeholder="Choose start date"
            maxHeight={60}
            minDate={recordDate ? dayjs(recordDate).add(1, 'days') : dayjs(new Date()).add(1, 'days')}
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
            minDate={startDate ? dayjs(startDate).add(1, 'days') : dayjs(new Date()).add(1, 'days')}
            openTo="date"
            value={values.endDate}
            onChange={(newDate) => onValueChange('endDate', dayjs(newDate).local().format('YYYY-MM-DD'))}
            error={touched.endDate ? errors.endDate : ''}
            tooltipText="Select the deadline when the distribution of tokens for this payout event will end."
            isDisabled={!availableForEditing.includes('endDate')}
          />
        </FormGrid>
      )}

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
          style={{ height: '126px', background: bg19, marginBottom: 0 }}
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

      <Flex justifyContent="center" marginTop="32px">
        {!isEdit && (
          <ButtonGradientBorder type="submit" padding="16px 24px" marginRight="32px">
            <Trans>Save as Draft</Trans>
          </ButtonGradientBorder>
        )}

        {isEdit && status === PAYOUT_STATUS.DRAFT && (
          <ButtonDelete type="button" padding="16px 24px" marginRight="32px" onClick={deleteDraftOnclick}>
            <Trans>Delete  Draft</Trans>
          </ButtonDelete>
        )}

        {isEdit && (
          <ButtonGradientBorder type="submit" padding="16px 24px" marginRight="32px">
            <Trans>Save Changes</Trans>
          </ButtonGradientBorder>
        )}

        {[PAYOUT_STATUS.DRAFT, PAYOUT_STATUS.DELAYED].includes(status) && (
          <ButtonIXSGradient type="button" padding="16px 24px" onClick={open}>
            Publish Payout Event
          </ButtonIXSGradient>
        )}
      </Flex>

      {openModal && <PublishPayoutModal values={values} close={close} isRecordFuture={isRecordFuture} />}
    </FormCard>
  )
}

const ReadonlyItemsContainer = styled(Flex)`
  justify-content: space-between;

  padding-bottom: 1.5rem;
`

const ReadonlyItemTitle = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #EDCEFF;
`

const ReadonlyItemContent = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: center;

  color: #FFFFFF;
`

const ButtonDelete = styled(ButtonIXSGradient)`
  background: linear-gradient(0deg, #ED0376, #ED0376), linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%);
  color: ${({ theme }) => theme.text1};

  :focus,
  :hover {
    background-color: transparent;
    background: transparent;
  }
  &:disabled {
    background-color: transparent;
    background: transparent;
    color: ${({ theme }) => theme.text1};
  }
`
