import React from 'react'
import {
  FormControlLabel,
  Box,
  RadioGroup,
  RadioGroupProps,
  Typography
} from '@mui/material'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { useStyles } from './TenantThemeSelectStyles.styles'
import classnames from 'classnames'
import { tenantThemes } from 'config/defaults'
export interface TenantThemeSelectProps extends RadioGroupProps {
  onButtonClick?: (value: string) => void
}

export const TenantThemeSelect = ({
  onButtonClick = () => {},
  ...props
}: TenantThemeSelectProps) => {
  const classes = useStyles()

  const initialValue = props.defaultValue
  const onChangeValue = (value: string) => {
    onButtonClick?.(value)
  }

  return (
    <RadioGroup defaultValue={initialValue} value={props.value}>
      <Typography>Theme</Typography>
      <Box className={classes.wrapper}>
        {tenantThemes.map(item => {
          const isActive =
            item.name === props.value || item.name === initialValue

          return (
            <Box
              key={item.name}
              sx={{ backgroundColor: item.hex }}
              className={classnames(classes.button, {
                [classes.active]: isActive
              })}
              onClick={() => onChangeValue(item.name)}
              title={item.name}
            >
              <FormControlLabel
                label={''}
                value={item.name}
                checked={
                  item.name === props.value || item.name === initialValue
                }
                control={<UIRadio />}
              />
            </Box>
          )
        })}
      </Box>
    </RadioGroup>
  )
}
