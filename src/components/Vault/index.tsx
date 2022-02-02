import { Currency } from '@ixswap1/sdk-core'
import React from 'react'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { ExistingVault } from './ExistingVault'
import { NoVault } from './NoVault'

interface Props {
  currency?: Currency
  currencyId: string
  token: any
}
export const Vault = ({ currency, currencyId, token }: Props) => {
  const { status, isApproved: vaultExists, accreditationRequest, platform } = useAccreditationStatus(currencyId)

  return (
    <>
      {!vaultExists && token?.token && (
        <NoVault
          currency={token.token}
          status={status}
          accreditationRequest={accreditationRequest}
          platform={platform}
        />
      )}
      {vaultExists && <ExistingVault currency={currency} custodian={accreditationRequest?.custodian} />}
    </>
  )
}
