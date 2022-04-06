import { Theme } from '@mui/material'

export const input = (theme: Theme) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const inputStyles = theme.palette.input!
  return {
    MuiInputLabel: {
      defaultProps: {
        shrink: true
      }
    },
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 4,

        '& ~ p.MuiFormHelperText-root': {
          marginLeft: 0,
          background: 'transparent',
          backgroundColor: 'transparent'
        },
        '& .MuiFilledInput-root, & .MuiFilledInput-root:focus, & .MuiFilledInput-root:hover':
          {
            backgroundColor: theme.palette.background.paper,
            height: 85,
            '&:before, &:after': {
              border: 0,
              transition: 'none'
            }
          },
        '& .MuiInputLabel-root': {
          '&.Mui-disabled': {
            color: theme.palette.text.secondary
          }
        },
        '& .MuiInputLabel-outlined': {
          top: -12,
          left: -12
        },
        '& .MuiOutlinedInput-input': {
          height: 49
        },
        '.MuiOutlinedInput-root.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline':
          {
            borderColor: theme.palette.primary.light,
            borderWidth: 1
          },
        '.MuiOutlinedInput-root.MuiInputBase-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline':
          {
            borderColor: 'unset'
          },
        '.MuiOutlinedInput-root.Mui-error.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline':
          {
            borderColor: theme.palette.error.main
          },
        '& .MuiOutlinedInput-root': {
          paddingRight: 0,
          '& fieldset': {
            border: `1px solid ${inputStyles?.border}`
          },
          '& fieldset legend': {
            width: 0
          }
        },
        '& .MuiInputAdornment-root.MuiInputAdornment-positionEnd': {
          marginLeft: -32
        },
        input: {
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 24,
          paddingRight: 24,
          height: '100%',
          marginRight: 12,
          width: '100%',
          boxShadow: 'none',
          borderRadius: 8,
          boxSizing: 'border-box' as any,
          color: theme.palette.text.primary,
          fontSize: 16,
          WebkitBoxShadow: '',
          '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: inputStyles?.placeholder
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '',
            WebkitTextFillColor: '',
            transition: ''
          },

          '&:-webkit-autofill:focus': {
            WebkitBoxShadow: '',
            WebkitTextFillColor: '',
            transition: 'none'
          },
          '&:-internal-autofill-selected': {
            WebkitBoxShadow: '',
            backgroundColor: ''
          },
          '.Mui-focused &': {
            backgroundColor: '',
            WebkitBoxShadow: 'none!important',
            color: '',
            transition: 'none!important'
          },
          '.Mui-error &': {
            WebkitBoxShadow: 'none!important',
            color: theme.palette.error.main
          },
          '.Mui-disabled &': {
            background: inputStyles.disabledBg,
            backgroundColor: inputStyles.disabledBg
          }
        },
        adornedEnd: {
          paddingRight: 8,
          '&.Mui-error': {
            backgroundColor: ''
          },
          '&.Mui-focused': {
            backgroundColor: '',
            WebkitBoxShadow: 'none!important'
          }
        },
        multiline: {
          height: 'auto',
          minHeight: 74
        },
        inputMultiline: {
          minHeight: 38
        }
      }
    }
  }
}
