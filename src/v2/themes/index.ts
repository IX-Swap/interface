import { createMuiTheme, ThemeOptions, Theme } from '@material-ui/core/styles'
import defaultTheme from 'v2/themes/default'
import { CSSProperties } from '@material-ui/styles'

interface Overrides extends ThemeOptions {
  MUIRichTextEditor: {
    root?: CSSProperties
    container?: CSSProperties
    editor?: CSSProperties
    toolbar?: CSSProperties
    placeHolder?: CSSProperties
    anchorLink?: CSSProperties
  }
}

const overrides: Overrides = {
  typography: {
    fontFamily: '"Bai Jamjuree", "Helvetica Neue", sans-serif !important',
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
      ...rte
    }
  })
}

export default themes
