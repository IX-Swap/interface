import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  checkboxStyled: {
    '&.MuiButtonBase-root': {
      '& .MuiSvgIcon-root': {
        border: `1px solid rgba(76, 136, 255, 0.3)`
      },
      '&:hover': {
        '& .MuiSvgIcon-root': {
          border: `1px solid ${theme.palette.secondary.main}`
        }
      }
    }
  }
}))
