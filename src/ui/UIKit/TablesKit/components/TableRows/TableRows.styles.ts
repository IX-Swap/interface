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
      borderBottom: `1px solid ${tablePalette.border}`,
      '&:first-of-type': {
        boxShadow: tablePalette.headerShadow,
        transform: `scale(1)`
      },
      '&:last-of-type': {
        borderBottom: 'none',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        '& td': {
          '&:first-of-type': {
            borderBottomLeftRadius: 8
          },
          '&:last-of-type': {
            borderBottomRightRadius: 8
          }
        }
      },
      '& td': {
        borderBottom: 'none',
        backgroundColor: tablePalette.rowBg,
        color: tablePalette.color,
        fontSize: 14,
        whiteSpace: 'nowrap',

        '&:first-of-type': {
          paddingLeft: ({ size }: Props) => (size === 'small' ? 16 : 30)
        }
      }
    }
  }
})
