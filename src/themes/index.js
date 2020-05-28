import { createMuiTheme } from '@material-ui/core';
import defaultTheme from './default';

const overrides = {
  typography: {
    fontFamily: '"Open Sans", "Helvetica Neue", sans-serif !important',
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.64rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.285rem',
    },
    h6: {
      fontSize: '1.142rem',
    },
  },
};

const override = {
  MUIRichTextEditor: {
    root: {
      backgroundColor: '#ebebeb',
      height: '100%',
    },
    container: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
    },
    editor: {
      backgroundColor: '#ebebeb',
      padding: '20px',
      height: '100%',
      overflow: 'auto',
    },
    toolbar: {
      borderBottom: '1px solid gray',
      backgroundColor: '#ebebeb',
    },
    placeHolder: {
      backgroundColor: '#ebebeb',
      paddingLeft: 20,
      width: 'inherit',
      position: 'absolute',
      top: '20px',
    },
  },
};

export default {
  default: createMuiTheme({
    ...defaultTheme,
    ...overrides,
    overrides: override,
  }),
};
