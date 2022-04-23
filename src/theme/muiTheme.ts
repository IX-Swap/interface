import { createTheme } from '@material-ui/core'

export const muiTheme = createTheme({
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: '#372E5E',
      },
    },
    MuiToolbar: {
      gutters: {
        padding: '12px 24px',
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#272046',
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
      yearSelected: {
        color: '#fff',
        '&:focus': {
          color: '#fff',
        },
      },
    },
    MuiPickersMonth: {
      monthSelected: {
        color: '#fff',
        '&:focus': {
          color: '#fff',
        },
      },
      monthDisabled: {
        color: '#9184C4',
        opacity: '50%',
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
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: '#272046',
        '&:hover': {
          backgroundColor: '#272046',
        },
      },
      dayDisabled: {
        opacity: '50%',
      },
      day: {
        '&:hover': {
          background: 'rgba(39, 32, 70, 0.35)',
        },
      },
    },
  } as any,
})
