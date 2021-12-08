import { t } from '@lingui/macro'
import Tooltip from 'components/Tooltip'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

const GreenBadge = styled.span`
  padding: 0px 3px;
  background: ${({ theme }) => theme.success};
  color: ${({ theme }) => theme.text1};
  font-weight: bold;
  font-size: 13px;
  border-radius: 4px;
`

const MitigationBadge = () => {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  const mitigationText = t`Mitigation enabled - if the transaction price deviates too far from the time-weighted average price, the transaction will be blocked`
  return (
    <span style={{ marginLeft: 2, display: 'flex', alignItems: 'center', height: 'fit-content' }}>
      <Tooltip text={mitigationText} show={show} style={{ height: 'fit-content' }}>
        <GreenBadge onClick={open} onMouseEnter={open} onMouseLeave={close}>
          M
        </GreenBadge>
      </Tooltip>
    </span>
  )
}

export default MitigationBadge
