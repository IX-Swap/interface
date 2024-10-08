import React, { useState } from 'react'
import styled from 'styled-components'

import { AccreditationStatusEnum } from 'components/Vault/enum'
import { useApproveAccreditation } from 'state/admin/hooks'
import { EllipsisText } from 'theme'
import { ReactComponent as CrossIcon } from 'assets/images/RejectOutline.svg'
import { ReactComponent as CheckIcon } from 'assets/images/CheckOutline.svg'

import { RejectModal } from './RejectModal'
import { getStatusIcon } from './utils'
import { MoreActions } from './MoreActions'
import { LoaderThin } from 'components/Loader/LoaderThin'

interface Props {
  status: string
  id: number
  custodian: string
  searchValue: string
}

export const CustodianStatus = ({ status, id, custodian, searchValue }: Props) => {
  const approveAccreditation = useApproveAccreditation()

  const [isModalOpen, handleIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const openModal = () => handleIsModalOpen(true)
  const closeModal = () => handleIsModalOpen(false)

  const approve = async () => {
    try {
      setLoading(true)
      await approveAccreditation(id, searchValue)
    } catch (e) {
      console.log('Error approving accreditation', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <div>
        {status === AccreditationStatusEnum.PENDING && (
          <>
            <RejectModal searchValue={searchValue} isModalOpen={isModalOpen} closeModal={closeModal} id={id} />
            <ButtonsContainer>
              {loading ? (
                <LoaderThin size={20} />
              ) : (
                <>
                  <ActionButton>
                    <CheckIcon onClick={approve} />
                  </ActionButton>

                  <ActionButton>
                    <CrossIcon onClick={openModal} />
                  </ActionButton>
                </>
              )}
            </ButtonsContainer>
          </>
        )}
      </div>
      <div>
        {status !== AccreditationStatusEnum.PENDING && (
          <img src={getStatusIcon(status)} alt="icon" width="20px" height="20px" />
        )}
        <EllipsisText style={{ fontSize: '12px' }}>{custodian}</EllipsisText>
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

  > div:first-child {
    display: flex;
    align-items: center;
    column-gap: 10px; /* Adjust the gap as needed */
    flex-grow: 1; /* Allow this div to grow and take up remaining space */
  }
  > div:last-child {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`

const ActionButton = styled.div`
  cursor: pointer;
`
