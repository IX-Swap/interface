import React, { useState, FC } from 'react'
import styled from 'styled-components'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'
import { Trans } from '@lingui/macro'

import { ButtonIXSGradient } from 'components/Button'
import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowCenter } from 'components/Row'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { isValidAddress, shortAddress } from 'utils'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { addAdmin } from 'state/admin/hooks'
import { useAddPopup } from 'state/application/hooks'
import { Select } from 'pages/KYC/common'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { updateUser } from 'state/user/hooks'

import { StyledButtonGradientBorder } from './styleds'
import { adminRoles } from './mock'

interface Props {
  isOpen: boolean
  address: string
  isUpdating: boolean
  error: string
  role: any
  refreshCallback: () => void
  handleError: (value: string) => void
  close: () => void
  handleAddress: (value: string) => void
  open: () => void
  handleRole: (value: string) => void
}

export const EditAdmin: FC<Props> = ({
  isOpen,
  isUpdating,
  address,
  error,
  role,
  handleRole,
  handleError,
  handleAddress,
  close,
  open,
  refreshCallback,
}) => {
  const [isLoading, handleIsLoading] = useState(false)
  const addPopup = useAddPopup()

  const onAddressChange = (value: string) => {
    handleAddress(value)
  }

  const onAdd = async () => {
    if (isValidAddress(address)) {
      try {
        handleError('')
        handleIsLoading(true)

        if (isUpdating) {
          await updateUser(address, {
            role: role.label ? role.label.toLowerCase() : role.toLowerCase(),
            language: 'en',
            active: true,
            photoId: 0,
          })
        } else {
          await addAdmin(address, role.label ? role.label.toLowerCase() : role.toLowerCase())
        }

        handleIsLoading(false)
        close()
        addPopup({
          info: {
            success: true,
            summary: `Admin was ${isUpdating ? 'updated' : 'added'} successfully`,
          },
        })
        refreshCallback()
      } catch (err: any) {
        handleIsLoading(false)
        handleError('Address is already admin or exists user with this address')
      }
    } else {
      handleError('Invalid address')
    }
  }

  return (
    <>
      <StyledButtonGradientBorder onClick={open}>
        <Trans>Add Admin</Trans>
      </StyledButtonGradientBorder>
      <RedesignedWideModal isOpen={isOpen} onDismiss={close}>
        <ModalBlurWrapper data-testid="areYouSureModal" style={{ minWidth: '360px', position: 'relative' }}>
          <LoadingIndicator isLoading={isLoading} isRelative />
          <ModalContent>
            <Title>
              <Trans>{isUpdating ? 'Update Admin Role' : 'Add Admin'}</Trans>
              <CloseIcon data-testid="cross" onClick={close} />
            </Title>
            <Box marginBottom="16px">
              <Label marginBottom="11px" htmlFor="token-address">
                <TYPE.title11 color="text2">
                  <Trans>Wallet Address</Trans>
                </TYPE.title11>
              </Label>
              <AddressInput
                {...{
                  id: 'address',
                  value: isUpdating ? shortAddress(address) : address,
                  error: Boolean(error),
                  onChange: onAddressChange,
                  placeholder: ' ',
                  disabled: isUpdating,
                }}
              />
              {error && (
                <TYPE.small marginTop="4px" color={'red1'}>
                  {error}
                </TYPE.small>
              )}
            </Box>
            <Select
              withScroll
              label="Role of Admin"
              selectedItem={capitalizeFirstLetter(role.label ? role.label : role)}
              items={adminRoles}
              onSelect={(selectedRole) => handleRole(selectedRole)}
            />
            <RowCenter>
              <AddAdminButton onClick={onAdd}>
                <Trans>{isUpdating ? 'Update' : 'Add'}</Trans>
              </AddAdminButton>
            </RowCenter>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

const AddAdminButton = styled(ButtonIXSGradient)`
  margin-top: 32px;
  max-width: 150px;
  width: 100%;
`

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 42px 42px;
  border-radius: 20px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
