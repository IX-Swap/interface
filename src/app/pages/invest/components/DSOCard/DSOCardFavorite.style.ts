import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  isFav: boolean
}

export default makeStyles(theme => ({
  iconButton: {
    cursor: 'pointer',
    width: 56,
    height: 36,
    borderRadius: 8
    // backgroundColor: (props: Props) => (props.isFav ? '#FFC900' : 'inherit'),
    // border: (props: Props) =>
    //   `1px solid ${
    //     props.isFav ? theme.palette.warning.main : theme.palette.menu.border
    //   }`,
    // '&:hover': {
    //   backgroundColor: (props: Props) => (props.isFav ? '#FFC900' : 'inherit'),
    //   opacity: 0.7
    // }
  },
  iconButtonActive: {
    backgroundColor: '#FFC900',
    border: `1px solid ${theme.palette.warning.main}`,
    '&:hover': {
      backgroundColor: '#FFC900',
      opacity: 0.7
    }
  },
  iconButtonNormal: {
    backgroundColor: 'inherit',
    border: `1px solid ${theme.palette.menu.border}`,
    '&:hover': {
      backgroundColor: 'inherit',
      opacity: 0.7
    }
  },
  icon: {
    width: 17,
    height: 16
  },
  progress: {
    color: theme.palette.mode === 'light' ? '#DBE2EC' : '#23407A'
  }
}))
