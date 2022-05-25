import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  checkboxStyled: {
    '&.MuiButtonBase-root': {
      '& .MuiSvgIcon-root': {},
      '&:hover': {
        '& .MuiSvgIcon-root': {
          border: `1px solid ${theme.palette.secondary.main}`
        }
      }
    }
  }
}))
