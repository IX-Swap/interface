import React, { useMemo } from 'react'

import { Column } from 'components/LaunchpadMisc/styled'
import { InformationFormValues } from '../Information/types'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'

interface Props {
  offer: Partial<InformationFormValues>
  onSubmit: (isDraft: boolean) => void
  onClose: () => void
  draftDisabled: boolean
  submitDisabled: boolean
}

export const ReviewSidebar: React.FC<Props> = (props) => {
  const { status } = props.offer
  const canDraft = useMemo(
    () => status && [IssuanceStatus.draft, IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(status),
    [status]
  )
  const backText = useMemo(() => (status === IssuanceStatus.approved ? 'Back' : 'Back to Form'), [status])

  return (
    <Column gap="0.25rem">
      <Column gap="0.5rem" margin="1rem 0">
        {canDraft && (
          <OutlineButton disabled={props.draftDisabled} onClick={() => props.onSubmit(true)}>
            Save Draft
          </OutlineButton>
        )}
        <OutlineButton onClick={props.onClose}>{backText}</OutlineButton>
        {status !== IssuanceStatus.approved && (
          <FilledButton disabled={props.submitDisabled} onClick={() => props.onSubmit(false)}>
            Submit
          </FilledButton>
        )}
      </Column>
    </Column>
  )
}
