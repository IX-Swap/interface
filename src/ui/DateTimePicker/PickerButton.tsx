import React, { createElement, FunctionComponent } from 'react'
import { Paper } from '@mui/material'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import { PickerOnChangeFn } from '@mui/lab/internal/pickers/hooks/useViews'
import { Icon } from 'ui/Icons/Icon'
import { CustomButton } from 'ui/DateTimePicker/CustomButton'

export interface PickerButtonProps {
  date: Date
  setDate: (date: Date | null) => void
  open: boolean
  onClick: () => void
  minDate?: Date
  maxDate?: Date
  el: FunctionComponent<any>
  label: string
  isDateDisabled?: () => boolean
}

export const PickerButton = ({
  date,
  setDate,
  open,
  onClick,
  minDate,
  maxDate,
  el,
  label,
  isDateDisabled
}: PickerButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    onClick()
  }

  const onChange: PickerOnChangeFn<Date | null> = value => {
    setDate(value)
  }

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined

  return (
    <>
      <CustomButton
        onClick={handleClick}
        endIcon={<Icon name='switch-down' size={16} />}
        disableRipple
        sx={{
          ml: 4
        }}
      >
        {label}
      </CustomButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement='bottom-start'
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={150}>
            <Paper variant='outlined'>
              {createElement(
                el,
                Object.assign(
                  {},
                  {
                    date,
                    onChange,
                    minDate,
                    maxDate,
                    ...(isDateDisabled !== undefined && { isDateDisabled })
                  }
                )
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}
