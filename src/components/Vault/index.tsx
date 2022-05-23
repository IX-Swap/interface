import React, { useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'

import { useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from 'pages/KYC/enum'
import { useAuthState } from 'state/auth/hooks'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'

import { ExistingVault } from './ExistingVault'
import { NoVault } from './NoVault'

interface Props {
  currency?: Currency
  token: any
}
export const Vault = ({ currency, token }: Props) => {
  const { token: jwtToken } = useAuthState()

  const {
    custodianStatus,
    brokerDealerStatus,
    isApproved: vaultExists,
    accreditationRequest,
    platform,
    message,
  } = useAccreditationStatus((currency as any)?.address || 0)
  const newToken = { ...currency, isToken: true }
  const { kyc } = useKYCState()

  const userHaveValidAccount = useMemo(() => {
    const { kycType } = token
    if (!kycType || !kyc || ![KYCStatuses.APPROVED, KYCStatuses.REJECTED].includes(kyc?.status)) return true

    const getUserAccountType = () => {
      const kycType = kyc?.individualKycId ? 'individual' : 'corporate'

      const userKyc = kyc?.individual || kyc?.corporate

      if (userKyc?.accredited) {
        return `${kycType}Accredited`
      }
      return `${kycType}AccreditedNot`
    }

    const userAccountType = getUserAccountType()

    const availableTypes = Object.keys(kycType).reduce(
      (acc: string[], key: string) => (key.includes('Accredited') && kycType[key] ? [...acc, key] : acc),
      []
    )

    if (availableTypes.includes(userAccountType)) return true

    return kycType[userAccountType]
  }, [kyc, token])

  if (!jwtToken) {
    return (
      <RowCenter style={{ paddingTop: 24 }}>
        <LoaderThin size={96} />
      </RowCenter>
    )
  }

  return (
    <>
      {userHaveValidAccount ? (
        <>
          {!vaultExists && token?.token && (
            <NoVault
              currency={currency}
              token={token}
              custodianStatus={custodianStatus}
              brokerDealerStatus={brokerDealerStatus}
              accreditationRequest={accreditationRequest}
              platform={platform}
              userHaveValidAccount={userHaveValidAccount}
              message={message}
            />
          )}
          {vaultExists && (
            <ExistingVault token={token} currency={newToken as any} custodian={accreditationRequest?.custodian} />
          )}
        </>
      ) : (
        <NoVault
          message={message}
          currency={currency}
          token={token}
          custodianStatus={custodianStatus}
          brokerDealerStatus={brokerDealerStatus}
          accreditationRequest={accreditationRequest}
          platform={platform}
          userHaveValidAccount={userHaveValidAccount}
        />
      )}
    </>
  )
}
