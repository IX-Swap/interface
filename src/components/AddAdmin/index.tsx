import React, { useState, CSSProperties, FC } from 'react'
import styled from 'styled-components'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'
import { Trans } from '@lingui/macro'

import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowCenter } from 'components/Row'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { isValidAddress } from 'utils'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { addAdmin } from 'state/admin/hooks'
import { useAddPopup } from 'state/application/hooks'
import { StyledButtonGradientBorder } from 'components/AdminSecurityCatalog/styleds'

interface Props {
  buttonStyles?: CSSProperties
}

export const AddAdmin: FC<Props> = ({ buttonStyles }) => {
  const [isOpen, handleIsOpen] = useState(false)
  const [isLoading, handleIsLoading] = useState(false)
  const [address, handleAddress] = useState('')
  const [error, handleError] = useState('')
  const addPopup = useAddPopup()

  const open = () => handleIsOpen(true)
  const close = () => {
    handleIsOpen(false)
    handleAddress('')
  }

  const onAddressChange = (value: string) => {
    handleAddress(value)
  }

  const onAdd = async () => {
    if (isValidAddress(address)) {
      try {
        handleError('')
        handleIsLoading(true)
        await addAdmin(address)
        handleIsLoading(false)
        close()
        addPopup({
          info: {
            success: true,
            summary: 'Admin was added successfully',
          },
        })
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
      <StyledButtonGradientBorder style={buttonStyles} onClick={open}>
        <Trans>Add Admin</Trans>
      </StyledButtonGradientBorder>
      <RedesignedWideModal isOpen={isOpen} onDismiss={close}>
        <ModalBlurWrapper data-testid="areYouSureModal" style={{ minWidth: '360px', position: 'relative' }}>
          <LoadingIndicator isLoading={isLoading} isRelative />
          <ModalContent>
            <Title>
              <Trans>Add Admin</Trans>
              <CloseIcon data-testid="cross" onClick={close} />
            </Title>
            <Box>
              <Label marginBottom="11px" htmlFor="token-address">
                <TYPE.title11 color="text2">
                  <Trans>Wallet Address</Trans>
                </TYPE.title11>
              </Label>
              <AddressInput
                {...{
                  id: 'address',
                  value: address,
                  error: Boolean(error),
                  onChange: onAddressChange,
                  placeholder: ' ',
                }}
              />
              {error && (
                <TYPE.small marginTop="4px" color={'red1'}>
                  {error}
                </TYPE.small>
              )}
            </Box>
            <RowCenter>
              <AddAdminButton onClick={onAdd}>
                <Trans>Add</Trans>
              </AddAdminButton>
            </RowCenter>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

const AddButton = styled(ButtonGradientBorder)`
  min-height: 40px;
  height: 40px;
  font-size: 16px;
  margin-left: 16px;
`

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
