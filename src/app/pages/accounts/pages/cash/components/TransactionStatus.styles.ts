import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  type: 'COMPLETED' | 'Rejected' | 'PENDING'
}

export const useStyles = makeStyles(theme => {
  const getColor = (type: 'COMPLETED' | 'Rejected' | 'PENDING') => {
    switch (type) {
      case 'COMPLETED':
        return theme.palette.success.main
      case 'Rejected':
        return theme.palette.error.dark
      case 'PENDING':
        return theme.palette.warning.main
      default:
        return theme.palette.info.main
    }
  }

  return {
    text: {
      color: ({ type }: Props) => getColor(type)
    }
  }
})
