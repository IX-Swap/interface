import React, { useState } from 'react'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'
import { Trans } from '@lingui/macro'

import { ModalBlurWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowCenter } from 'components/Row'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { isValidAddress } from 'utils'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAddPopup } from 'state/application/hooks'
import { useAddOrRemoveWhitelisted, useAdminState } from 'state/admin/hooks'
import { StyledButtonGradientBorder } from 'components/AdminSecurityCatalog/styleds'

import { ModalContent, Title, AddButton } from './styleds'

export const AddAddress = () => {
  const [isOpen, handleIsOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const addPopup = useAddPopup()

  const { adminLoading } = useAdminState()

  const addOrRemoveWhitelisted = useAddOrRemoveWhitelisted()

  const open = () => handleIsOpen(true)

  const close = () => {
    setAddress('')
    setError('')
    handleIsOpen(false)
  }

  const onAdd = async () => {
    if (isValidAddress(address)) {
      const data = await addOrRemoveWhitelisted({ address, isWhitelisted: true })
      if (data?.id) {
        addPopup({
          info: {
            success: true,
            summary: `Wallet was added successfully in Whitelist`,
          },
        })
      } else {
        addPopup({
          info: {
            success: false,
            summary: `Something went wrong`,
          },
        })
      }
      close()
    } else {
      setError('Invalid address')
    }
  }

  return (
    <>
      <StyledButtonGradientBorder onClick={open}>
        <Trans>Add Wallet</Trans>
      </StyledButtonGradientBorder>
      <RedesignedWideModal isOpen={isOpen} onDismiss={close}>
        <ModalBlurWrapper data-testid="areYouSureModal" style={{ minWidth: '360px', position: 'relative' }}>
          <LoadingIndicator isLoading={adminLoading} isRelative />
          <ModalContent>
            <Title>
              <Trans>Add Wallet</Trans>
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
                  value: address,
                  error: Boolean(error),
                  onChange: setAddress,
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
              <AddButton onClick={onAdd}>
                <Trans>Add</Trans>
              </AddButton>
            </RowCenter>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}
