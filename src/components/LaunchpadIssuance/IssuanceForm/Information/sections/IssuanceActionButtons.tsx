import React, { useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import { Check } from 'react-feather'

import Column from 'components/Column'
import { ConfirmPopup } from 'components/LaunchpadIssuance/utils/ConfirmPopup'
import { AdminButtons } from 'components/LaunchpadMisc/AdminButtons'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useShowError, useShowSuccess } from 'state/application/hooks'
import { useReviewOffer } from 'state/issuance/hooks'
import { useRole } from 'state/user/hooks'
import { FormSubmitContainer } from '../../shared/styled'
import { RequestChangesPopup } from '../../../utils/RequestChangesPopup'
import { OfferStatus } from 'state/launchpad/types'
import { LoaderContainer } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'

interface IssuanceButtonsProps {
  onSaveDraft: () => void
  showDraft: boolean
  onReview: () => void
  onSubmit: () => void
  submitDisabled: boolean
  draftDisabled: boolean
  offerId?: string
  status: OfferStatus
  isReset: boolean
  refetch?: () => void
}

export const IssuanceActionButtons = ({
  onSaveDraft,
  showDraft,
  onReview,
  onSubmit,
  submitDisabled,
  draftDisabled,
  status,
  offerId,
  isReset,
  refetch,
}: IssuanceButtonsProps) => {
  const theme = useTheme()
  const { isAdmin, isMasterTenant } = useRole()
  const isAdministrator = isAdmin || isMasterTenant;

  const showError = useShowError()
  const { approve, reject, requestChanges } = useReviewOffer(offerId)
  const showSuccess = useShowSuccess()

  const [showApprove, setShowApprove] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showReject, setShowReject] = useState(false)
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false)
  const [showConfirmReject, setShowConfirmReject] = useState(false)
  const [reasonRequested, setReasonRequested] = useState('')
  const [reasonRejected, setReasonRejected] = useState('')
  const [changesRequested, setChangesRequested] = useState('')
  const [changesRejected, setChangesRejected] = useState('')
  const [loading, setLoading] = useState(false)

  const onApprove = async () => {
    try {
      setLoading(true)
      await approve()
      await refetch?.()
      showSuccess('Offer approved successfully')
      setShowApprove(false)
    } catch (e: any) {
      showError(e?.message)
    } finally {
      setLoading(false)
    }
  }
  const onReject = async () => {
    try {
      setLoading(true)
      await reject({ reasonRequested: reasonRejected, changesRequested: changesRejected })
      await refetch?.()
      showSuccess('Offer rejected successfully')
      setShowConfirmReject(false)
      setShowReject(false)
    } catch (e: any) {
      showError(e?.message)
    } finally {
      setLoading(false)
    }
  }
  const onRequestChanges = async () => {
    try {
      setLoading(true)
      await requestChanges({ reasonRequested, changesRequested })
      await refetch?.()
      showSuccess('Requested changes for offer successfully')
      setShowConfirmUpdate(false)
      setShowUpdate(false)
    } catch (e: any) {
      showError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  const { isApproved, isRejected, showReviewButtons, showReviewButton } = useMemo(
    () => ({
      isApproved: status === OfferStatus.approved,
      isRejected: status === OfferStatus.declined,
      showReviewButtons: ![
        OfferStatus.approved,
        OfferStatus.whitelist,
        OfferStatus.preSale,
        OfferStatus.sale,
        OfferStatus.closed,
        OfferStatus.claim,
      ].includes(status),
      showReviewButton: status !== undefined && status !== OfferStatus.draft,
    }),
    [status]
  )

  return (
    <Column style={{ gap: '1rem' }}>
      {loading && (
        <LoaderContainer width="100vw" height="100vh">
          <Loader />
        </LoaderContainer>
      )}
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
      {(!isApproved || isAdministrator) && (
        <FormSubmitContainer>
          {showDraft && (
            <OutlineButton style={{ border: '1px solid #6666FF33' }} disabled={draftDisabled} onClick={onSaveDraft}>
              Save Draft
            </OutlineButton>
          )}

          {showReviewButton && <OutlineButton onClick={onReview}>Review</OutlineButton>}
          {(!isRejected || isReset) && (
            <FilledButton disabled={submitDisabled} onClick={onSubmit}>
              Submit
            </FilledButton>
          )}
        </FormSubmitContainer>
      )}
      {isAdministrator && showReviewButtons  ? (
        <FormSubmitContainer>
          <AdminButtons
            disabled={!offerId}
            onApprove={() => setShowApprove(true)}
            onUpdate={() => setShowUpdate(true)}
            onReject={() => setShowReject(true)}
          />
        </FormSubmitContainer>
      ) : null}
      {isAdministrator && !showReviewButtons && (
        <FormSubmitContainer>
          <FilledButton onClick={() => null} background={theme.launchpad.colors.success} style={{ cursor: 'default' }}>
            Approved
            <Check color={theme.launchpad.colors.background} size="19" strokeWidth={2} />
          </FilledButton>
        </FormSubmitContainer>
      )}
    </Column>
  )
}
