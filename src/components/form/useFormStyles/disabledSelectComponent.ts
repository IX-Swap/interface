import makeStyles from '@mui/styles/makeStyles'

export const useDisabledSelectComponent = makeStyles(theme => ({
  root: {
    '& label': {
      color: 'rgb(119, 129, 148)',
      opacity: '0.7'
    },
    '& .svgCheck': {
      position: 'absolute',
      zIndex: '1',
      right: '10px',
      width: '15px',
      height: '15px',
      top: '55%'
    },
    '& .Mui-disabled': {
      '& svg': {
        display: 'none'
      }
    }
  }
}))
