import React from 'react'
import { createTheme, MuiThemeProvider as ThemeProvider } from '@material-ui/core'

import useTheme from 'hooks/useTheme'
import { DefaultTheme } from 'styled-components'

export const muiTheme = ({ bg7, bg11, bg18, text1, text7, text9, config }: DefaultTheme) =>
  createTheme({
    overrides: {
      MuiPickersBasePicker: {
        pickerView: {
          backgroundColor: bg7,
        },
      },
      MuiToolbar: {
        gutters: {
          padding: '12px 24px',
        },
      },
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: bg11,
        },
      },
      MuiTouchRipple: {
        root: {
          '&:focus': {
            background: 'rgba(55, 46, 94, 0.5)',
            borderRadius: '8px',
          },
        },
      },
      MuiDialogActions: {
        root: {
          display: 'none',
        },
      },
      MuiTypography: {
        root: {
          fontFamily: ['Poppins', 'sans-serif'].join(',') + ' !important',
        },
        body1: {
          color: text1,
        },
        body2: {
          color: text1,
        },
        subtitle1: {
          color: `${text7} !important`,
          fontSize: '18px',
          lineHeight: '150%',
        },
        h4: {
          color: text1,
          fontSize: '36px',
          lineHeight: '150%',
        },
        colorPrimary: {
          color: text1,
        },
        colorInherit: {
          color: text1,
        },
      },
      MuiPickersModal: {
        dialogRoot: {
          borderRadius: '32px',
        },
      },
      MuiPickersToolbarText: {
        toolbarTxt: {
          color: text1,
        },
        toolbarBtnSelected: {
          color: text1,
        },
      },
      MuiPickersYear: {
        yearSelected: {
          color: text1,
          '&:focus': {
            color: text1,
          },
        },
      },
      MuiPickersMonth: {
        monthSelected: {
          color: text1,
          '&:focus': {
            color: text1,
          },
        },
        monthDisabled: {
          color: text7,
          opacity: '50%',
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          margin: '12px 24px 20px 24px !important',
        },
        dayLabel: {
          color: text9,
        },
        iconButton: {
          backgroundColor: 'none',
          padding: 0,
          color: text1,
          width: 32,
          height: 32,
          '& svg': {
            '& path:first-child': {
              ...(config.elements?.main && {
                fill: config.elements?.main,
              }),
            },
            '& path:last-child': {
              ...(config.background?.secondary && {
                fill: 'none',
              }),
            },
          },
          '&:hover': {
            backgroundColor: bg18,
          },
        },
      },
      MuiPickersCalendar: {
        transitionContainer: {
          margin: '12px 0px',
        },
      },
      MuiPickersDay: {
        daySelected: {
          backgroundColor: bg11,
          '&:hover': {
            backgroundColor: bg11,
          },
        },
        dayDisabled: {
          opacity: '50%',
        },
        day: {
          '&:hover': {
            background: bg18,
          },
        },
      },
    } as any,
  })

interface Props {
  children: JSX.Element
}

export const MuiThemeProvider = ({ children }: Props) => {
  const theme = useTheme()

  return <ThemeProvider theme={muiTheme(theme)}>{children}</ThemeProvider>
}
