import { Currency } from '@ixswap1/sdk-core'
import React from 'react'
import { VaultState, IAccreditationRequest } from './enum'
import { ExistingVault } from './ExistingVault'
import { NotSubmitted } from './NotSubmitted'

interface Props {
  status: VaultState
  currency?: Currency
  accreditationRequest: IAccreditationRequest
}
export const Vault = ({ status, currency, accreditationRequest }: Props) => {
  return (
    <>
      {status === VaultState.NOT_SUBMITTED && <NotSubmitted currency={currency} />}
      {status !== VaultState.NOT_SUBMITTED && (
        <ExistingVault currency={currency} status={status} accreditationRequest={accreditationRequest} />
      )}
    </>
  )
}
