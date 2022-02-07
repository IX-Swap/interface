import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ScrollGuide = styled(Box)(({ theme }) => ({
  position: 'relative',

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: 4,
    backgroundColor: theme.palette.divider,
    borderRadius: 4
  }
}))
