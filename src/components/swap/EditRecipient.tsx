import React from 'react'
import { Trans } from '@lingui/macro'
import AddressInputPanel from 'components/AddressInputPanel'
import { ButtonGradient } from 'components/Button'
import { AutoRow } from 'components/Row'

interface Props {
  recipient: string
  onChangeRecipient: (recipient: string | null) => void
}

export const EditRecipient = ({ recipient, onChangeRecipient }: Props) => {
  return (
    <>
      <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
        <ButtonGradient id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
          <Trans>Remove send</Trans>
        </ButtonGradient>
      </AutoRow>
      <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
    </>
  )
}
