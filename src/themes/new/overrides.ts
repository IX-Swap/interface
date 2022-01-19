import { Theme } from '@material-ui/core'
import { Overrides } from '@material-ui/core/styles/overrides'
import { rte } from 'themes/new/rte'
import { CSSProperties } from 'react'

interface LabOverrides {
  MuiSkeleton: {
    root: CSSProperties
  }
  MUIRichTextEditor: {
    root: any
    container: any
    editor: any
    toolbar: any
    placeHolder: any
  }
  PrivateSwitchBase: {
    root: any
    checked: any
  }
}

export const getThemeOverrides = (
  theme: Theme
): Partial<Overrides> & Partial<LabOverrides> => ({
  ...rte(theme),
  MuiFormHelperText: {
    root: {
      '&.Mui-error': {
        color: '#FF8080',
        textAlign: 'right',
        paddingTop: 6
      }
    }
  },
  MuiInputLabel: {
    root: {
      transform: 'translate(0, -11px) !important',
      transformOrigin: 'top left',
      fontSize: 16,

      '&.Mui-focused': {
        color: '#ffffff'
      },
      '&.Mui-error': {
        color: '#ffffff'
      }
    }
  },
  MuiInput: {
    root: {
      minHeight: 38
    },
    input: {},
    underline: {
      '&::after': {
        content: 'none'
      },
      '&::before': {
        content: 'none'
      }
    }
  },
  MuiInputBase: {
    root: {
      padding: 0,
      minHeight: 60,
      height: 60
    },
    input: {
      paddingTop: 18,
      paddingBottom: 18,
      paddingLeft: 24,
      paddingRight: 24,
      height: '100%',
      backgroundColor: '#1a397c40',
      boxShadow: 'none',
      borderRadius: 8,
      boxSizing: 'border-box',
      color: '#ffffff',
      fontSize: 16,
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px #1a397c inset',
        WebkitTextFillColor: '#ffffff',
        transition: 'background-color 5000s ease-in-out 0s'
      },
      '&:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px #ffffff inset',
        WebkitTextFillColor: '#334466',
        transition: 'none'
      },
      '.Mui-focused &': {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: 'none'
      }
    },
    inputMarginDense: {
      paddingTop: 12,
      paddingBottom: 12
    },
    adornedEnd: {
      paddingRight: 8
    },
    multiline: {
      height: 'auto',
      minHeight: 74
    },
    inputMultiline: {
      minHeight: 38
    }
  },
  MuiButtonBase: {
    root: {
      height: 60
    }
  },
  MuiButton: {
    label: {
      fontSize: 12
    },
    contained: {
      borderRadius: 8,
      '&.Mui-disabled': {
        backgroundColor: '#0055FF20'
      }
    }
  },
  MuiIconButton: {
    label: {
      width: 20,
      height: 20,
      color: '#0055FF',
      background: '#102756',
      borderRadius: 4,
      zIndex: 3,
      border: '1px solid #102756',

      '.Mui-checked &': {
        color: '#ffffff',
        background: '#0055FF',
        border: '1px solid #0055FF'
      }
    }
  },
  MuiSvgIcon: {
    root: {
      fill: '#102756',
      '.Mui-checked &': {
        fill: '#0055FF'
      }
    }
  }
})
