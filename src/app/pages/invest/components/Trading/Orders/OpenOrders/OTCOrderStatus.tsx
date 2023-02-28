import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'
import { ReactComponent as PendingIcon } from 'assets/icons/status-pending.svg'
import { ReactComponent as MatchedIcon } from 'assets/icons/status-matched.svg'

const BorderLinearProgress = styled(LinearProgress)(({ theme, value = 0 }) => ({
  height: 8,
  borderRadius: 5,
  marginBottom: '3px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F4F6F7',
    border: '1px solid #DBE2EC',
    width: '100px'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      value > 0 ? (value < 100 ? '#F3CF46' : '#65AD18') : '#7DD320'
  }
}))

const StatusLabel = ({
  status,
  percentageFilled
}: {
  status: string
  percentageFilled: number
}) => {
  const color =
    percentageFilled > 0
      ? percentageFilled < 100
        ? '#C89D00'
        : '#65AD18'
      : '#778194'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        color
      }}
    >
      {percentageFilled > 0 ? <MatchedIcon /> : <PendingIcon />}

      <small style={{ marginLeft: '3px', whiteSpace: 'nowrap' }}>
        {status}
      </small>
    </Box>
  )
}
export default function OTCOrderStatus({
  percentageFilled = '50%'
}: {
  percentageFilled: string
}) {
  const value = parseFloat(percentageFilled)

  let status = 'Approval Pending'

  switch (true) {
    case value === 100:
      status = 'Filled'
      break

    case value > 0 && value < 100:
      status = 'Matched'
      break
  }

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'stretch' }}
    >
      <Box>
        <BorderLinearProgress variant='determinate' value={value} />
        <StatusLabel status={status} percentageFilled={value} />
      </Box>
      <Box sx={{ marginLeft: '10px' }}>{`${percentageFilled}`}</Box>
    </Box>
  )
}
