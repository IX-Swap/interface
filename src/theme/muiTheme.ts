import { createTheme } from '@material-ui/core'

export const muiTheme = createTheme({
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: '#372E5E',
        borderRadius: '32px',
      },
    },
    MuiPickersModalDialog: {
      dialogRoot: {
        outline: 'none',
        backgroundColor: '#372E5E',
        borderRadius: '32px',
        color: 'white',
        '&:focus-visible': {
          outline: 'none',
        },
      },
      dialog: {
        outline: 'none',
        backgroundColor: '#372E5E',
        borderRadius: '32px',
        color: 'white',
        '&:focus-visible': {
          outline: 'none',
        },
      },
    },
    MuiToolbar: {
      gutters: {
        padding: '12px 24px',
      },
    },
    MuiPickersToolbar: {
      root: {
        backgroundColor: '#272046',
        padding: '12px 24px',
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
        color: '#fff',
      },
      body2: {
        color: '#fff',
      },
      subtitle1: {
        color: '#9184C4 !important',
        fontSize: '18px',
        lineHeight: '150%',
      },
      h4: {
        color: '#fff',
        fontSize: '36px',
        lineHeight: '150%',
      },
      colorPrimary: {
        color: '#fff',
      },
      colorInherit: {
        color: '#fff',
      },
    },
    MuiPickersModal: {
      dialogRoot: {
        borderRadius: '32px',
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: '#fff',
      },
    },
    MuiPickersYear: {
      root: {
        flexBasis: '100%',
        '& button': {
          color: '#9184C3',
          margin: '4px 0px',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '27px',
          '&$selected': {
            fontSize: '24px',
            lineHeight: '36px',
            color: '#fff',
            '&:focus': {
              color: '#fff',
            },
          },
          '&$disabled': {
            color: '#9184C4',
            opacity: '50%',
          },
        },
      },
    },
    MuiPickersMonth: {
      root: {
        color: 'white',
        '&$selected': {
          color: '#fff',
          '&:focus': {
            color: '#fff',
          },
        },
        '&$disabled': {
          color: '#9184C4',
          opacity: '50%',
        },
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        margin: '12px 24px 20px 24px !important',
      },
      dayLabel: {
        color: '#EDCEFF80',
      },
      iconButton: {
        backgroundColor: 'none',
        padding: 0,
        color: '#fff',
        width: 32,
        height: 32,

        '&:hover': {
          backgroundColor: 'rgba(39, 32, 70, 0.35)',
        },
      },
    },
    MuiPickersCalendar: {
      transitionContainer: {
        margin: '12px 0px',
      },
      weekDayLabel: {
        color: '#EDCEFF80',
        fontWeight: 400,
        fontSize: '14px',
      },
    },
    MuiPickersArrowSwitcher: {
      iconButton: {
        backgroundColor: 'none',
        '& svg': {
          fill: 'white',
        },
      },
    },
    MuiPickersDay: {
      root: {
        backgroundColor: 'none',
        color: 'white',
        fontWeight: 400,
        fontSize: '16px',
        '&$selected': {
          backgroundColor: '#272046',
          '&:hover': {
            backgroundColor: '#272046',
          },
        },
        '&$disabled': {
          opacity: '50%',
          color: 'inherit',
        },

        '&:hover': {
          background: 'rgba(39, 32, 70, 0.35)',
        },
        '&:focus': {
          '&$selected': {
            backgroundColor: '#272046',
          },
        },
      },
      today: {
        border: 'none !important',
        background: 'rgba(39, 32, 70, 0.35)',
      },
    },
    MuiPickersDatePickerToolbar: {
      penIcon: {
        display: 'none',
      },
    },
    MuiPickersDateRangePickerToolbarProps: {
      penIcon: {
        display: 'none',
      },
    },
  } as any,
})
