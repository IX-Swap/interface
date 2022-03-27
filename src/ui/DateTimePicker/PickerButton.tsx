import React, { createElement, FunctionComponent } from 'react'
import { ClickAwayListener, Paper } from '@mui/material'
import Popper, { PopperPlacementType, PopperProps } from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import { PickerOnChangeFn } from '@mui/lab/internal/pickers/hooks/useViews'
import { Icon } from 'ui/Icons/Icon'
import { CustomButton } from 'ui/DateTimePicker/CustomButton'

export interface PopperElProps extends PopperProps {
  clickAwayHandler: (event: MouseEvent | TouchEvent) => void
  el: FunctionComponent<any>
  date: Date
  onChange: (value: any) => void
  minDate?: Date
  maxDate?: Date
  isDateDisabled?: () => boolean
}

export const PopperEl = ({
  clickAwayHandler,
  el,
  date,
  onChange,
  minDate,
  maxDate,
  isDateDisabled,
  ...rest
}: PopperElProps) => {
  return (
    <ClickAwayListener onClickAway={clickAwayHandler}>
      <Popper {...rest}>
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
    </ClickAwayListener>
  )
}

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
  placement?: PopperPlacementType
  clickAwayHandler: (event: MouseEvent | TouchEvent) => void
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
  isDateDisabled,
  placement = 'bottom-start',
  clickAwayHandler
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
      >
        {label}
      </CustomButton>
      {open && (
        <PopperEl
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          placement={placement}
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChange}
          el={el}
          clickAwayHandler={clickAwayHandler}
          isDateDisabled={isDateDisabled}
        />
      )}
    </>
  )
}
