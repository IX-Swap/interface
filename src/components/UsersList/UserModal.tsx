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
import { useAdminState, useCreateUser, useUpdateUser } from 'state/admin/hooks'
import { useAddPopup } from 'state/application/hooks'
import { Select, TextInput } from 'pages/KYC/common'
import { Checkbox } from 'components/Checkbox'
import { CopyAddress } from 'components/CopyAddress'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useSecTokenState } from 'state/secTokens/hooks'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { ROLES } from 'constants/roles'

import { adminRoles } from './mock'
import { validationSchema } from './validationSchema'
import { Option, TokensBlock } from './TokensBlock'
import { RemoveTokensWarning } from './RemoveTokensWarning'
import { RoleChangeWarning } from './RoleChangeWarning'
import { UpdateSummary } from './UpdateSummary'

interface Props {
  item: User | null
  close: () => void
}

export const UserModal: FC<Props> = ({ item, close }) => {
  const [tokensToRemove, handleTokensToRemove] = useState<Option[]>([])
  const [changeRole, handleChangeRole] = useState(false)
  const [showSummary, handleShowSummary] = useState(false)
  const { adminLoading } = useAdminState()
  const [copied, setCopied] = useCopyClipboard()
  const addPopup = useAddPopup()

  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const { tokens: secTokens } = useSecTokenState()

  const tokensOptions = useMemo((): Record<number, Option> => {
    if (secTokens?.length) {
      return secTokens.reduce(
        (acc, token) => ({
          ...acc,
          [token.id]: {
            label: token.symbol,
            value: token.id,
            icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
          },
        }),
        {}
      )
    }

    return {}
  }, [secTokens])

  const initialValues = useMemo(() => {
    if (item && Object.keys(tokensOptions).length) {
      return { ...item, managerOf: item.managerOf.map((id) => tokensOptions[id]), username: item.username || '' }
    }

    return { ethAddress: '', username: '', role: '', isWhitelisted: false, managerOf: [] }
  }, [item, tokensOptions])

  const submit = async () => {
    const isManager = role === ROLES.TOKEN_MANAGER
    try {
      handleTokensToRemove([])
      handleChangeRole(false)
      if (item) {
        await updateUser(item.id, {
          role,
          isWhitelisted,
          username,
          managerOf: isManager ? managerOf.map((el) => el.value || el) : [],
        })
        handleShowSummary(true)
      } else {
        await createUser({
          ethAddress,
          role,
          isWhitelisted,
          username,
          managerOf: isManager ? managerOf.map((el) => el.value || el) : [],
        })
        close()
      }

      addPopup({
        info: {
          success: true,
          summary: `User was ${item ? 'updated' : 'added'} successfully`,
        },
      })
    } catch (err: any) {
      addPopup({
        info: {
          success: false,
          summary: `Failed to ${item ? 'update' : 'add'} user. ${err.message}`,
        },
      })
    }
  }

  const tryToSubmit = () => {
    if (!item) {
      submit()
      return
    }

    if (item.role !== role) {
      handleChangeRole(true)
      return
    }

    const tokensToDelete = Object.values(initialValues.managerOf).reduce((acc: Option[], el) => {
      const isRemoved = managerOf.findIndex(({ value }) => value === el.value) === -1

      if (isRemoved) acc.push(el)

      return acc
    }, [])

    if (tokensToDelete.length > 0) {
      handleTokensToRemove(tokensToDelete)
      return
    }
    submit()
  }

  const {
    values: { ethAddress, role, isWhitelisted, username, managerOf },
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues,
    onSubmit: tryToSubmit,
  })

  const handleSelectedTokens = (selectedTokens: Option[]) => {
    setFieldValue('managerOf', selectedTokens)
  }

  const closeTokensWarning = () => {
    handleTokensToRemove([])
  }

  const closeRoleWarning = () => {
    handleChangeRole(false)
  }

  const closeSummary = () => {
    handleShowSummary(false)
    close()
  }

  return (
    <>
      <RedesignedWideModal isOpen onDismiss={close}>
        {Boolean(tokensToRemove.length) && (
          <RemoveTokensWarning tokens={tokensToRemove} close={closeTokensWarning} onConfirm={submit} />
        )}
        {changeRole && (
          <RoleChangeWarning close={closeRoleWarning} role={item?.role} newRole={role} onConfirm={submit} />
        )}

        {showSummary && (
          <UpdateSummary item={{ ethAddress, role, isWhitelisted, username, managerOf } as User} close={closeSummary} />
        )}

        <ModalBlurWrapper data-testid="user-modal" style={{ maxWidth: '547px', width: '100%', position: 'relative' }}>
          <LoadingIndicator isLoading={adminLoading} isRelative />
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
                    <CopyAddress
                      wrapperStyles={{ wordBreak: 'break-word' }}
                      address={ethAddress}
                      isShortenAddress={false}
                      copied={copied}
                      setCopied={setCopied}
                    />
                  </div>
                </ExistingWallet>
              ) : (
                <TextInput
                  style={{ fontWeight: 600 }}
                  label="Wallet Address:"
                  onChange={({ currentTarget: { value } }) => setFieldValue('ethAddress', value)}
                  value={ethAddress}
                  error={touched.ethAddress && errors.ethAddress}
                  placeholder="Type Wallet Address"
                />
              )}
              <TextInput
                label="Full Name:"
                onChange={({ currentTarget: { value } }) => setFieldValue('username', value)}
                value={username || ''}
                error={touched.username && errors.username}
                placeholder="Type Full Name"
              />
              <Select
                withScroll
                label={`User's Role:`}
                selectedItem={role}
                items={adminRoles}
                onSelect={(selectedRole) => setFieldValue('role', selectedRole.value)}
                error={touched.role && errors.role}
                placeholder="Choose Role of User"
              />
              {role === ROLES.TOKEN_MANAGER && (
                <Select
                  withScroll
                  isMulti
                  label={`Security Tokens:`}
                  selectedItem={managerOf}
                  items={Object.values(tokensOptions)}
                  onSelect={handleSelectedTokens}
                  placeholder="Choose Security Tokens"
                />
              )}
              <Checkbox
                checked={isWhitelisted}
                onClick={() => setFieldValue('isWhitelisted', !isWhitelisted)}
                label={`Add to Whitelist`}
              />
              {item && role === ROLES.TOKEN_MANAGER && (
                <TokensBlock
                  initialItems={initialValues?.managerOf || []}
                  currentItems={managerOf || []}
                  onRemove={handleSelectedTokens}
                />
              )}
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
  overflow: auto;
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
