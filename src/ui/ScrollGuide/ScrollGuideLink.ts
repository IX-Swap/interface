import { styled } from '@mui/material/styles'
import { Link } from 'react-scroll'

export const ScrollGuideLink = styled(Link)(({ theme }) => ({
  display: 'block',
  fontWeight: 500,
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize,
  padding: theme.spacing(1, 3.5),
  cursor: 'pointer',

  '&.active': {
    color: theme.palette.primary.main,
    position: 'relative',

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      height: '100%',
      borderRadius: 4,
      backgroundColor: theme.palette.primary.main
    }
  }
}))
