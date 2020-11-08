import { TypographyOptions } from '@material-ui/core/styles/createTypography'

export const typography: TypographyOptions = {
  fontFamily: '"Bai Jamjuree", "Helvetica Neue", sans-serif !important',
  fontSize: 12,
  h1: {
    fontSize: '3rem',
    fontWeight: 700
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700
  },
  h3: {
    fontSize: '1.64rem',
    fontWeight: 700
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500
  },
  h5: {
    fontSize: '1.285rem',
    fontWeight: 500
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#999999',
    textTransform: 'uppercase' as const
  },
  subtitle1: {
    fontWeight: 700
  },
  subtitle2: {
    fontWeight: 700
  }
}
