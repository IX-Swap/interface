import { Currency } from '@ixswap1/sdk-core'
import React from 'react'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { ExistingVault } from './ExistingVault'
import { NoVault } from './NoVault'
import { AccreditationStatusEnum } from './enum'

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

  return (
    <>
      {!vaultExists && token?.token && (
        <NoVault
          currency={currency}
          token={token}
          status={status}
          accreditationRequest={accreditationRequest}
          platform={platform}
        />
      )}
      {vaultExists && (
        <ExistingVault token={token} currency={newToken as any} custodian={accreditationRequest?.custodian} />
      )}
    </>
  )
}
