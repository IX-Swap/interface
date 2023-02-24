import React, { useState } from 'react'
import { Issuance, OfferStatus } from 'state/launchpad/types'

import Column from 'components/Column'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Separator } from 'components/LaunchpadMisc/styled'
import { text1, text11, text19, text43, text60 } from 'components/LaunchpadMisc/typography'
import { RowBetween, RowCenter } from 'components/Row'
import { useGetOffer, useVetting } from 'state/launchpad/hooks'
import styled from 'styled-components'
import { DiscreteInternalLink } from 'theme'
import { filterNumberWithDecimals } from 'utils/input'
import { FormField } from '../IssuanceForm/shared/fields/FormField'
import { IssuanceStatus } from '../types'
import { Label } from '../utils/TextField'
import { MiniStatusBadge } from './MiniStatusBadge'
import { ConfirmPopup } from '../utils/ConfirmPopup'
import { useDeployOffer } from 'state/issuance/hooks'

export interface IsssuanceApplicationPopupProps {
  issuance: Issuance | null
  isOpen: boolean
  setOpen: any
}

const ButtonBlock = ({ label, link }: { label: string; link: string }) => {
  return (
    <CustomColumn>
      <FieldLabel>{label}</FieldLabel>
      <OutlineButton as={DiscreteInternalLink} to={link} width="250px" height="48px">
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
  const toggleDialog = React.useCallback(() => setOpen((state: boolean) => !state), [])
  const [issuanceFee, setIssuanceFee] = useState('0')
  const { data: offer } = useGetOffer(issuance?.vetting?.offer?.id)
  const { data: vetting } = useVetting(issuance?.id)
  const deploy = useDeployOffer(offer?.id)
  const [showConfirm, setShowConfirm] = useState(false)
  const getVettingLink = React.useCallback(
    (status?: IssuanceStatus) => {
      if (status === IssuanceStatus.approved) {
        return `/issuance/view/vetting?id=${issuance?.id}`
      }
      return `/issuance/create/vetting?id=${issuance?.id}`
    },
    [issuance?.id]
  )

  const getInformationLink = React.useCallback(
    (status?: OfferStatus) => {
      if (
        [
          OfferStatus.approved,
          OfferStatus.whitelist,
          OfferStatus.preSale,
          OfferStatus.sale,
          OfferStatus.claim,
          OfferStatus.closed,
        ].includes(status as OfferStatus)
      ) {
        return `/issuance/review/information?id=${issuance?.id}`
      }
      if (status === OfferStatus.pendingApproval) {
        return `/issuance/edit/information?id=${issuance?.id}`
      }
      return `/issuance/create/information?id=${issuance?.id}`
    },
    [issuance?.id]
  )

  if (issuance === null) {
    return null
  }

  return (
    <IssuanceDialog show={isOpen} title="Issuance Information" onClose={toggleDialog} width="600px">
      <PopupWrapper>
        <Column></Column>
        <Column>
          <Label>Issuer #{issuance.id}</Label>
          <IssuanceName>{issuance.name}</IssuanceName>
        </Column>
        <Separator />
        <RowBetween>
          <ButtonBlock label="Vetting" link={getVettingLink(vetting?.status)} />
          <StatusBlock label="Status" status={vetting?.status} />
        </RowBetween>
        <RowBetween>
          <ButtonBlock label="Issuance Information" link={getInformationLink(offer?.status)} />
          <StatusBlock label="Status" status={offer?.status} />
        </RowBetween>
        <Separator />
        <FeeRow>
          <Column style={{ gap: '25px', flex: '1 1' }}>
            <FieldLabel>Issuance Fee</FieldLabel>
            <FormField
              placeholder="5%"
              field="issuanceFee"
              setter={(field, value) => setIssuanceFee(value)}
              value={`${issuanceFee}%`}
              inputFilter={filterNumberWithDecimals}
            />
          </Column>
          <FilledButton style={{ alignSelf: 'flex-end', marginBottom: '10px' }}>Confirm</FilledButton>
        </FeeRow>
        <Separator />
        <FilledButton disabled={offer?.status !== OfferStatus.approved} onClick={() => setShowConfirm(true)}>
          Deploy
        </FilledButton>
        <RowCenter>
          <SubmitHint>Confirm that all steps has been done and start the issuance</SubmitHint>
        </RowCenter>
      </PopupWrapper>
      <ConfirmPopup
        isOpen={showConfirm}
        onAccept={() => {
          deploy(issuanceFee)
          setShowConfirm(false)
        }}
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
const FieldLabel = styled.span`
  ${text60}
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
