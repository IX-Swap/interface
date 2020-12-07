import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

export const useAppBreakpoints = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'))

  return {
    isTablet,
    theme
  }
}
