import makeStyles from '@mui/styles/makeStyles'

export interface Props {
  size: 'small' | 'medium'
}

export default makeStyles(theme => {
  // eslint-disable-next-line
  const tablePalette = theme.palette.table!

  return {
    wrapper: {
      maxHeight: 80,
      boxSizing: 'border-box',
      height: 80,

      '&:hover': {
        boxShadow: tablePalette.boxShadow
      },

      '& td': {
        borderBottom: 'none',
        backgroundColor: tablePalette.rowBg,
        color: tablePalette.color,
        fontSize: 14,
        whiteSpace: 'nowrap',

        '&:first-of-type': {
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          paddingLeft: ({ size }: Props) => (size === 'small' ? 16 : 30)
        },
        '&:last-of-type': {
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8
        }
      }
    }
  }
})
