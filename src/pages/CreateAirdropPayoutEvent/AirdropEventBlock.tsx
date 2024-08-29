import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { TYPE } from 'theme'
import { FormGrid } from 'pages/KYC/styleds'
import { TextInput, Select } from 'pages/KYC/common'
import { ButtonGradientBorder, PinnedContentButton } from 'components/Button'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { PAYOUT_STATUS } from 'constants/enums'
import { useDeletePayoutItem } from 'state/payout/hooks'
import { AreYouSureModal } from 'components/AreYouSureModal'
import { useShowError } from 'state/application/hooks'
import { FormValues } from './utils'
import { Uploader } from 'components/Uploader'
import { ButtonsContainer, PayoutFormCard } from 'pages/CreatePayoutEvent/styleds'
import { useTokensList } from 'hooks/useTokensList'
import { PublishAirdropModal } from './PublishAirdropModal'
const CURRENT_DATE = new Date().toISOString()
const END_DATE = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()

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
  const { token } = values
  const [openModal, setOpenModal] = useState(false)
  const [totalWallets, setTotalWallets] = useState(0) // New state for total wallets
  const [totalAmount, setTotalAmount] = useState(0)
  const deletePayout = useDeletePayoutItem()
  const showError = useShowError()
  const history = useHistory()
  const { tokensOptions } = useTokensList()
  const toggleIsWarningOpen = () => setIsWarningOpen((state) => !state)
  const fallbackTimestamp = 0
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
      memo: true,
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
  
  //hardcoded for now
  const recordDate = CURRENT_DATE
  const startDate = CURRENT_DATE
  const endDate = END_DATE

  return (
    <PayoutFormCard>
      <AreYouSureModal
        onAccept={onDelete}
        onDecline={toggleIsWarningOpen}
        isOpen={isWarningOpen}
        declineText="Cancel"
      />

      <FormGrid columns={2} style={{ marginBottom: 24 }}>
        <Select
          addCustom
          label="Payout Token"
          placeholder="Select token or paste address"
          selectedItem={token}
          items={tokensOptions}
          onSelect={(item) => onValueChange('token', item)}
          required
          error={touched.token ? errors.token : ''}
          tooltipText="Select the token you want to distribute for this payout event. (Used if your security token has other tokens in its governance)."
          // isDisabled={!availableForEditing.includes('token')}
        />
          <TextInput
              placeholder="Memo"
              label="Memo"
              onChange={(e: any) => onValueChange('memo', e.currentTarget.value)}
              value={values.memo}
              required
              error={touched.memo ? errors.memo : ''}
              tooltipText="Select a name for this payout event. Note that this will be the title of this payout that your token holders can use as a reference."
              disabled={!availableForEditing.includes('memo')}
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
        setTotalWallets={setTotalWallets}
        setTotalAmount={setTotalAmount}
      />

      <ButtonsContainer style={{ marginBottom: '25px' }}>
        {!isEdit && (
          <ButtonGradientBorder type="submit">
            <TYPE.main2>Save as Draft</TYPE.main2>
          </ButtonGradientBorder>
        )}

        <PinnedContentButton type="button" onClick={open}>
          <Trans>Submit</Trans>
        </PinnedContentButton>
      </ButtonsContainer>

      {openModal && (
        <PublishAirdropModal
          onlyPay={status !== PAYOUT_STATUS.DRAFT && !paid}
          availableForEditing={availableForEditing}
          values={{ ...values, recordDate, startDate, endDate }}
          totalWallets={totalWallets}
          totalAmount={totalAmount}
          close={close}
        />
      )}
    </PayoutFormCard>
  )
}
