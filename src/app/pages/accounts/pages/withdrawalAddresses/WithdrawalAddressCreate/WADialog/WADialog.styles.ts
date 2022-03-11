import makeStyles from '@mui/styles/makeStyles'

export interface DialogVisibilityProps {
  isCreateWalletDialogVisible?: boolean
}

export default makeStyles(theme => ({
  title: {
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '1.25em',
    textAlign: 'center'
  },
  content: {
    padding: theme.spacing(5, 8),
    marginTop: theme.spacing(5)
  },
  dialog: {
    display: (props: DialogVisibilityProps) =>
      props.isCreateWalletDialogVisible !== undefined &&
      props.isCreateWalletDialogVisible
        ? 'none'
        : 'initial'
  },
  createDialog: {
    display: (props: DialogVisibilityProps) =>
      props.isCreateWalletDialogVisible !== undefined &&
      props.isCreateWalletDialogVisible
        ? 'initial'
        : 'none'
  }
}))
