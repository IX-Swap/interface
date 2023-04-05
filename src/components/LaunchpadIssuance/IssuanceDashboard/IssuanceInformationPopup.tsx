import React, { useEffect, useMemo, useState } from 'react'
import { Issuance, OfferStatus } from 'state/launchpad/types'

import Column from 'components/Column'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { ErrorText, LoaderContainer, Separator } from 'components/LaunchpadMisc/styled'
import { text1, text11, text19, text43, text60 } from 'components/LaunchpadMisc/typography'
import { RowBetween, RowCenter } from 'components/Row'
import { useGetOffer } from 'state/launchpad/hooks'
import styled from 'styled-components'
import { DiscreteInternalLink } from 'theme'
import { filterNumberWithDecimals } from 'utils/input'
import { FormField } from '../IssuanceForm/shared/fields/FormField'
import { IssuanceStatus } from '../types'
import { Label } from '../utils/TextField'
import { MiniStatusBadge } from './MiniStatusBadge'
import { ConfirmPopup } from '../utils/ConfirmPopup'
import { useConfirmFee, useDeployOffer } from 'state/issuance/hooks'
import { useShowError, useShowSuccess } from 'state/application/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'

export interface IsssuanceApplicationPopupProps {
  issuance: Issuance | null
  isOpen: boolean
  setOpen: any
}

const ButtonBlock = ({ label, link, disabled = false }: { label: string; link: string; disabled?: boolean }) => {
  return (
    <CustomColumn>
      <FieldLabel disabled={disabled}>{label}</FieldLabel>
      <OutlineButton
        onClick={(event: any) => {
          if (disabled) {
            event.preventDefault()
          }
        }}
        disabled={disabled}
        as={DiscreteInternalLink}
        to={link}
        width="250px"
        height="48px"
      >
        <ButtonText>Open Application</ButtonText>
      </OutlineButton>
    </CustomColumn>
  )
}

const StatusBlock = ({ label, status }: { label: string; status?: IssuanceStatus | OfferStatus }) => {
  return (
    <CustomColumn>
      <StatusLabel>{label}</StatusLabel>
      <MiniStatusBadge status={status}></MiniStatusBadge>
    </CustomColumn>
  )
}

