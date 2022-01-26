import {
  FormControlLabel,
  Switch,
  Tooltip,
  Typography
} from '@mui/material'
import withStyles from '@mui/styles/withStyles';
import { red } from '@mui/material/colors'
import { useDisableDSO } from 'app/pages/authorizer/hooks/useDisableDSO'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'

// TODO: move to ui folder
const RedSwitch = withStyles({
  switchBase: {
    color: '#ffffff',
    '&$checked': {
      color: red[300]
    },
    '&$checked + $track': {
      backgroundColor: red[600]
    }
  },
  checked: {},
  track: {}
})(Switch)

export interface VisibilitySwitchProps {
  dso: DigitalSecurityOffering
}

export const VisibilitySwitch = (props: VisibilitySwitchProps) => {
  const { dso } = props
  const [disableDSO, { isSuccess, data: updatedData }] = useDisableDSO(dso._id)

  const isDisabled = isSuccess
    ? updatedData?.data.disabled ?? false
    : dso.disabled

  return (
    <FormControlLabel
      control={
        <RedSwitch
          name='promoted'
          defaultChecked={isDisabled}
          onChange={async (_, checked) => await disableDSO(checked)}
        />
      }
      label={
        <Tooltip
          title={
            <Typography>
              When disabled (switched on), this DSO will not be listed on the
              invest page
            </Typography>
          }
        >
          <Typography
            variant='subtitle2'
            style={{ fontWeight: isDisabled ? 600 : 400 }}
            color={isDisabled ? 'error' : 'textPrimary'}
          >
            Disabled
          </Typography>
        </Tooltip>
      }
    />
  )
}
