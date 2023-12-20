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

  const isNonInvestable = isSuccess
    ? !(updatedData?.data.investable ?? false)
    : !dso.investable

  return (
    <FormControlLabel
      control={
        <Switch
          name='investable'
          defaultChecked={isNonInvestable}
          onChange={async (_, checked) => await nonInvestableDSO(!checked)}
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
              style={{
                fontWeight: isNonInvestable ? 600 : 400,
                marginTop: '3px'
              }}
              color={isNonInvestable ? 'primary' : 'textPrimary'}
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
