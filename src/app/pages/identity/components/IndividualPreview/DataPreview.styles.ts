import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    display: 'flex'
  },
  textName: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    maxWidth: '150px',
    display: 'flex',
    justifyContent: 'center'
  },
  textCorporate: {
    width: '152px',
    height: '16px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '16px',
    letterSpacing: '-0.01em',
    color: '#778194'
  }
})
