import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  type: 'COMPLETED' | 'REJECTED' | 'PENDING'
}

export const useStyles = makeStyles(theme => {
  const getColor = (type: 'COMPLETED' | 'REJECTED' | 'PENDING') => {
    switch (type) {
      case 'COMPLETED':
        return theme.palette.success.main
      case 'REJECTED':
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
