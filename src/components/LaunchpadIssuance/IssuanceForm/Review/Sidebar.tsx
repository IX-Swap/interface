import React, { useMemo } from 'react'

import { Column } from 'components/LaunchpadMisc/styled'
import { InformationFormValues } from '../Information/types'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'

interface Props {
  offer: Partial<InformationFormValues>
  onSubmit: (isDraft: boolean) => void
  onClose: () => void
}

export const ReviewSidebar: React.FC<Props> = (props) => {
  const { status } = props.offer
  const canDraft = useMemo(
    () => status && [IssuanceStatus.draft, IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(status),
    [status]
  )
  return (
    <Column gap="0.25rem">
      <Column gap="0.5rem" margin="1rem 0">
        {canDraft && <OutlineButton onClick={() => props.onSubmit(true)}>Save Draft</OutlineButton>}
        <OutlineButton onClick={props.onClose}>Back to Form</OutlineButton>
        {status !== IssuanceStatus.approved && (
          <FilledButton onClick={() => props.onSubmit(false)}>Submit</FilledButton>
        )}
      </Column>
    </Column>
  )
}
