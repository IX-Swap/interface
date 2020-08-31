import { createMuiTheme } from '@material-ui/core/styles'
import defaultTheme from './default'

const overrides = {
  typography: {
    fontFamily: '"Bai+Jamjuree", "Helvetica Neue", sans-serif !important',
    fontSize: 12,
    h1: {
      fontSize: '3rem'
    },
    h2: {
      fontSize: '2rem'
    },
    h3: {
      fontSize: '1.64rem'
    },
    h4: {
      fontSize: '1.5rem'
    },
    h5: {
      fontSize: '1.285rem'
    },
    h6: {
      fontSize: '1.142rem'
    }
  }
}

const override = {
  MUIRichTextEditor: {
    root: {
      backgroundColor: '#ebebeb',
      height: '100%',
      minHeight: '40px'
    },
    container: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column'
    },
    editor: {
      backgroundColor: '#ebebeb',
      padding: '20px',
      height: '100%',
      overflow: 'auto'
    },
    toolbar: {
      borderBottom: '1px solid gray',
      backgroundColor: '#ebebeb'
    },
    placeHolder: {
      backgroundColor: '#ebebeb',
      paddingLeft: 20,
      width: '100%',
      height: '100%',
      bottom: '0',
      position: 'inherit'
    }
  }
}

export default {
  default: createMuiTheme({
    ...defaultTheme,
    ...overrides,
    overrides: override
  })
}
