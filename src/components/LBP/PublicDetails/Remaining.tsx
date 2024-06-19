import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import { LbpFormValues } from '../types'
import { displayRemainingTime } from 'utils/time'

interface RemainingProps {
  lbpData: LbpFormValues | null
}



const Remaining: React.FC<RemainingProps> = ({ lbpData }) => {
  const [remainingTime, setRemainingTime] = useState(28 * 24 * 60 * 60)

  const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60))
  const remainingHours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60))

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const calculateRemainingTime = () => {
      if (lbpData && lbpData.startDate && lbpData.endDate) {
        const endDate = new Date(lbpData.endDate).getTime()
        const currentTime = new Date().getTime()
        const remainingTimeInSeconds = Math.max(0, endDate - currentTime) / 1000
        setRemainingTime(remainingTimeInSeconds)
      }
    }
    calculateRemainingTime()
    const interval = setInterval(() => {
      calculateRemainingTime()
    }, 1000)

    return () => clearInterval(interval)
  }, [lbpData])

  return (
    <ContentColumn style={{ gridColumn: '1 / span 1' }}>
      <TYPE.subHeader1 style={{ marginRight: 'auto', color: '#555566' }}> LBP closes in</TYPE.subHeader1>
      <TYPE.label style={{ fontSize: '16px', marginRight: 'auto' }}>
        {displayRemainingTime(remainingDays, remainingHours)}
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
