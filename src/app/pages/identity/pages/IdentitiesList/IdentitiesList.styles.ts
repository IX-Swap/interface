import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    color: theme.palette.breadcrumbs.color
  },
  breadcrumbsLink: {
    color: theme.palette.breadcrumbs.link
  },
  container: {
    padding: theme.spacing(3),
    maxWidth: theme.spacing(162.5),
    backGroundColor: theme.palette.backgrounds.default
  },
  grid: {
    spacing: theme.spacing(4.2),
    paddingTop: theme.spacing(2.7)
  },
  dot: {
    component: 'span',
    borderRadius: theme.spacing(12.5),
    margin: theme.spacing(0, 1.5)
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBot: theme.spacing(10),
    '& p': {
      fontSize: theme.spacing(1.8),
      lineHeight: theme.spacing(3)
    }
  }
}))
