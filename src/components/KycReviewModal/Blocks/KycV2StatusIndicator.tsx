import React from 'react'
import { ReactComponent as Approved } from '../../../assets/images/newRightCheck.svg'
import { ReactComponent as CloseIcon } from '../../../assets/images/newCloseIcon.svg'
import { ReactComponent as PendingIcon } from '../../../assets/images/newPending.svg'
import { TYPE } from 'theme'
import styled from 'styled-components'

interface StatusProps {
  status: string
}

const statusMap: { [key: string]: { Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; text: string } } = {
  clear: { Icon: Approved, text: 'Clear' },
  attention: { Icon: PendingIcon, text: 'Attention' },
  not_processed: { Icon: CloseIcon, text: 'Not Processed' },
  default: { Icon: null as any, text: '-' },
}

const StatusIndicator: React.FC<StatusProps> = ({ status }) => {
  const { Icon, text } = statusMap[status] || statusMap['default']

  return (
    <StatusCheckBox>
      {Icon && <Icon style={{ width: '20px' }} />}
      <TYPE.subHeader1>{text}</TYPE.subHeader1>
    </StatusCheckBox>
  )
}

export default StatusIndicator

const StatusCheckBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
`
