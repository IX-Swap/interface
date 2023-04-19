import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    textAlign: 'center',
    padding: [theme.spacing(6), theme.spacing(3)].join(' '),
    marginBottom: theme.spacing(2)
  },
  pending: {
    backgroundColor: '#FFC90039',
    borderColor: '#FFC900',
    '& h5, & p': {
      color: '#D3A701'
    }
  },
  rejected: {
    backgroundColor: '#FF808040',
    borderColor: '#FF8080',
    '& h5, & p': {
      color: '#EE7272'
    }
  },
  approved: {
    backgroundColor: '#4C88FF40',
    borderColor: '#4C88FF',
    '& h5, & p': {
      color: '#286AEE',
      maxWidth: '350px'
    }
  },
  locked: {
    backgroundColor: '#F0F2F7',
    borderColor: '#DBE2EC',
    '& h5, & p': {
      color: '#778194',
      maxWidth: '450px'
    }
  },
  accredited: {
    backgroundColor: '#7DD32040',
    borderColor: '#7DD320',
    '& h5, & p': {
      color: '#6ABC10'
    }
  }
}))
