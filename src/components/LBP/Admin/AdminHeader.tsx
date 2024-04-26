import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ColumnCenter } from 'components/Column'
import { ReactComponent as PlayButtonIcon } from '../../../assets/images/playButton.svg'
import { ReactComponent as MarketCapIcon } from '../../../assets/images/LBPPool.svg'
import { ReactComponent as EditLBP } from '../../../assets/images/editLBP.svg'
import { ReactComponent as PauseIcon } from '../../../assets/images/paused.svg'
import { ReactComponent as CloseStopIcon } from '../../../assets/images/closeRed.svg'
import { ReactComponent as CloseCheckIcon } from '../../../assets/images/closeGreen.svg'
import { ReactComponent as ComingSoon } from '../../../assets/images/ComingSoonNew.svg'
import ConfirmStatus from './Modals/ConfirmStatusModal'
import { useHistory } from 'react-router-dom'

interface MiddleSectionProps {
  lbpShareLogo: any
  lbpShareName?: string
  status: string
  lbpId: string
  updateStatus?: any
}

const Wrapper = styled.div`
  display: flex;
  margin: 40px 0px;
  justify-content: space-between;
`

const ImageSection = styled.div`
  display: flex;
  align-items: center;
`

const LogoIcon = styled.img`
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

const Description = styled(TYPE.description7)`
  position: absolute;
  left: 18.5%;
  color: #292933;
`

const TextSection = styled.div`
  display: flex;
  gap: 10px;
`

const StatusButton = styled(ColumnCenter)<{ status: string }>`
  border: 1px solid;
  inline-size: max-content;
  padding: 10px 20px 10px 20px;
  place-self: center;
  border-radius: 6px;
  display: ruby;
  text-align: center;
  cursor: ${({ status }) =>
    status === 'ended' || status === 'closed' || status === 'pending' ? 'default' : 'pointer'};
  position: relative;
  width: 120px;
  background: ${({ status }) => {
    switch (status) {
      case 'live':
        return '#fff6e5'
      case 'paused':
        return '#e8f8ea'
      case 'pending':
        return '#f0f0ff'
      case 'ended':
        return '#ffeff0'
      case 'closed':
        return '#e9f8f0'
      default:
        return '#ffffff'
    }
  }};
  border-color: ${({ status }) => {
    switch (status) {
      case 'live':
        return '#FFA80033'
      case 'paused':
        return '#1FBA6633'
      case 'pending':
        return '#6666FF33'
      case 'ended':
        return '#FF616133'
      case 'closed':
        return '#1FBA6633'
      default:
        return '#ffffff'
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'live':
        return '#FFA800'
      case 'paused':
        return '#1FBA66'
      case 'pending':
        return '#6666FF'
      case 'ended':
        return '#FF6161'
      case 'closed':
        return '#1FBA66'
      default:
        return '#000000'
    }
  }};
`

const PoolButton = styled(ColumnCenter)`
  border: 1px solid #e6e6ff;
  background: #fffffff;
  padding: 10px 20px 10px 40px;
  border-radius: 6px;
  display: ruby;
  text-align: center;
  cursor: pointer;
  position: relative;
  inline-size: max-content;
  align-self: center;
`

const AdminHeader: React.FC<MiddleSectionProps> = ({ lbpShareLogo, lbpShareName, status, lbpId, updateStatus }) => {
  const history = useHistory()
  const createLbp = useCallback((id: number) => history.push(`/lbp/edit?id=${id}`), [history])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    if (status === 'paused' || status === 'live' || status === 'closed') {
      setIsModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  let statusText: string
  let statusIcon: JSX.Element

  switch (status) {
    case 'paused':
      statusText = 'Start'
      statusIcon = <PlayButtonIcon style={{ position: 'absolute', left: '20%', top: '29%' }} />
      break
    case 'live':
      statusText = 'Pause'
      statusIcon = <PauseIcon style={{ position: 'absolute', left: '16%', top: '29%' }} />
      break
    case 'pending':
      statusText = 'Coming soon'
      statusIcon = <ComingSoon style={{ position: 'absolute', left: '1%', top: '29%' }} />
      break
    case 'ended':
      statusText = 'Close'
      statusIcon = <CloseStopIcon style={{ position: 'absolute', left: '20%', top: '37%' }} />
      break
    case 'closed':
      statusText = 'Closed'
      statusIcon = <CloseCheckIcon style={{ position: 'absolute', left: '15%', top: '37%' }} />
      break
    default:
      statusText = ''
      statusIcon = <span></span>
  }

  return (
    <Wrapper>
      <ConfirmStatus
        isOpen={isModalOpen}
        onClose={handleModalClose}
        currentStatus={status}
        statusText={statusText}
        lbpId={lbpId}
        updateStatus={updateStatus}
      />
      <ImageSection>
        <LogoIcon src={lbpShareLogo?.public} alt="Serenity Logo" />
        <Description fontSize={'32px'}>{lbpShareName}</Description>
      </ImageSection>
      <TextSection>
        <StatusButton onClick={handleOpenModal} status={status}>
          {statusIcon}
          <TYPE.subHeader1>{statusText}</TYPE.subHeader1>
        </StatusButton>
        <PoolButton>
          <MarketCapIcon style={{ position: 'absolute', left: '11%', top: '28%' }} />
          <TYPE.subHeader1 style={{ color: '#6666FF' }}>Pool Address</TYPE.subHeader1>
        </PoolButton>
        <PoolButton onClick={() => createLbp(parseInt(lbpId))}>
          <EditLBP style={{ position: 'absolute', left: '22%', top: '30%' }} />
          <TYPE.subHeader1 style={{ color: '#6666FF' }}>Edit</TYPE.subHeader1>
        </PoolButton>
      </TextSection>
    </Wrapper>
  )
}

export default AdminHeader
