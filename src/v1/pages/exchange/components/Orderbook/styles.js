import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  paper: {
    border: '1px solid #e3e3e3',
    paddingBottom: 20
  },
  table: {
    border: '1px solid #e3e3e3'
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#EFEFEF'
    },
    height: 10
  },
  lastTableRow: {
    borderTop: '2px solid gray'
  },
  askButton: {
    width: 130,
    backgroundColor: '#C00808',
    color: 'white',
    '&:hover': {
      backgroundColor: '#C00838'
    }
  },
  bidButton: {
    width: 130,
    backgroundColor: '#166814',
    color: 'white',
    '&:hover': {
      backgroundColor: '#164814'
    }
  },
  textField: {
    height: 10,
    width: 50
  }
}))
