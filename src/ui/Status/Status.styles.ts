import makeStyles from '@mui/styles/makeStyles'
import { StatusType } from 'ui/Status/Status'

export interface Props {
  type: StatusType
}

export const useStyles = makeStyles(theme => {
  const getColor = (type: StatusType) => {
    switch (type) {
      case 'submitted':
        return theme.palette.warning.dark
      case 'rejected':
        return theme.palette.error.dark
      case 'draft':
        return theme.palette.info.light
      case 'approved':
      default:
        return '#ffffff'
    }
  }

  const getBg = (type: StatusType) => {
    switch (type) {
      case 'approved':
        return theme.palette.success.main
      case 'submitted':
        return theme.palette.warning.light
      case 'rejected':
        return theme.palette.error.light
      case 'draft':
        return theme.palette.info.dark
    }
  }

  const getBorderColor = (type: StatusType) => {
    return type !== 'approved' ? getColor(type) : theme.palette.success.main
  }

  return {
    wrapper: {
      backgroundColor: ({ type }: Props) => getBg(type),
      border: ({ type }: Props) => `1px solid ${getBorderColor(type)}`,
      padding: theme.spacing(1.25, 3),
      minHeight: 36,

      '&:hover': {
        backgroundColor: ({ type }: Props) => getBg(type)
      },

      '& > span': {
        padding: 0
      },
      '& .MuiChip-label': {
        color: ({ type }: Props) => getColor(type),
        opacity: 1
      }
    }
  }
})
