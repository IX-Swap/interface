import { Theme } from '@mui/material'

export const input = (theme: Theme) => {
  const inputStyles = theme.palette.input
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

        '& .MuiFormHelperText-root, & ~ .MuiFormHelperText-root,': {
          marginLeft: 0,
          marginTop: 12
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
        '.MuiOutlinedInput-root': {
          width: 267,
          maxWidth: 267,
          backgroundColor: theme.palette.background.paper,
          paddingRight: 0,
          borderWidth: 1,
          '&.MuiInputBase-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light,
              borderWidth: 1
            },
            '&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'unset'
            },
            '&.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main
            }
          },
          '&.Mui-focus': {
            backgroundColor: theme.palette.background.paper
          },
          '&.Mui-disabled': {
            backgroundColor: inputStyles.disabledBg
          },
          '& fieldset': {
            border: `1px solid ${inputStyles?.border}`
          },
          '& fieldset legend': {
            width: 0
          }
        },
        '& .MuiInputAdornment-root.MuiInputAdornment-positionEnd': {
          marginRight: 10,
          backgroundColor: theme.palette.background.paper
        },
        input: {
          paddingTop: 17,
          paddingBottom: 17,
          paddingLeft: 16,
          height: '100%',
          marginRight: 5,
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
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: '',
            transition: ''
          },

          '&:-webkit-autofill:focus': {
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: '',
            transition: 'none'
          },
          '&:-internal-autofill-selected': {
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
            borderRadius: 0
          },
          '.Mui-focused &': {
            backgroundColor: '',
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
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
