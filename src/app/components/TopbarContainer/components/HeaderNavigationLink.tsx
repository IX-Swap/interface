import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { blue } from '@mui/material/colors'

export const HeaderNavigationLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  width: '100%',

  '&:hover': {
    '& span': {
      color: blue[300]
    },

    '& svg': {
      '& path': {
        fill: blue[300]
      }
    }
  },

  '& span': {
    fontSize: 16
  },

  '& svg': {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5)
  }
}))
