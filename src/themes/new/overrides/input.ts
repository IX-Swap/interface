import { Theme } from '@mui/material'

export const input = (theme: Theme) => {
  const placeholder = theme.palette.input?.placeholder
  return {
    MuiInputLabel: {
      defaultProps: {
        shrink: true
      }
    },
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        '& .MuiFilledInput-root, & .MuiFilledInput-root:focus, & .MuiFilledInput-root:hover':
          {
            backgroundColor: theme.palette.background.paper,
            height: 85,
            '&:before, &:after': {
              border: 0,
              transition: 'none'
            }
          },
        '& .MuiOutlinedInput-input': {
          height: 49
        },
        input: {
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 24,
          paddingRight: 24,
          height: '100%',
          boxShadow: 'none',
          borderRadius: 8,
          boxSizing: 'border-box' as any,
          color: '#ffffff',
          fontSize: 16,
          WebkitBoxShadow: '',
          '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: placeholder
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
            border: `1px solid ${theme.palette.primary.light}`,
            transition: 'none!important'
          },
          '.Mui-error &': {
            WebkitBoxShadow: 'none!important'
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
