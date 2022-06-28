import { Theme } from '@mui/material'

export const input = (theme: Theme) => {
  const inputStyles = theme.palette.input
  return {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 8,
        marginTop: 0,
        // common styles
        '& .MuiFormHelperText-root, & ~ .MuiFormHelperText-root': {
          marginLeft: 0,
          marginTop: 12
        },
        '& .MuiInputLabel-root': {
          color: theme.palette.select.label,
          fontSize: 14,
          transform: 'scale(1)',
          '&.MuiInputLabel-filled': {
            top: 12,
            left: 16
          },
          '&.Mui-focused': {
            color: theme.palette.primary.main,
            opacity: 1
          },
          '&.Mui-error': {
            color: theme.palette.select.label,
            opacity: 1
          },
          '&.Mui-disabled': {
            color: theme.palette.select.label,
            opacity: 1
          }
        },
        '& .MuiInputAdornment-root.MuiInputAdornment-positionEnd': {
          marginRight: 10,
          backgroundColor: theme.palette.background.paper
        },
        '& .MuiInputBase-root.Mui-error.MuiInputBase-formControl input': {
          color: `${theme.palette.error.main}`
        },

        // filled input
        '.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root': {
          background: theme.palette.background.paper,
          backgroundColor: theme.palette.background.paper,
          '&.Mui-disabled': {
            backgroundColor: inputStyles.disabledBg,
            border: 'none'
          },
          '&:hover:before': {
            border: 0
          }
        },
        '& .MuiFilledInput-root:hover': {
          border: `1px solid ${theme.palette.primary.light}`
        },
        '& .MuiFilledInput-root, & .MuiFilledInput-root:focus, & .MuiFilledInput-root:hover':
          {
            backgroundColor: theme.palette.background.paper,
            background: theme.palette.background.paper,
            height: 85,
            borderRadius: 8,
            transition: 'none',
            width: 400,
            [theme.breakpoints.down('sm')]: {
              width: 300
            },
            '&:before, &:after': {
              border: 0,
              transition: 'none'
            },
            '&.Mui-focused': {
              border: `1px solid ${theme.palette.primary.light}`
            },
            '&.Mui-disabled': {
              backgroundColor: inputStyles.disabledBg,
              border: 'none'
            },
            '&.Mui-error': {
              border: `1px solid ${theme.palette.error.main}`
            },
            input: {
              '&:-internal-autofill-selected': {
                WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
                borderRadius: 0
              }
            }
          },
        // outlined input
        '& .MuiInputLabel-outlined': {
          position: 'initial',
          marginBottom: 12,
          lineHeight: 1.13
        },
        '& .MuiOutlinedInput-input': {
          height: 49
        },
        '.MuiOutlinedInput-root': {
          backgroundColor: theme.palette.background.paper,
          paddingRight: 0,
          borderWidth: 1,
          '&.MuiInputBase-root': {
            borderRadius: 8,
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
        // input
        input: {
          paddingTop: 17,
          paddingBottom: 17,
          paddingLeft: 16,
          height: '100%',
          marginRight: 5,
          boxShadow: 'none',
          borderRadius: 8,

          boxSizing: 'border-box' as any,
          color: theme.palette.select.label,
          fontSize: 14,
          WebkitBoxShadow: '',
          '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: inputStyles?.placeholder,
            opacity: 1,
            fontSize: 14,
            lineHeight: 17
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.select.label,
            transition: '',
            color: theme.palette.select.label
          },

          '&:-webkit-autofill:focus': {
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: '',
            transition: 'none'
          },
          '&:-internal-autofill-selected': {
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
            borderRadius: 0,
            color: theme.palette.select.label
          },
          '.Mui-focused &': {
            backgroundColor: '',
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
            color: '',
            transition: 'none!important'
          },
          '.Mui-error &': {
            WebkitBoxShadow: 'none!important'
          },
          '.Mui-disabled &': {
            background: inputStyles.disabledBg,
            backgroundColor: inputStyles.disabledBg
          },
          '&[type=tel]': {
            '&:-webkit-autofill': {
              WebkitTextFillColor: inputStyles?.placeholder
            },
            color: inputStyles?.placeholder
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
