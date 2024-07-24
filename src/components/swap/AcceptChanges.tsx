import { Trans } from '@lingui/macro'
import React from 'react'
import { AlertTriangle } from 'react-feather'
import { ButtonGradient } from '../../components/Button'
import { RowBetween, RowFixed } from '../../components/Row'
import { SwapShowAcceptChanges } from './styleds'

export const AcceptChanges = ({ handleAcceptChanges }: { handleAcceptChanges: () => void }) => {
  return (
    <SwapShowAcceptChanges justify="flex-start" gap={'0px'}>
      <RowBetween>
        <RowFixed>
          <AlertTriangle size={24} style={{ marginRight: '8px', minWidth: 24 }} />

          <Trans>Price Updated</Trans>
        </RowFixed>
        <ButtonGradient
          data-testid="accept-swap-changes"
          style={{
            padding: '.5rem',
            width: 'fit-content',
            fontSize: '0.825rem',
            borderRadius: '12px',
            background: '#FF9F43',
            color: '#fff',
          }}
          onClick={handleAcceptChanges}
        >
          <Trans>Accept</Trans>
        </ButtonGradient>
      </RowBetween>
    </SwapShowAcceptChanges>
  )
}
