import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

export const useAppBreakpoints = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isMiniLaptop = useMediaQuery(theme.breakpoints.down('lg'))

  return {
    isTablet,
    isMobile,
    isMiniLaptop,
    theme
  }
}
