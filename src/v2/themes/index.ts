import { createMuiTheme, Theme } from '@material-ui/core/styles'
import defaultTheme from 'v2/themes/default'

const overrides = {
  typography: {
    fontFamily: '"Bai Jamjuree", "Helvetica Neue", sans-serif !important',
    fontSize: 12,
    h1: {
      fontSize: '3rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '1.64rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.285rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#999999',
      textTransform: 'uppercase' as const
    }
  }
}

const rte = {
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
      position: 'static'
    }
  }
}

interface Themes {
  [key: string]: Theme
}

const themes: Themes = {
  default: createMuiTheme({
    ...defaultTheme,
    ...overrides,
    overrides: {
      ...defaultTheme.overrides,
      ...rte,
      MuiContainer: {
        root: {
          paddingTop: 40,
          paddingBottom: 40
        }
      }
    }
  })
}

export default themes
