import React from 'react'

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
  return (
    <Column gap="0.25rem">
      <Column gap="0.5rem" margin="1rem 0">
        {props.offer.status !== IssuanceStatus.approved && (
          <OutlineButton onClick={() => props.onSubmit(true)}>Save Draft</OutlineButton>
        )}
        <OutlineButton onClick={props.onClose}>Back to Form</OutlineButton>
        {props.offer.status !== IssuanceStatus.approved && (
          <FilledButton onClick={() => props.onSubmit(false)}>Submit</FilledButton>
        )}
      </Column>
    </Column>
  )
}
