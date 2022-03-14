import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  sortIcon: {
    display: 'flex',
    transform: ({ descending }: { descending: boolean }) =>
      `${descending ? 'rotate(180deg)' : ''}`,
    transition: `transform 0.5s`
  }
}))
