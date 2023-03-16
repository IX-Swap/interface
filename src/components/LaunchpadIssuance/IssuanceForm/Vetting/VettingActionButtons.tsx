import React, { useState } from 'react'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { FormSubmitContainer } from '../shared/styled'
import { useRole } from 'state/user/hooks'
import { AdminButtons } from 'components/LaunchpadMisc/AdminButtons'
import { ConfirmPopup } from 'components/LaunchpadIssuance/utils/ConfirmPopup'
import { RequestChangesPopup } from '../../utils/RequestChangesPopup'
import { useReviewVetting } from 'state/issuance/hooks'
import { useShowError, useShowSuccess } from 'state/application/hooks'
import Column from 'components/Column'

export interface VettingActionButtonsProps {
  onSaveDraft: () => void
  onSubmit: () => void
  disabled: boolean
  submitDisabled: boolean
  vettingId: string
}
export const VettingActionButtons = ({
  onSaveDraft,
  onSubmit,
  disabled,
  submitDisabled,
  vettingId,
}: VettingActionButtonsProps) => {
  const { isOfferManager, isAdmin } = useRole()
  const [showApprove, setShowApprove] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showReject, setShowReject] = useState(false)
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false)
  const [showConfirmReject, setShowConfirmReject] = useState(false)
  const { approve, reject, requestChanges } = useReviewVetting(vettingId)
  const [reasonRequested, setReasonRequested] = useState('')
  const [reasonRejected, setReasonRejected] = useState('')
  const [changesRequested, setChangesRequested] = useState('')
  const [changesRejected, setChangesRejected] = useState('')
  const showError = useShowError()
  const showSuccess = useShowSuccess()
  const onApprove = async () => {
    try {
      await approve()
      showSuccess('Vetting approved successfully')
      setShowApprove(false)
      window.location.reload()
    } catch (e: any) {
      showError(e?.message)
    }
  }
  const onReject = async () => {
    try {
      await reject({ reasonRequested: reasonRejected, changesRequested: changesRejected })
      showSuccess('Vetting rejected successfully')
      setShowConfirmReject(false)
      setShowReject(false)
      window.location.reload()
    } catch (e: any) {
      showError(e?.message)
    }
  }
  const onRequestChanges = async () => {
    try {
      await requestChanges({ reasonRequested, changesRequested })
      showSuccess('Requested changes for vetting successfully')
      setShowConfirmUpdate(false)
      setShowUpdate(false)
      window.location.reload()
    } catch (e: any) {
      showError(e?.message)
    }
  }
  return (
    <Column style={{ gap: '1rem' }}>
      <ConfirmPopup
        isOpen={showApprove}
        onAccept={onApprove}
        onDecline={() => setShowApprove(false)}
        subtitle="Would you like to Approve this submission?"
        showIcon={true}
        acceptText="Yes, Approve"
        declineText="Cancel"
        type="success"
      />
      <ConfirmPopup
        isOpen={showConfirmReject}
        onAccept={onReject}
        onDecline={() => setShowConfirmReject(false)}
        subtitle="Would you like to Reject this submission?"
        showIcon={true}
        acceptText="Yes, Reject"
        declineText="Cancel"
        type="error"
      />
      <ConfirmPopup
        isOpen={showConfirmUpdate}
        onAccept={onRequestChanges}
        onDecline={() => setShowConfirmUpdate(false)}
        subtitle="Would you like to send the update requirements to the issuer?"
        showIcon={true}
        acceptText="Yes"
        declineText="Cancel"
        type="success"
      />
      <RequestChangesPopup
        isOpen={showUpdate}
        onAccept={() => setShowConfirmUpdate(true)}
        onDecline={() => setShowUpdate(false)}
        title="Update Reason"
        acceptText="Submit"
        declineText="Cancel"
        message={changesRequested}
        reason={reasonRequested}
        setMessage={setChangesRequested}
        setReason={setReasonRequested}
      />
      <RequestChangesPopup
        isOpen={showReject}
        onAccept={() => setShowConfirmReject(true)}
        onDecline={() => setShowReject(false)}
        title="Rejection Reason"
        acceptText="Submit"
        declineText="Cancel"
        message={changesRejected}
        reason={reasonRejected}
        setMessage={setChangesRejected}
        setReason={setReasonRejected}
      />
      {(isOfferManager || isAdmin) && (
        <FormSubmitContainer>
          <>
            <OutlineButton disabled={disabled} onClick={onSaveDraft}>
              Save Draft
            </OutlineButton>

            <FilledButton disabled={submitDisabled} onClick={onSubmit}>
              Submit
            </FilledButton>
          </>
        </FormSubmitContainer>
      )}
      {isAdmin && (
        <FormSubmitContainer>
          <AdminButtons
            disabled={disabled}
            onApprove={() => setShowApprove(true)}
            onUpdate={() => setShowUpdate(true)}
            onReject={() => setShowReject(true)}
          />
        </FormSubmitContainer>
      )}
    </Column>
  )
}
