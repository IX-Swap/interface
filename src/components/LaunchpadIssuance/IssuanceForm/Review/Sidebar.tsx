import React, { useMemo } from 'react'

import { Column } from 'components/LaunchpadMisc/styled'
import { InformationFormValues } from '../Information/types'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'
import { useRole } from 'state/user/hooks'

interface Props {
  offer: Partial<InformationFormValues>
  onSubmit: (isDraft: boolean) => void
  onClose: () => void
  draftDisabled: boolean
  submitDisabled: boolean
}

export const ReviewSidebar: React.FC<Props> = (props) => {
  const { isAdmin } = useRole()
  const { status } = props.offer

  const { canDraft, canSubmit } = useMemo(
    () => ({
      canDraft: status
        ? [IssuanceStatus.draft, IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(status)
        : false,
      canSubmit: status
        ? isAdmin
          ? status !== IssuanceStatus.approved
          : ![IssuanceStatus.approved, IssuanceStatus.pendingApproval].includes(status)
        : false,
    }),
    [status, isAdmin]
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
        {canSubmit && (
          <FilledButton disabled={props.submitDisabled} onClick={() => props.onSubmit(false)}>
            Submit
          </FilledButton>
        )}
      </Column>
    </Column>
  )
}
