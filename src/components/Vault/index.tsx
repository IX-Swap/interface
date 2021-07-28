import { Currency } from '@ixswap1/sdk-core'
import React from 'react'
import { VaultState } from './enum'
import { ExistingVault } from './ExistingVault'
import { NotSubmitted } from './NotSubmitted'

interface Props {
  status: VaultState
  currency?: Currency
}
export const Vault = ({ status, currency }: Props) => {
  return (
    <>
      {status === VaultState.NOT_SUBMITTED && <NotSubmitted currency={currency} />}
      {status !== VaultState.NOT_SUBMITTED && <ExistingVault currency={currency} status={status} />}
    </>
  )
}
