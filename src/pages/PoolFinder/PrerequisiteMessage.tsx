import React from 'react'
import { Trans } from '@lingui/macro'
import { LightMessage } from './LightMessage'

export const PrerequisiteMessage = ({ account }: { account?: string | null }) => {
  return (
    <LightMessage>
      {!account ? (
        <Trans>Connect to a wallet to find pools</Trans>
      ) : (
        <Trans>Choose token to find your liquidity.</Trans>
      )}
    </LightMessage>
  )
}
