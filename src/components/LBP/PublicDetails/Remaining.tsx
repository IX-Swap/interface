import React from 'react'
import styled from 'styled-components'
import Countdown, { renderer } from 'components/Countdown'

import { ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import { LbpFormValues } from '../types'

interface RemainingProps {
  lbpData: LbpFormValues | null
}

const Remaining: React.FC<RemainingProps> = ({ lbpData }) => {
  const endDate = lbpData?.endDate ? new Date(lbpData?.endDate) : new Date()

  return (
    <ContentColumn style={{ gridColumn: '1 / span 1' }}>
      <TYPE.subHeader1 style={{ marginRight: 'auto', color: '#555566' }}> LBP closes in</TYPE.subHeader1>
      <TYPE.label style={{ fontSize: '16px', marginRight: 'auto' }}>
        <Countdown date={endDate} renderer={renderer} />
      </TYPE.label>
    </ContentColumn>
  )
}

export default React.memo(Remaining)

const ContentColumn = styled(ColumnCenter)`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  @media (min-width: 768px) {
    & + & {
      margin-left: 20px;
    }
  }
`
