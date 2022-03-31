import { Currency } from '@ixswap1/sdk-core'
import React, { useMemo } from 'react'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { ExistingVault } from './ExistingVault'
import { NoVault } from './NoVault'
import { AccreditationStatusEnum } from './enum'
import { useKYCState } from 'state/kyc/hooks'
import { KYC_STATUSES } from 'components/AdminKyc/StatusCell'

interface Props {
  currency?: Currency
  token: any
}
export const Vault = ({ currency, token }: Props) => {
  const {
    status,
    isApproved: vaultExists,
    accreditationRequest,
    platform,
  } = useAccreditationStatus((currency as any)?.address || 0)
  const newToken = { ...currency, isToken: true }
  const { kyc } = useKYCState()

  const getUserAccountType = () => {
    const kycType = kyc?.data?.individualKycId ? 'individual' : 'corporate'

    const userKyc = kyc?.data?.individual || kyc?.data?.corporate || {}

    if (userKyc.accredited) {
      return `${kycType}Accredited`
    }
    return `${kycType}AccreditedNot`
  }

  const userHaveValidAccount = useMemo(() => {
    const { kycType } = token
    if (!kycType || !kyc || ![KYC_STATUSES.APPROVED, KYC_STATUSES.REJECTED].includes(kyc?.data?.status)) return true

    const userAccountType = getUserAccountType()

    const availableTypes = Object.keys(kycType).reduce(
      (acc: string[], key: string) => (key.includes('Accredited') && kycType[key] ? [...acc, key] : acc),
      []
    )

    if (availableTypes.includes(userAccountType)) return true

    return kycType[userAccountType]
  }, [kyc, token])

  return (
    <>
      {userHaveValidAccount ? (
        <>
          {!vaultExists && token?.token && (
            <NoVault
              currency={currency}
              token={token}
              status={status}
              accreditationRequest={accreditationRequest}
              platform={platform}
              userHaveValidAccount={userHaveValidAccount}
            />
          )}
          {vaultExists && (
            <ExistingVault token={token} currency={newToken as any} custodian={accreditationRequest?.custodian} />
          )}
        </>
      ) : (
        <NoVault
          currency={currency}
          token={token}
          status={status}
          accreditationRequest={accreditationRequest}
          platform={platform}
          userHaveValidAccount={userHaveValidAccount}
        />
      )}
    </>
  )
}
