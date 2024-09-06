import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import React from 'react'
import { Copy } from 'react-feather'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Flex } from 'rebass'
import { setGlobalState } from 'state/global'
import styled from 'styled-components'
import { CloseIcon, ModalBlurWrapper } from 'theme'
import { routes } from 'utils/routes'

interface CloneModalProps {
  tenant: any
  isOpen: boolean
  onClose: () => void
}

const CloneModal: React.FC<CloneModalProps> = ({ tenant, isOpen, onClose }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClone = async () => {
    const payload = { ...tenant }
    payload.title = `${tenant.title} (Clone)`
    delete payload.id
    delete payload.domain
    delete payload.createdAt
    delete payload.updatedAt
    dispatch(setGlobalState({ selectedTenant: payload }))
    history.push(routes.tenantClone)
  }
  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={close}>
      <ModalBlurWrapper>
        <Flex justifyContent="flex-end">
          <CloseIcon onClick={onClose} />
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <CopyIcon>
            <div>
              <Copy size={18} color="#6666FF" />
            </div>
          </CopyIcon>

          <Title>Are you sure you want to clone this tenant?</Title>

          <Flex justifyContent="center" alignItems="center" style={{ gap: 12 }} mt={30} mb={18}>
            <CancelButton onClick={onClose}>No</CancelButton>
            <ConfirmButton onClick={handleClone}>Yes</ConfirmButton>
          </Flex>
        </Flex>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

export default CloneModal

const CopyIcon = styled.div`
  border-radius: 50%;
  border: solid 1px rgba(230, 230, 255, 0.7);
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 8px;

  div {
    background: rgba(102, 102, 255, 0.1);
    border-radius: 50%;
    border: solid 2px rgba(102, 102, 255, 0.5);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Title = styled.h1`
  color: #292933;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: -0.54px;
  max-width: 200px;
`

const CancelButton = styled.button`
  border-radius: 6px;
  border: 1px solid rgba(102, 102, 255, 0.2);
  background: #fff;
  display: flex;
  width: 153.872px;
  height: 48px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #66f;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.28px;
  outline: none;

  &:hover {
    background: #f9f9ff;
  }
`

const ConfirmButton = styled.button`
  display: flex;
  width: 153.87px;
  height: 48px;
  padding: 17px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #66f;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.28px;
  border: none;

  &:hover {
    background: #4d4dff;
  }

  &:disabled {
    background: #f9f9ff;
    color: #66f;
  }
`
