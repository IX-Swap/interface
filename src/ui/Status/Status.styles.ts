import makeStyles from '@mui/styles/makeStyles'
import { StatusType } from 'ui/Status/Status'

export interface Props {
  type: StatusType
}

export const useStyles = makeStyles(theme => {
  const getColor = (type: StatusType) => {
    switch (type.toLowerCase()) {
      case 'approved':
      case 'funds transferred':
      case 'deployed':
      case 'low':
      case 'Enable':
      case 'Confirmed':
      case 'new-confirmed':
        return theme.palette.success.main
      case 'submitted':
      case 'closed':
      case 'settlement in progress':
      case 'medium':
      case 'Pendig':
      case 'new-match':
        return theme.palette.warning.dark
      case 'error':
      case 'rejected':
      case 'funds on hold':
      case 'failed':
      case 'high':
      case 'rejected-match':
      case 'rejected-confirmed':
        return theme.palette.error.dark
      case 'draft':
      case 'open':
      case 'not funded':
      case 'pending':
      case 'new-settled':
      case 'completed-confirmed':
        return theme.palette.info.light
      case 'success':
      case 'passed':
        return '#4C88FF'
      case 'completed-settled':
        return '#4C88FF'
      default:
        return '#ffffff'
    }
  }

  const getBg = (type: StatusType) => {
    switch (type.toLowerCase()) {
      case 'approved':
      case 'funds transferred':
      case 'deployed':
      case 'low':
      case 'Enable':
      case 'Confirmed':
      case 'new-confirmed':
        return theme.palette.success.light
      case 'submitted':
      case 'closed':
      case 'settlement in progress':
      case 'medium':
      case 'Pendig':
      case 'new-match':
        return theme.palette.warning.light
      case 'error':
      case 'rejected':
      case 'funds on hold':
      case 'failed':
      case 'high':
      case 'rejected-match':
      case 'rejected-confirmed':
        return theme.palette.error.light
      case 'draft':
      case 'open':
      case 'not funded':
      case 'pending':
      case 'new-settled':
      case 'completed-confirmed':
        return theme.palette.info.dark
      case 'success':
      case 'passed':
        return '#4C88FF20'

      case 'completed-settled':
        return '#e9f0ff'
      default:
        return '#ffffff'
    }
  }

  const getBorderColor = (type: StatusType) => getColor(type)

  return {
    small: {
      backgroundColor: ({ type }: Props) => getBg(type),
      border: ({ type }: Props) => `1px solid ${getBorderColor(type)}`,
      color: ({ type }: Props) => getColor(type),
      borderRadius: '6px',
      marginLeft: 'auto',
      height: '32px',
      padding: '6px 20px'
    },
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
        display: 'block',
        width: 'auto',
        color: ({ type }: Props) => getColor(type),
        opacity: 1
      }
    }
  }
})
