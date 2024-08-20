import React from 'react'
import styled from 'styled-components'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import closeIcon from 'assets/images/newCross.svg'
import { ReactComponent as ClaimIcon } from 'assets/images/claimNew.svg'
import { ReactComponent as AirdropIcon } from 'assets/images/airdrop.svg'
import { useHistory } from 'react-router-dom'
import { routes } from 'utils/routes'

interface Props {
  isModalOpen: boolean
  closeModal: () => void
}

export const CreatePayoutModal = ({ isModalOpen, closeModal }: Props) => {
  const history = useHistory()

  const goToCreate = () => {
    history.push(routes.createPayoutEvent)
  }
  return (
    <RedesignedWideModal isOpen={isModalOpen} onDismiss={closeModal}>
      <ModalContainer>
        <ModalContent style={{ position: 'relative', width: '600px', paddingBottom: '20px' }}>
          <ModalHeader>Choose Mode</ModalHeader>
          <HeaderTitle>Create Payout Events</HeaderTitle>
          <CloseIcon src={closeIcon} alt={closeIcon} width="18px" height="18px" onClick={closeModal} />
          <Container style={{ cursor: 'pointer' }}>
            <Box onClick={goToCreate}>
              <StyledClaimIcon />
              <BoxTitle>Claim</BoxTitle>
              <BoxSubtitle>Users need to manually claim payout</BoxSubtitle>
            </Box>
            <Box>
              <StyledAirdropIcon />
              <BoxTitle>Airdrop</BoxTitle>
              <BoxSubtitle>
                Send tokens directly <br /> to users
              </BoxSubtitle>
            </Box>
          </Container>
        </ModalContent>
      </ModalContainer>
    </RedesignedWideModal>
  )
}

const StyledClaimIcon = styled(ClaimIcon)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledAirdropIcon = styled(AirdropIcon)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CloseIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 0px;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  place-content: center;
`

const Box = styled.div`
  border: 1px solid #6666ff33;
  width: 272px;
  height: 261px;
  border-radius: 6px;
  text-align: center;
  position: relative;
`

const BoxTitle = styled.span`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 500;
`
const BoxSubtitle = styled.span`
  position: absolute;
  top: 77%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 500;
  color: #8f8fb2;
  width: 190px;
`

const ModalContainer = styled.div`
  background: white;
  padding: 35px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 20px;
    border-radius: 12px;
    margin: 0 auto;
  }
`

const ModalContent = styled.div`
  width: 450px;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    background: white;
  }
`

const ModalHeader = styled.div`
  color: #8f8fb2;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
`

const HeaderTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`
