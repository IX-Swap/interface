import React from 'react'
import { DigitalSecurityOffering, DSOInsightType } from 'types/dso'
import { RaisedProgressBar } from './RaisedProgressBar'
import { formatDistanceToNow, compareAsc } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
})

export interface DSOInsightProps {
  insight: DSOInsightType
  dso: DigitalSecurityOffering
}

export const DSOInsight: React.FC<DSOInsightProps> = ({
  insight,
  dso
}: DSOInsightProps) => {
  const { container } = useStyle()

  if (typeof insight === 'undefined' || typeof dso === 'undefined') {
    return null
  }

  const percent =
    (insight.raisedTotal / (dso.totalFundraisingAmount ?? 1)) * 100
  const launchDate = new Date(dso.launchDate)
  const compare = compareAsc(launchDate, Date.now())

  return (
    <div className={container}>
      {compare < 0 ? (
        <RaisedProgressBar progress={percent} />
      ) : (
        <div>Upcomming</div>
      )}
      <div style={{ fontSize: '12px', color: '#AAA' }}>
        {formatDistanceToNow(launchDate, { addSuffix: true })}
      </div>
    </div>
  )
}
