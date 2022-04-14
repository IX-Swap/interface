import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  enable2Fa: boolean | undefined
}

export const useStyles = makeStyles(theme => ({
  description: {
    color: (props: Props) =>
      props.enable2Fa !== undefined && props.enable2Fa
        ? theme.palette.text.primary
        : theme.palette.error.main
  }
}))
