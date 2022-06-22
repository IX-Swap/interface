import React, { createElement, FunctionComponent } from 'react'
import PopupState, {
  bindPopper,
  bindTrigger,
  InjectedProps
} from 'material-ui-popup-state'
import { DropdownContent } from 'app/components/Dropdown/DropdownContent'
import { ThemeProvider, PopperPlacementType } from '@mui/material'
import { useAppTheme } from 'hooks/useAppTheme'
import { AppTheme, getAppTheme } from 'themes/app'

export interface DropdownTriggerProps {
  triggerProps: ReturnType<typeof bindTrigger>
  injectedProps: InjectedProps
}

export interface DropdownContentProps {
  popperProps: ReturnType<typeof bindPopper>
  injectedProps: InjectedProps
}

export interface DropdownProps {
  trigger: FunctionComponent<DropdownTriggerProps>
  content: FunctionComponent<DropdownContentProps>
  arrow?: boolean
  placement?: PopperPlacementType
  contentTheme?: 'light' | 'dark'
}

export const Dropdown = (props: DropdownProps) => {
  const {
    content,
    trigger,
    arrow = false,
    placement = 'bottom-end',
    contentTheme
  } = props
  const { theme: defaultTheme } = useAppTheme()
  const theme =
    contentTheme === undefined ? defaultTheme : getAppTheme(AppTheme.Dark, true)
  const refDropdown = React.useRef<any>()

  return (
    <div ref={refDropdown}>
      <PopupState variant='popper'>
        {popupState => (
          <>
            {createElement(trigger, {
              triggerProps: bindTrigger(popupState),
              injectedProps: popupState
            })}

            <ThemeProvider theme={theme}>
              <DropdownContent
                popupState={popupState}
                placement={placement}
                arrow={arrow}
                anchorEl={refDropdown}
              >
                {content}
              </DropdownContent>
            </ThemeProvider>
          </>
        )}
      </PopupState>
    </div>
  )
}
