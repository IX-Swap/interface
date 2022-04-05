import { Theme } from '@mui/material'

export const breadcrumbs = (theme: Theme) => {
  // eslint-disable-next-line
  const breadcrumbsPalette = theme.palette.breadcrumbs!

  return {
    defaultProps: {
      separator: ''
    },
    styleOverrides: {
      root: {},
      li: {
        '> a': {
          color: breadcrumbsPalette.link,
          fontWeight: 500,
          textDecoration: 'none'
        },
        '> p': {
          color: breadcrumbsPalette.color,
          fontWeight: 500
        },
        '&:hover': {
          '> a': {
            color: '#4C88FF',
            textDecoration: 'underline'
          }
        }
      },
      separator: {
        color: 'transparent',
        width: 4,
        height: 4,
        backgroundColor: breadcrumbsPalette.color,
        borderRadius: 2
      }
    }
  }
}
