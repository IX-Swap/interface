import React, { useState } from 'react'
import styled from 'styled-components'

import { AccreditationStatusEnum } from 'components/Vault/enum'
import { useApproveAccreditation } from 'state/admin/hooks'
import { EllipsisText } from 'theme'
import { ReactComponent as CheckIcon } from 'assets/images/check-2.svg'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'

import { RejectModal } from './RejectModal'
import { getStatusIcon } from './utils'
import { MoreActions } from './MoreActions'

interface Props {
  status: string
  id: number
  custodian: string
  searchValue: string
}

export const CustodianStatus = ({ status, id, custodian, searchValue }: Props) => {
  const approveAccreditation = useApproveAccreditation()

  const [isModalOpen, handleIsModalOpen] = useState(false)

  const openModal = () => handleIsModalOpen(true)
  const closeModal = () => handleIsModalOpen(false)

  const approve = async () => {
    try {
      await approveAccreditation(id, searchValue)
    } catch (e) {}
  }

  return (
    <Container>
      <div>
        {status !== AccreditationStatusEnum.PENDING && (
          <img src={getStatusIcon(status)} alt="icon" width="20px" height="20px" />
        )}
        <EllipsisText>{custodian}</EllipsisText>
      </div>
      <div>
        {status === AccreditationStatusEnum.PENDING && (
          <>
            <RejectModal searchValue={searchValue} isModalOpen={isModalOpen} closeModal={closeModal} id={id} />
            <ButtonsContainer>
              <ActionButton onClick={approve}>
                <StyledCheckIcon />
              </ActionButton>
              <ActionButton onClick={openModal}>
                <StyledCrossIcon />
              </ActionButton>
            </ButtonsContainer>
          </>
        )}
        <MoreActions id={id} searchValue={searchValue} />
      </div>
    </Container>
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

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  width: 100%;
  > div:first-child {
    display: flex;
    align-items: center;
    column-gap: 8px;
    overflow: hidden;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }
`

const ActionButton = styled.div`
  cursor: pointer;
  width: 40px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: { bg11 } }) => bg11};
  border-radius: 40px;
`

const StyledCheckIcon = styled(CheckIcon)`
  width: 8.5px;
  stroke: ${({ theme }) => theme.green1};
  > path {
    fill: ${({ theme }) => theme.green1};
  }
`

const StyledCrossIcon = styled(CrossIcon)`
  width: 6.5px;
  height: 6.5px;
  stroke: ${({ theme }) => theme.bg14};
  > path {
    fill: ${({ theme }) => theme.bg14};
  }
`
