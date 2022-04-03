import { Theme } from '@mui/material'

export const stepLabel = (theme: Theme) => {
  return {
    styleOverrides: {
      label: {
        fontSize: 14,

        '&.Mui-error': {
          color: '#F56283'
        }
      },
      vertical: {
        width: '100%',
        padding: 0,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        maxHeight: 48
      },
      iconContainer: {
        paddingRight: 0
      }
    }
  }
}
