import makeStyles from '@mui/styles/makeStyles'
import { Theme } from '@mui/material/styles'

export interface Props {
  isActive: boolean
}

const getColor = (isActive: boolean, theme: Theme) => {
  if (isActive) {
    return theme.palette.text.primary
  }

  if (theme.palette.mode === 'light') {
    return theme.palette.text.secondary
  }

  return theme.palette.divider
}

export default makeStyles(theme => ({
  container: {
    margin: theme.spacing(0, 0, 1.875),
    alignItems: 'flex-start'
  },
  label: {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400,
    marginTop: theme.spacing(0.75),
    textTransform: 'capitalize',
    color: ({ isActive }: Props) => getColor(isActive, theme)
  }
}))
