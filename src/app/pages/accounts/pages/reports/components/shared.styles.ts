import { makeStyles } from '@material-ui/core/styles'

export interface StyleProps {
  rowIdx?: number
  rowsLength?: number
}

export const useStyles = makeStyles(theme => ({
  headColumn: {
    border: '1px solid #DDDDDD',
    padding: theme.spacing(0.5, 2),
    fontSize: 14,
    fontWeight: 600,
    backgroundColor:
      theme.palette.type === 'light'
        ? '#F7F7F7'
        : theme.palette.backgrounds.light
  },
  cashColumn: {
    padding: ({ rowIdx }: StyleProps) =>
      rowIdx === 2 || rowIdx === 3
        ? theme.spacing(0.5, 2, 0.5, 3)
        : theme.spacing(0.5, 2),
    fontSize: 14
  },
  column: {
    border: '1px solid #DDDDDD',
    padding: theme.spacing(0.5, 2),
    fontSize: 14
  },
  spacedColumn: {
    padding: theme.spacing(0.5, 2, 0.5, 3),
    fontSize: 14
  },
  firstRow: {
    backgroundColor: '#F2F2FF',
    '& > th': {
      fontSize: 14,
      fontWeight: 600
    },
    '& > td': {
      fontSize: 14,
      fontWeight: 600
    }
  },
  row: {
    backgroundColor: ({ rowIdx }: StyleProps) =>
      rowIdx === 0
        ? theme.palette.type === 'light'
          ? '#F2F2FF'
          : theme.palette.backgrounds.alternativeLight
        : theme.palette.type === 'light'
        ? '#F7F7F7'
        : theme.palette.backgrounds.light,
    '& > th': {
      fontSize: ({ rowIdx, rowsLength }: StyleProps) =>
        rowIdx === 0 || (rowIdx !== undefined && rowIdx + 1 === rowsLength)
          ? 14
          : 'initial',
      fontWeight: ({ rowIdx, rowsLength }: StyleProps) =>
        rowIdx === 0 || (rowIdx !== undefined && rowIdx + 1 === rowsLength)
          ? 600
          : 'initial'
    },
    '& > td': {
      fontSize: ({ rowIdx, rowsLength }: StyleProps) =>
        rowIdx === 0 || (rowIdx !== undefined && rowIdx + 1 === rowsLength)
          ? 14
          : 'initial',
      fontWeight: ({ rowIdx, rowsLength }: StyleProps) =>
        rowIdx === 0 || (rowIdx !== undefined && rowIdx + 1 === rowsLength)
          ? 600
          : 'initial'
    }
  },
  lastRow: {
    backgroundColor:
      theme.palette.type === 'light'
        ? '#E7E7E7'
        : theme.palette.backgrounds.alternativeLight,
    '& > th': {
      fontSize: 14,
      fontWeight: 600
    },
    '& > td': {
      fontSize: 14,
      fontWeight: 600
    }
  }
}))
