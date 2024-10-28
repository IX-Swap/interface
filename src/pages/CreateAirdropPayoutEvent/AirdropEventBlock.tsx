import React, { FC, useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { FormGrid } from 'pages/KYC/styleds'
import { TextInput, Select } from 'pages/KYC/common'
import { PinnedContentButton } from 'components/Button'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { AreYouSureModal } from 'components/AreYouSureModal'
import { useShowError } from 'state/application/hooks'
import { FormValues } from './utils'
import { ButtonsContainer, PayoutFormCard } from 'pages/CreatePayoutEvent/styleds'
import { useTokensList } from 'hooks/useTokensList'
import { PublishAirdropModal } from './PublishAirdropModal'
import { usePayoutAirdropContract } from 'hooks/useContract'
import { TYPE } from 'theme'
import { sharedResourceLinks } from 'services/apiUrls'
import styled from 'styled-components'
import { CsvUploader } from './CsvUploader'

interface Props {
  onValueChange: (key: string, value: any) => void
  availableForEditing: string[]
}

export const AirdropEventBlock: FC<Props> = ({ onValueChange, availableForEditing }) => {
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const { values, errors, touched, validateForm, setTouched, resetForm, setFieldValue } = useFormikContext<FormValues>()
  const { token } = values
  const [openModal, setOpenModal] = useState(false)
  const [totalWallets, setTotalWallets] = useState(0) // New state for total wallets
  const [maxTransfer, setMaxTransfer] = useState(0)
  const payoutContract = usePayoutAirdropContract()
  const csvTemplateLink = sharedResourceLinks.airdropCSVTemplateLink
  useEffect(() => {
    /**
     * The network change will update
     * the payout contract instance
     * and the security token list, payout token list
     */
    if (payoutContract) {
      payoutContract.maxTransfer().then(setMaxTransfer)
    }
    setFieldValue('secToken', '')
    setFieldValue('token', '')
  }, [payoutContract])

  const showError = useShowError()
  const { tokensOptions } = useTokensList()
  const payoutTokensOptions = tokensOptions.filter((option) => !option.isNative)
  const toggleIsWarningOpen = () => setIsWarningOpen((state) => !state)
  const onDelete = () => {
    toggleIsWarningOpen()
  }

  const open = async () => {
    setTouched({
      title: true,
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

  const handleCsvTemplateClick = (url: string) => {
    window.open(url, '_blank')
  }

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
          items={payoutTokensOptions}
          onSelect={(item) => onValueChange('token', item)}
          required
          error={touched.token ? errors.token : ''}
          tooltipText="Select the token you want to distribute for this payout event. (Used if your security token has other tokens in its governance)."
          isTokenLogoVisible={true}
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
      <FormGrid style={{ position: 'relative' }} columns={1}>
        <CsvUploader
          values={values}
          handleDropImage={handleDropImage}
          handleImageDelete={handleImageDelete}
          touched={touched}
          errors={errors}
          availableForEditing={availableForEditing}
          setTotalWallets={setTotalWallets}
          onValueChange={onValueChange}
          setTotalAmount={(value) => onValueChange('tokenAmount', value)}
          onCsvRowsChange={(value) => onValueChange('csvRows', value)}
        />
        <CsvTemplateLink color={'#6666ff'} onClick={() => handleCsvTemplateClick(csvTemplateLink)}>
          Refer to CSV Template
        </CsvTemplateLink>
      </FormGrid>

      <ButtonsContainer style={{ marginBottom: '25px' }}>
        <PinnedContentButton type="button" onClick={open}>
          <Trans>Submit</Trans>
        </PinnedContentButton>
      </ButtonsContainer>

      {openModal && (
        <PublishAirdropModal
          maxTransfer={maxTransfer}
          resetForm={resetForm}
          availableForEditing={availableForEditing}
          values={values}
          totalWallets={totalWallets}
          close={close}
        />
      )}
    </PayoutFormCard>
  )
}

const CsvTemplateLink = styled(TYPE.description2)`
  position: absolute;
  right: 10px;
  color: #6666ff;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #6666ff;
  }

  &:active {
    color: #6666ff;
  }
`
