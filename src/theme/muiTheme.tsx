import React from 'react'
import { createTheme, MuiThemeProvider as ThemeProvider } from '@material-ui/core'
import { DefaultTheme } from 'styled-components'

import useTheme from 'hooks/useTheme'

export const muiTheme = ({ bg1, bg2, bg11, bg18, text1, text7, text8, text9, config }: DefaultTheme) =>
  createTheme({
    overrides: {
      MuiPickersBasePicker: {
        pickerView: {
          backgroundColor: bg1,
          borderRadius: '6px',
          '&:focus-visible': {
            outline: 'none',
          },
          '& *': {
            outline: 'none !important',
            border: 'none !important',
          },
        },
      },
      MuiPickersModalDialog: {
        dialogRoot: {
          '& *': {
            outline: 'none !important',
            border: 'none !important',
          },
          outline: 'none',
          backgroundColor: bg1,
          borderRadius: '6px',
          color: '#555566',
          '&:focus-visible': {
            outline: 'none',
          },
        },
        dialog: {
          outline: 'none',
          backgroundColor: bg1,
          borderRadius: '6px',
          color: '#555566',
          '&:focus-visible': {
            outline: 'none',
          },
          '& *': {
            outline: 'none !important',
            border: 'none !important',
          },
        },
      },
      MuiToolbar: {
        gutters: {
          padding: '12px 24px',
        },
      },
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: bg1,
        },
        root: {
          backgroundColor: bg1,
          color: '#8D8DA3',
          // '&:hover .MuiSvgIcon-root': {
          //   color: 'red',
          // },
        },
      },
      MuiTouchRipple: {
        root: {
          '&:focus': {
            backgroundColor: bg1,
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
          fontFamily: ['Inter', 'sans-serif'].join(',') + ' !important',
        },
        body1: {
          color: text1,
        },
        body2: {
          color: text1,
        },
        subtitle1: {
          // color: `${text7} !important`,
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
          borderRadius: '6px',
          color: 'red',
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
        root: {
          flexBasis: '100%',
          '& button': {
            color: text1,
            margin: '4px 0px',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '27px',
            '&$selected': {
              fontSize: '24px',
              lineHeight: '36px',
              color: text1,
              '&:focus': {
                color: text1,
              },
            },
            '&$disabled': {
              color: text7,
              opacity: '50%',
            },
          },
        },
      },
      MuiPickersMonth: {
        root: {
          color: text1,
          '&$selected': {
            color: text1,
            '&:focus': {
              color: text1,
            },
          },
          '&$disabled': {
            color: text7,
            opacity: '50%',
          },
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
          backgroundColor: 'black',
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
            backgroundColor: bg1,
          },
        },
      },
      MuiPickersCalendar: {
        transitionContainer: {
          margin: '12px 0px',
        },
        weekDayLabel: {
          color: text1,
          fontWeight: 400,
          fontSize: '14px',
        },
      },
      MuiPickersArrowSwitcher: {
        iconButton: {
          backgroundColor: bg1,
          '& svg': {
            fill: text1,
          },
        },
      },
      MuiPickersDay: {
        root: {
          backgroundColor: bg1,
          color: text1,
          fontWeight: 400,
          fontSize: '16px',
          '&$selected': {
            backgroundColor: bg1,
            '&:hover': {
              backgroundColor: bg1,
            },
          },
          '&$disabled': {
            opacity: '50%',
            color: 'inherit',
          },

          '&:hover': {
            background: bg2,
          },
          '&:focus': {
            '&$selected': {
              backgroundColor: bg2,
            },
          },
        },
        today: {
          border: 'none !important',
          background: bg2,
        },
      },
      MuiPickersDateRangePickerToolbarProps: {
        penIcon: {
          display: 'none',
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