export const IssuanceApplicationPopup = ({ issuance, isOpen, setOpen }: IsssuanceApplicationPopupProps) => {
  const { data: offer, loading: offerLoading, load: loadOffer } = useGetOffer(issuance?.vetting?.offer?.id)

  const showError = useShowError()
  const showSuccess = useShowSuccess()

  const deploy = useDeployOffer(offer?.id)
  const confirmFee = useConfirmFee(offer?.id)

  const [issuanceFee, setIssuanceFee] = useState<number | undefined>()
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const vettingStatus = useMemo(() => issuance?.vetting?.status, [issuance])
  const offerStatus = useMemo(() => issuance?.vetting?.offer?.status as any, [issuance])

  const feeDisabled = useMemo(() => {
    if (!offerStatus || offerLoading) return true
    return ![OfferStatus.draft, OfferStatus.changesRequested, OfferStatus.declined, OfferStatus.approved].includes(
      offerStatus
    )
  }, [offerStatus, offerLoading])

  const issuanceError = useMemo(() => {
    if (feeDisabled) {
      return ''
    } else if (issuanceFee === undefined) {
      return 'Fee is required!'
    } else if (issuanceFee === 0) {
      return 'Fee cannot be 0!'
    } else if (issuanceFee >= 100) {
      return 'Fee should be less than 100%!'
    }
    return ''
  }, [feeDisabled, issuanceFee])
  const confirmFeeDisabled = useMemo(() => {
    return Boolean(issuanceError) || feeDisabled || !issuanceFee || isLoading || Number(offer?.feeRate) === issuanceFee
  }, [issuanceError, feeDisabled, offer, issuanceFee, isLoading])

  const vettingLink = useMemo(() => {
    if (
      vettingStatus &&
      [IssuanceStatus.draft, IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(vettingStatus)
    ) {
      return `/issuance/create/vetting?id=${issuance?.id}`
    }
    return `/issuance/view/vetting?id=${issuance?.id}`
  }, [issuance?.id, vettingStatus])

  const informationLink = useMemo(() => {
    if (
      !offerStatus ||
      [
        OfferStatus.approved,
        OfferStatus.whitelist,
        OfferStatus.preSale,
        OfferStatus.sale,
        OfferStatus.claim,
        OfferStatus.closed,
      ].includes(offerStatus)
    ) {
      return `/issuance/review/information?id=${issuance?.id}`
    }
    if (offerStatus === OfferStatus.pendingApproval) {
      return `/issuance/edit/information?id=${issuance?.id}`
    }
    return `/issuance/create/information?id=${issuance?.id}`
  }, [issuance?.id, offerStatus])

  const onSubmit = async () => {
    setShowConfirm(false)
    setIsLoading(true)
    try {
      await deploy(issuanceFee)
      showSuccess(`Offer #${offer?.id} - ${offer?.title} deployed successfully`)
    } catch (e: any) {
      showError(e?.message ?? '')
    }
    loadOffer()
    setIsLoading(false)
  }

  const submitFee = async () => {
    setIsLoading(true)
    try {
      await confirmFee(issuanceFee)
      showSuccess('Fee changed successfully')
    } catch (e: any) {
      showError(e?.message ?? '')
    }
    loadOffer()
    setIsLoading(false)
  }

  useEffect(() => {
    if (offer) {
      setIssuanceFee(offer.feeRate === null ? undefined : Number(offer.feeRate))
    }
  }, [offer])

  if (issuance === null) {
    return null
  }
  if (isLoading) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <Loader />
      </LoaderContainer>
    )
  }

  return (
    <IssuanceDialog show={isOpen} title="Issuance Information" onClose={() => setOpen(false)} width="600px">
      <PopupWrapper>
        <Column></Column>
        <Column>
          <Label>Issuer #{issuance.id}</Label>
          <IssuanceName>{issuance.name}</IssuanceName>
        </Column>
        <Separator />
        {vettingStatus && (
          <RowBetween>
            <ButtonBlock label="Vetting" link={vettingLink} />
            <StatusBlock label="Status" status={vettingStatus} />
          </RowBetween>
        )}
        {offerStatus && (
          <RowBetween>
            <ButtonBlock
              label="Issuance Information"
              link={informationLink}
              disabled={vettingStatus !== IssuanceStatus.approved}
            />
            <StatusBlock label="Status" status={offerStatus} />
          </RowBetween>
        )}
        <Separator />
        <Column>
          <FeeRow>
            <Column style={{ gap: '25px', flex: '1 1' }}>
              <FieldLabel>Issuance Fee</FieldLabel>
              <FormField
                placeholder="5%"
                field="issuanceFee"
                setter={(field, value) => setIssuanceFee(value === '' ? undefined : Number(value))}
                value={`${issuanceFee === undefined ? '' : issuanceFee}`}
                inputFilter={filterNumberWithDecimals}
                disabled={feeDisabled}
              />
            </Column>
            <FilledButton
              disabled={confirmFeeDisabled}
              style={{ alignSelf: 'flex-end', marginBottom: '10px' }}
              onClick={submitFee}
            >
              Confirm
            </FilledButton>
          </FeeRow>
          {issuanceError && <ErrorText>{issuanceError}</ErrorText>}
        </Column>
        <Separator />
        <FilledButton
          disabled={offer?.status !== OfferStatus.approved || Boolean(issuanceError)}
          onClick={() => setShowConfirm(true)}
        >
          Deploy
        </FilledButton>
        <RowCenter>
          <SubmitHint>Confirm that all steps has been done and start the issuance</SubmitHint>
        </RowCenter>
      </PopupWrapper>
      <ConfirmPopup
        isOpen={showConfirm}
        onAccept={onSubmit}
        onDecline={() => setShowConfirm(false)}
        title="Are you sure you want to deploy this offer?"
      />
    </IssuanceDialog>
  )
}

const IssuanceName = styled.span`
  ${text43}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const FieldLabel = styled.span<{ disabled?: boolean }>`
  ${text60}
  opacity: ${(props) => (props.disabled === true ? 0.5 : 1)};
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const StatusLabel = styled.span`
  ${text19}
  color: ${(props) => props.theme.launchpad.colors.text.hint};
`
const SubmitHint = styled.span`
  ${text11}
  color: ${(props) => props.theme.launchpad.colors.text.hint};
`
const CustomColumn = styled(Column)`
  gap: 17px;
`
const PopupWrapper = styled(Column)`
  gap: 30px;
`
const ButtonText = styled.span`
  ${text1}
`
const FeeRow = styled(RowBetween)`
  align-items: center;
  gap: 17px;
`
