import { Currency } from '@ixswap1/sdk-core'
import React, { useMemo } from 'react'
import { VaultState, IAccreditationRequest, AccreditationStatusEnum } from './enum'
import { ExistingVault } from './ExistingVault'
import { NoVault } from './NoVault'

interface Props {
  currency?: Currency
  accreditationRequest: IAccreditationRequest | null
}
export const Vault = ({ currency, accreditationRequest }: Props) => {
  const status = accreditationRequest?.status
  const vaultExists = useMemo(() => {
    return ![AccreditationStatusEnum.PENDING, AccreditationStatusEnum.REJECTED, undefined].includes(status)
  }, [status])
  return (
    <>
      {!vaultExists && <NoVault currency={currency} status={status} />}
      {vaultExists && <ExistingVault currency={currency} />}
    </>
  )
}
