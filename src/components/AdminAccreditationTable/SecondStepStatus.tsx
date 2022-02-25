import { t, Trans } from '@lingui/macro'
import { ButtonEmpty, ButtonGray } from 'components/Button'
import Popover from 'components/Popover'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import React, { useContext, useState } from 'react'
import { useApproveAccreditation } from 'state/admin/hooks'
import styled, { css, ThemeContext } from 'styled-components'
import rejectedIcon from '../../assets/images/attention.svg'
import approvedIcon from '../../assets/images/check-success.svg'
import { ReactComponent as DropDownIcon } from '../../assets/images/dropdown.svg'
import pendingIcon from '../../assets/images/loader_thin.svg'
import { RejectModal } from './RejectModal'

interface Props {
  status: string
  id: number
}

export const SecondStepStatus = ({ status, id }: Props) => {
  const theme = useContext(ThemeContext)
  const approveAccreditation = useApproveAccreditation()

  const [isOpen, handleIsOpen] = useState(false)
  const [isModalOpen, handleIsModalOpen] = useState(false)

  const isRejected = status === 'declined'

  const toggle = () => handleIsOpen((state) => !state)
  const open = () => isRejected && handleIsOpen(true)
  const close = () => handleIsOpen(false)

  const openModal = () => handleIsModalOpen(true)
  const closeModal = () => handleIsModalOpen(false)

  const approve = async () => {
    try {
      await approveAccreditation(id)
      close()
    } catch (e) {}
  }

  const statusColors = {
    new: theme.text2,
    declined: theme.error,
    approved: theme.green1,
  } as Record<string, string>

  const getText = () => {
    switch (status) {
      case AccreditationStatusEnum.REJECTED:
        return t`Rejected`
      case AccreditationStatusEnum.APPROVED:
        return t`Approved`
      case AccreditationStatusEnum.FAILED:
        return t`Failed`
      case AccreditationStatusEnum.PENDING:
        return t`Pending`
      case AccreditationStatusEnum.PENDING_KYC:
        return t`Pending KYC`
      default:
        return t`Status`
    }
  }

  const getIcon = () => {
    switch (status) {
      case AccreditationStatusEnum.REJECTED:
      case AccreditationStatusEnum.FAILED:
        return rejectedIcon
      case AccreditationStatusEnum.APPROVED:
        return approvedIcon
      default:
        return pendingIcon
    }
  }
  if (status === AccreditationStatusEnum.PENDING_CUSTODIAN) {
    return (
      <>
        <RejectModal isModalOpen={isModalOpen} closeModal={closeModal} id={id} />
        <ButtonsContainer>
          <ApproveButton onClick={approve}>
            <Trans>Approve</Trans>
          </ApproveButton>
          <RejectButton onClick={openModal}>
            <Trans>Reject</Trans>
          </RejectButton>
        </ButtonsContainer>
      </>
    )
  }

  const popOverContent = () => (
    <PopOverContent>
      <ButtonEmpty onClick={approve} padding="0" data-testid="approve">
        <PopOverItem>
          <Trans>Approve</Trans>
        </PopOverItem>
      </ButtonEmpty>
      <ButtonEmpty onClick={toggle} padding="0" data-testid="reject" disabled>
        <PopOverItem>
          <Trans>Reject</Trans>
        </PopOverItem>
      </ButtonEmpty>
    </PopOverContent>
  )

  return (
    <Popover show={isOpen} content={popOverContent()} placement="bottom" close={close}>
      <Container style={{ cursor: isRejected ? 'pointer' : 'inherit' }} onClick={open}>
        <img src={getIcon()} alt="icon" width="20px" height="20px" />
        <StatusText color={statusColors[status] || theme.text2}>{getText()}</StatusText>
        {isRejected && <StyledDropDownIcon stroke={theme.error} />}
      </Container>
    </Popover>
  )
}

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const PopOverItem = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  font-size: 14px;
`

const StyledDropDownIcon = styled(DropDownIcon)`
  margin-left: 5px;
  > path {
    stroke: ${({ theme: { error } }) => error};
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 16px;
  }
`

const defaultBtnStyles = css`
  height: 32px;
  border-radius: 40px;
  width: auto;
  padding: 6px 25px;
  max-width: 162px;
  width: 100%;
  font-size: 14px;
`

export const ApproveButton = styled(ButtonGray)`
  ${defaultBtnStyles};
  color: ${({ theme: { green1 } }) => green1};
  background-color: rgba(55, 46, 94, 0.42);
`

const RejectButton = styled(ButtonGray)`
  ${defaultBtnStyles};
  color: ${({ theme: { error } }) => error};
  background-color: rgba(55, 46, 94, 0.42);
  &:hover,
  :focus {
    background-color: ${({ theme: { error } }) => `${error}20`};
  }
`

const StatusText = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > :first-child {
    margin-right: 9px;
  }
`
