import React from 'react'
import { FormControlLabel, Switch, Tooltip, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { DigitalSecurityOffering } from 'types/dso'
import { useNonInvestable } from '../hooks/useNonInvestable'

export interface NonInvestableSwitchProps {
  dso: DigitalSecurityOffering
}

export const NonInvestableSwitch = (props: NonInvestableSwitchProps) => {
  const { dso } = props
  const [nonInvestableDSO, { isSuccess, data: updatedData }] = useNonInvestable(
    dso._id
  )

  const isPromoted = isSuccess
    ? updatedData?.data.promoted ?? false
    : dso.promoted

  return (
    <FormControlLabel
      control={
        <Switch
          name='promoted'
          defaultChecked={isPromoted}
          onChange={async (_, checked) => await nonInvestableDSO(checked)}
        />
      }
      label={
        <Tooltip
          title={
            <Typography>
              Non-Investable tooltip text: When switched on, this STO can only
              be viewed by investors but it cannot be invested by investors.
            </Typography>
          }
          arrow
          placement='right'
        >
          <div style={{ display: 'flex' }}>
            <Typography
              variant='subtitle2'
              style={{ fontWeight: isPromoted ? 600 : 400, marginTop: '3px' }}
              color={isPromoted ? 'primary' : 'textPrimary'}
            >
              Non-Investable
            </Typography>

            <InfoOutlinedIcon
              style={{ marginLeft: '5px' }}
              color='disabled'
            ></InfoOutlinedIcon>
          </div>
        </Tooltip>
      }
    />
  )
}
