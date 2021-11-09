import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

export const useAppBreakpoints = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'))
  const isMiniLaptop = useMediaQuery(theme.breakpoints.down('md'))

  return {
    isTablet,
    isMobile,
    isMiniLaptop,
    theme
  }
}
