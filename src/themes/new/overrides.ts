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
  // MuiCssBaseline: {
  //   '@global': {
  //     '@font-face': [monumentExtendedBold, monumentGroteskRegular]
  //   }
  // },
  MuiInputLabel: {
    root: {
      transform: 'translate(0, 1.5px) scale(0.75)!important',
      transformOrigin: 'top left',
      fontSize: 16
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
      boxShadow: '0 0 0 100px #1A397C inset',
      borderRadius: 8,
      boxSizing: 'border-box',
      opacity: 0.2,
      color: '#ffffff',
      fontSize: 16,
      '&:-internal-autofill-selected': {
        color: '#ffffff!important'
      },
      '&:invalid': {
        boxShadow: '0 0 0 100px #1A397C inset'
      },
      '&:focus': {
        border: '2px solid #0055FF'
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
  MuiIconButton: {
    label: {
      width: 20,
      height: 20,
      color: '#0055FF',
      background: '#0055FF',
      borderRadius: 4,
      zIndex: 3,
      border: '1px solid #0055FF',

      '.Mui-checked &': {
        color: '#ffffff',
        background: '#ffffff'
      }
    }
  },
  MuiSvgIcon: {
    root: {
      fill: '#0055FF'
    }
  }
})
