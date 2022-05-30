import React, { useState, FC, useMemo } from 'react'
import styled from 'styled-components'
import { Label } from '@rebass/forms'
import { Trans } from '@lingui/macro'
import { useFormik } from 'formik'

import { User } from 'state/admin/actions'
import { ButtonIXSGradient } from 'components/Button'
import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { addAdmin } from 'state/admin/hooks'
import { useAddPopup } from 'state/application/hooks'
import { Select, TextInput } from 'pages/KYC/common'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { updateUser } from 'state/user/hooks'
import { Checkbox } from 'components/Checkbox'
import { CopyAddress } from 'components/CopyAddress'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useSecTokenState } from 'state/secTokens/hooks'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { ROLES } from 'constants/roles'

import { StyledButtonGradientBorder } from './styleds'
import { adminRoles } from './mock'
import { validationSchema } from './validationSchema'

interface Props {
  isOpen: boolean
  item: User | null
  refreshCallback: () => void
  close: () => void
  open: () => void
}

export const UserModal: FC<Props> = ({ isOpen, item, close, open, refreshCallback }) => {
  const [isLoading, handleIsLoading] = useState(false)
  const [copied, setCopied] = useCopyClipboard()
  const addPopup = useAddPopup()

  const { tokens: secTokens } = useSecTokenState()

  const {
    values: { ethAddress, role, isWhitelisted, fullName, tokens },
    errors,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: item
      ? { ...item, tokens: item.tokens || [] }
      : { ethAddress: '', fullName: '', role: '', isWhitelisted: false, tokens: [] },
    onSubmit: async () => {
      try {
        handleIsLoading(true)

        if (item) {
          await updateUser(ethAddress, {
            role,
            isWhitelisted,
            fullName,
            tokens,
          })
        } else {
          await addAdmin(ethAddress)
        }

        handleIsLoading(false)
        close()
        addPopup({
          info: {
            success: true,
            summary: `Admin was ${item ? 'updated' : 'added'} successfully`,
          },
        })
        refreshCallback()
      } catch (err: any) {
        handleIsLoading(false)
      }
    },
  })

  const tokensOptions = useMemo(() => {
    if (secTokens?.length) {
      return secTokens.map((token) => ({
        label: token.symbol,
        value: token.address,
        icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
      }))
    }

    return []
  }, [secTokens])

  const handleSelectedTokens = (selectedToken: { label: string; value: string }) => {
    const currentTokens = [...tokens]
    const tokenIntex = tokens.findIndex(({ value }) => value === selectedToken.value)

    if (tokenIntex > -1) {
      currentTokens.splice(tokenIntex, 1)
    } else {
      currentTokens.push(selectedToken)
    }
    setFieldValue('tokens', currentTokens)
  }

  return (
    <>
      <StyledButtonGradientBorder onClick={open}>
        <Trans>Add User</Trans>
      </StyledButtonGradientBorder>
      <RedesignedWideModal isOpen={isOpen} onDismiss={close}>
        <ModalBlurWrapper
          data-testid="areYouSureModal"
          style={{ maxWidth: '547px', width: '100%', position: 'relative' }}
        >
          <LoadingIndicator isLoading={isLoading} isRelative />
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <Title>
                <Trans>{item ? 'Update User' : 'Add User'}</Trans>
                <CloseIcon data-testid="cross" onClick={close} />
              </Title>
              {item ? (
                <ExistingWallet>
                  <Label marginBottom="11px" htmlFor="ethAddress">
                    <TYPE.title11 color="text2">
                      <Trans>Wallet Address:</Trans>
                    </TYPE.title11>
                  </Label>
                  <div>
                    <CopyAddress address={ethAddress} isShortenAddress={false} copied={copied} setCopied={setCopied} />
                  </div>
                </ExistingWallet>
              ) : (
                <TextInput
                  style={{ fontWeight: 600 }}
                  label="Wallet Address:"
                  onChange={({ currentTarget: { value } }) => setFieldValue('ethAddress', value)}
                  value={ethAddress}
                  error={errors.ethAddress}
                  placeholder="Type Wallet Address"
                />
              )}
              <TextInput
                label="Full Name:"
                onChange={({ currentTarget: { value } }) => setFieldValue('fullName', value)}
                value={fullName || ''}
                error={errors.fullName}
                placeholder="Type Full Name"
              />
              <Select
                withScroll
                label={`User's Role:`}
                selectedItem={role.length > 0 ? capitalizeFirstLetter(role) : ''}
                items={adminRoles}
                onSelect={(selectedRole) => setFieldValue('role', selectedRole.value)}
              />
              {role === ROLES.TOKEN_MANAGER && (
                <Select
                  withScroll
                  isMulti
                  label={`Security Tokens:`}
                  selectedItem={tokens}
                  items={tokensOptions}
                  onSelect={handleSelectedTokens}
                />
              )}
              <Checkbox
                checked={isWhitelisted}
                onClick={() => setFieldValue('isWhitelisted', !isWhitelisted)}
                label={`Add to Whitelist`}
              />

              {/* <Box marginBottom="16px">
              <Label marginBottom="11px" htmlFor="token-ethAddress">
              <TYPE.title11 color="text2">
                  <Trans>Wallet Address</Trans>
                </TYPE.title11>
                </Label>
                <AddressInput
                {...{
                  id: 'ethAddress',
                  value: item ? shortAddress(ethAddress) : ethAddress,
                  error: Boolean(errors.ethAddress),
                  onChange: onAddressChange,
                  placeholder: ' ',
                  disabled: !!item,
                }}
              />
              {errors.ethAddress && (
                <TYPE.small marginTop="4px" color={'red1'}>
                  {errors.ethAddress}
                </TYPE.small>
              )}
            </Box> */}

              <ButtonWrapper>
                <StyledButton type="submit">
                  <Trans>{item ? 'Update User' : 'Add User'}</Trans>
                </StyledButton>
              </ButtonWrapper>
            </form>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

const ExistingWallet = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
`

const ButtonWrapper = styled.div`
  padding-top: 24px;
  margin-top: 8px;
  width: 100%;
  border-top: 1px solid rgba(39, 32, 70, 0.72); ;
`

const StyledButton = styled(ButtonIXSGradient)`
  width: 100%;
`

const ModalContent = styled(ModalContentWrapper)`
  > form {
    display: flex;
    flex-direction: column;
    padding: 20px 23px;
    border-radius: 20px;
    row-gap: 24px;
    label {
      margin-bottom: 8px;
      > div {
        font-weight: 400;
      }
    }
  }
`

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(39, 32, 70, 0.72); ;
`
