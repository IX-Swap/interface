import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { TYPE } from 'theme'
import { FormGrid } from 'pages/KYC/styleds'
import { TextInput } from 'pages/KYC/common'
import { ButtonGradientBorder, PinnedContentButton } from 'components/Button'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { PAYOUT_STATUS } from 'constants/enums'
import { useDeletePayoutItem } from 'state/payout/hooks'
import { AreYouSureModal } from 'components/AreYouSureModal'
import { useShowError } from 'state/application/hooks'
import { FormValues } from './utils'
import { Uploader } from 'components/Uploader'
import { ButtonsContainer, PayoutFormCard } from 'pages/CreatePayoutEvent/styleds'
import { PublishPayoutModal } from 'pages/CreatePayoutEvent/PublishPayoutModal'

interface Props {
  onValueChange: (key: string, value: any) => void
  isEdit: boolean
  paid: boolean
  availableForEditing: string[]
  status: PAYOUT_STATUS
  payoutId?: number
}

export const AirdropEventBlock: FC<Props> = ({
  onValueChange,
  availableForEditing,
  status,
  isEdit,
  payoutId,
  paid,
}) => {
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const { values, errors, touched, validateForm, setTouched } = useFormikContext<FormValues>()

  const [openModal, setOpenModal] = useState(false)
  const deletePayout = useDeletePayoutItem()
  const showError = useShowError()
  const history = useHistory()

  const toggleIsWarningOpen = () => setIsWarningOpen((state) => !state)

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
      type: true,
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
    <PayoutFormCard>
      <AreYouSureModal
        onAccept={onDelete}
        onDecline={toggleIsWarningOpen}
        isOpen={isWarningOpen}
        declineText="Cancel"
      />

      <FormGrid columns={1} style={{ marginBottom: 24 }}>
        <TextInput
          placeholder="Provide a name for this payout event"
          label="Event Name"
          onChange={(e: any) => onValueChange('title', e.currentTarget.value)}
          value={values.title}
          required
          error={touched.title ? errors.title : ''}
          tooltipText="Select a name for this payout event. Note that this will be the title of this payout that your token holders can use as a reference."
          disabled={!availableForEditing.includes('title')}
        />
      </FormGrid>

      <Uploader
        isPayoutpage={true}
        acceptedFileTypes={['.csv']}
        title="Payout Attachments"
        files={values.files}
        onDrop={handleDropImage}
        handleDeleteClick={handleImageDelete}
        error={touched.files ? errors.files : ''}
        tooltipText="Please attach any documentation relevant to the payout event (optional)."
        isDisabled={!availableForEditing.includes('files')}
      />

      <ButtonsContainer style={{ marginBottom: '25px' }}>
        {!isEdit && (
          <ButtonGradientBorder type="submit">
            <TYPE.main2>Save as Draft</TYPE.main2>
          </ButtonGradientBorder>
        )}

        {status === PAYOUT_STATUS.DRAFT ? (
          <PinnedContentButton type="button" onClick={open}>
            <Trans>Submit</Trans>
          </PinnedContentButton>
        ) : (
          !paid && null
        )}
      </ButtonsContainer>

      {openModal && (
        <PublishPayoutModal
          values={values}
          close={close}
          isRecordFuture={false}
          onlyPay={status !== PAYOUT_STATUS.DRAFT && !paid}
          availableForEditing={availableForEditing}
        />
      )}
    </PayoutFormCard>
  )
}
