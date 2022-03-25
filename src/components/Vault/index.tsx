import { Currency } from '@ixswap1/sdk-core'
import React, { useMemo } from 'react'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { ExistingVault } from './ExistingVault'
import { NoVault } from './NoVault'
import { AccreditationStatusEnum } from './enum'
import { useKYCState } from 'state/kyc/hooks'

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

  const getUserKycType = () => {
    const kycType = kyc?.data?.individualKycId ? 'individual' : 'corporate'

    if (kyc && kyc.data.status === 'approved') {
      return `${kycType}Accredited`
    }
    return `${kycType}AccreditedNot`
  }

  const userHaveValidKyc = useMemo(() => {
    const { kycType } = token
    const data = kycType || {}
    const userKycType = getUserKycType()

    if (!kycType) return true

    if (!userKycType.includes('Not')) return true

    return data[userKycType]
  }, [kyc, token])

  return (
    <>
      {userHaveValidKyc ? (
        <>
          {!vaultExists && token?.token && (
            <NoVault
              currency={currency}
              token={token}
              status={status}
              accreditationRequest={accreditationRequest}
              platform={platform}
              userHaveValidKyc
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
          userHaveValidKyc={false}
        />
      )}
    </>
  )
}
