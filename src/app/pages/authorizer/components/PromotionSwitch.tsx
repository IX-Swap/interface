import React from 'react'
import { FormControlLabel, Switch, Tooltip, Typography } from '@mui/material'
import { usePromoteDSO } from 'app/pages/authorizer/hooks/usePromoteDSO'
import { DigitalSecurityOffering } from 'types/dso'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
export interface PromotionSwitchProps {
  dso: DigitalSecurityOffering
}

export const PromotionSwitch = (props: PromotionSwitchProps) => {
  const { dso } = props
  const [promoteDSO, { isSuccess, data: updatedData }] = usePromoteDSO(dso._id)

  const isPromoted = isSuccess
    ? updatedData?.data.promoted ?? false
    : dso.promoted

  return (
    <FormControlLabel
      control={
        <Switch
          name='promoted'
          defaultChecked={isPromoted}
          onChange={async (_, checked) => await promoteDSO(checked)}
        />
      }
      label={
        <Tooltip
          arrow
          placement='right'
          title={
            <Typography>
              When promoted (switched on), this STO will be shown in the "Top
              Offers" carousel on the invest page
            </Typography>
          }
        >
          <div style={{ display: 'flex' }}>
            <Typography
              variant='subtitle2'
              style={{ fontWeight: isPromoted ? 600 : 400, marginTop: '3px' }}
              color={isPromoted ? 'primary' : 'textPrimary'}
            >
              Promoted
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
