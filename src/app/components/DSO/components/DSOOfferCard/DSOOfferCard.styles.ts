import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'relative',
      minHeight: 200
    },
    introduction: {
      '& p': { margin: 0 }
    },
    capitalStructure: {
      position: 'absolute',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 132,
      height: 40,
      top: 0,
      right: 0,
      fontSize: '18px',
      fontWeight: 500,
      letterSpacing: 0,
      backgroundColor: '#fafafa'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 auto',
      padding: theme.spacing(4)
    },
    logo: {
      border: '1px solid #eee'
    },
    title: {
      fontSize: '20px',
      fontWeight: 700,
      letterSpacing: 0
    },
    cover: {
      maxWidth: 250,
      padding: theme.spacing(3.5),
      backgroundColor: '#fafafa'
    }
  })
)
