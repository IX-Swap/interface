import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icon: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#999',
    '$root.Mui-focusVisible &': {
      outlineWidth: 1,
      outlineOffset: 2,
      outlineStyle: 'auto',
      outlineColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main
    },
    'input:hover ~ &': {
      borderColor: theme.palette.primary.main
    },
    'input:disabled ~ &': {
      cursor: 'not-allowed',
      backgroundColor: 'rgba(225, 225, 225,.5)'
    }
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""'
    },
    'input:hover ~ &': {
      borderColor: theme.palette.secondary.light,
      backgroundColor: theme.palette.secondary.light
    },
    'input:disabled ~ &': {
      cursor: 'not-allowed',
      borderColor: theme.palette.secondary.light,
      backgroundColor: theme.palette.secondary.light
    }
  }
}))
