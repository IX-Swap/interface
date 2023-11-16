import React, { useState, FC, useMemo } from 'react'
import styled from 'styled-components'
import { Label } from '@rebass/forms'
import { Trans, t } from '@lingui/macro'
import { useFormik } from 'formik'

import { User } from 'state/admin/actions'
import { ButtonIXSGradient, PinnedContentButton } from 'components/Button'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAdminState, useCreateUser, useUpdateUser } from 'state/admin/hooks'
import { useAddPopup } from 'state/application/hooks'
import { Select, TextInput } from 'pages/KYC/common'
import { Checkbox } from 'components/Checkbox'
import { CopyAddress } from 'components/CopyAddress'
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
import { Line } from 'components/Line'
import { HelpCircle, Info } from 'react-feather'
import { MouseoverTooltip } from 'components/Tooltip'
import { TYPE } from 'theme'

interface Props {
  item?: User | null
  // close: () => void
  filters: Record<string, any>
}

export const UserMobileFilters: FC<Props> = ({ item, filters }) => {
  const [tokensToRemove, handleTokensToRemove] = useState<Option[]>([])
  const [showDeleteTokensWarning, handleShowDeleteTokensWarning] = useState(false)
  const [changeRole, handleChangeRole] = useState(false)
  const [showSummary, handleShowSummary] = useState(false)
  const { adminLoading } = useAdminState()
  const addPopup = useAddPopup()

  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const { tokens: secTokens } = useSecTokenState()

  const tokensOptions = useMemo((): Record<number, Option> => {
    if (secTokens?.length) {
      return secTokens.reduce((acc, token) => {
        const isDisabled = Boolean(
          (item?.managerOf || []).find(({ token: { payoutEvents } }) =>
            Boolean(payoutEvents.find(({ secTokenId }) => secTokenId === token.id))
          )
        )

        return {
          ...acc,
          [token.id]: {
            label: token.symbol,
            value: token.id,
            icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
            isDisabled,
          },
        }
      }, {})
    }

    return {}
  }, [secTokens])

  const initialValues = useMemo(() => {
    if (item && Object.keys(tokensOptions).length) {
      return {
        ...item,
        managerOf: item.managerOf.map(({ token: { id } }) => tokensOptions[id]),
        username: item.username || '',
      }
    }

    return { ethAddress: '', username: '', role: '', isWhitelisted: false, managerOf: [] }
  }, [item, tokensOptions])

  const submit = async () => {
    const isManager = role === ROLES.TOKEN_MANAGER;
    try {
      handleShowDeleteTokensWarning(false);
      handleChangeRole(false);
      if (item) {
        await updateUser(
          item.id,
          {
            role,
            isWhitelisted,
            username,
            managerOf: isManager ? managerOf.map((el) => el.value || el) : [],
            removedTokens: tokensToRemove.map(({ value }) => value),
          },
          filters
        );
        handleShowSummary(true);
      } else {
        await createUser(
          {
            ethAddress,
            role,
            isWhitelisted,
            username,
            managerOf: isManager ? managerOf.map((el) => el.value || el) : [],
          },
          filters
        );
        close();
      }
      handleTokensToRemove([]);

      addPopup({
        info: {
          success: true,
          summary: `User was ${item ? 'updated' : 'added'} successfully`,
        },
      });
    } catch (err: any) {
      handleTokensToRemove([]);
      addPopup({
        info: {
          success: false,
          summary: `Failed to ${item ? 'update' : 'add'} user. ${err.message}`,
        },
      });
    }
  };

  const tryToSubmit = () => {
    if (!item) {
      submit();
      return;
    }

    if (item.role !== role) {
      handleChangeRole(true);
      return;
    }

    const tokensToDelete = Object.values(initialValues.managerOf).reduce((acc: Option[], el) => {
      const isRemoved = managerOf.findIndex(({ value }) => value === el.value) === -1;

      if (isRemoved) acc.push(el);

      return acc;
    }, []);

    if (tokensToDelete.length > 0) {
      handleTokensToRemove(tokensToDelete);
      handleShowDeleteTokensWarning(true);
      return;
    }
    submit();
  };

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
  });

  const handleSelectedTokens = (selectedTokens: Option[]) => {
    setFieldValue('managerOf', selectedTokens);
  };

  const closeTokensWarning = () => {
    handleShowDeleteTokensWarning(false);
    setFieldValue('managerOf', initialValues.managerOf);
  };

  const closeRoleWarning = () => {
    handleChangeRole(false);
  };

  const closeSummary = () => {
    handleShowSummary(false);
    close();
  };

  const canNotEditRole = useMemo(() => {
    if (item && role === ROLES.TOKEN_MANAGER) {
      return item.managerOf.some(({ token: { payoutEvents } }) => Boolean(payoutEvents.length));
    }

    return false;
  }, [item]);

  return (
    <>
      <div>
        {showDeleteTokensWarning && (
          <RemoveTokensWarning tokens={tokensToRemove} close={closeTokensWarning} onConfirm={submit} />
        )}
        {changeRole && (
          <RoleChangeWarning close={closeRoleWarning} role={item?.role} newRole={role} onConfirm={submit} />
        )}

        {showSummary && (
          <UpdateSummary item={{ ethAddress, role, isWhitelisted, username, managerOf }} close={closeSummary} />
        )}

        <div style={{ maxWidth: '547px', width: '100%', position: 'relative' }}>
          <LoadingIndicator isLoading={adminLoading} isRelative />
          <div>
            <Title>
              <Trans>{item ? 'Update User' : 'Add User'}</Trans>
              {/* <CloseIcon data-testid="cross" onClick={close} /> */}
            </Title>
            <form onSubmit={handleSubmit}>
              {item ? (
                <ExistingWallet>
                  <Label marginBottom="11px" htmlFor="ethAddress">
                    <TYPE.title11 color="text2">
                      <Trans>Wallet Address:</Trans>
                    </TYPE.title11>
                  </Label>
                  <div>
                    <CopyAddress
                      wrapperStyles={{ wordBreak: 'break-word', color: '#B8B8CC', fontSize: '13px' }}
                      address={ethAddress}
                      isShortenAddress={false}
                    />
                  </div>
                  <Line style={{ marginTop: '30px' }} />
                </ExistingWallet>
              ) : (
                <TextInput
                  style={{ fontWeight: 500, color: '#B8B8CC' }}
                  label="Wallet Address:"
                  onChange={({ currentTarget: { value } }) => setFieldValue('ethAddress', value)}
                  value={ethAddress}
                  error={touched.ethAddress && errors.ethAddress}
                  placeholder="Type Wallet Address"
                />
              )}
              <TextInput
                style={{ background: '#F7F7FA' }}
                label="Full Name:"
                onChange={({ currentTarget: { value } }) => setFieldValue('username', value)}
                value={username || ''}
                error={touched.username && errors.username}
                placeholder="Type Full Name"
              />
              <Select
                style={{ background: '#F7F7FA' }}
                withScroll
                label={`User's Role:`}
                selectedItem={role}
                items={adminRoles}
                onSelect={(selectedRole) => setFieldValue('role', selectedRole.value)}
                error={
                  canNotEditRole
                    ? t`Token manager's role can't be changed, while they have published payout events`
                    : touched.role && errors.role
                }
                placeholder="Choose Role of User"
                isDisabled={canNotEditRole}
              />
              {role === ROLES.TOKEN_MANAGER && (
                <Select
                  style={{ background: '#F7F7FA' }}
                  withScroll
                  isMulti
                  error={touched.managerOf && errors.managerOf}
                  label={`Security Tokens:`}
                  isClearable={false}
                  selectedItem={managerOf}
                  items={Object.values(tokensOptions)}
                  onSelect={handleSelectedTokens}
                  placeholder="Choose Security Tokens"
                />
              )}
              <div style={{ display: 'flex' }}>
                {' '}
                <Checkbox
                  checked={isWhitelisted}
                  onClick={() => setFieldValue('isWhitelisted', !isWhitelisted)}
                  label={`Waive Withdrawal Fees`}
                />
                <MouseoverTooltip
                  text={
                    <Trans>
                      IXS custody service provider charges 20 USD withdrawal fees when users withdraw STOs from Vaults.
                      IXS passes the withdrawal fees to the user by charging the user an equivalent amount in native
                      tokens. By checking this box, the user will incur 1000% less withdrawal fees.
                    </Trans>
                  }
                >
                  <HelpCircle size="18" color={'#666680'} style={{ marginLeft: '8px', marginTop: '4px' }} />
                </MouseoverTooltip>
              </div>

              {item && role === ROLES.TOKEN_MANAGER && (
                <TokensBlock
                  initialItems={initialValues?.managerOf || []}
                  currentItems={managerOf || []}
                  onRemove={handleSelectedTokens}
                />
              )}
              <>
                <PinnedContentButton type="submit">
                  <Trans>{item ? 'Update' : 'Add User'}</Trans>
                </PinnedContentButton>
              </>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const ExistingWallet = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(39, 32, 70, 0.72);
`;

// Remove Modal-related styled components and imports
