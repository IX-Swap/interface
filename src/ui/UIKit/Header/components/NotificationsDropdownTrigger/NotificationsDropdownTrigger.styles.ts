import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  isOpen: boolean
}

export const useStyles = makeStyles(theme => ({
  wrapper: {
    '&:hover': {
      backgroundColor: 'initial',
      '& svg': {
        '& path': {
          fill:
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.primary.contrastText
        }
      },
      height: 80,
      borderRadius: 0,
      borderBottom: (props: Props) =>
        props.isOpen ? `1px solid ${theme.palette.primary.main}` : 'none'
    }
  }
}))
