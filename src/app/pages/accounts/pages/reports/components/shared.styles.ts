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
    backgroundColor: '#F7F7F7'
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
      rowIdx === 0 ? '#F2F2FF' : '#F7F7F7',
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
    backgroundColor: '#E7E7E7',
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
