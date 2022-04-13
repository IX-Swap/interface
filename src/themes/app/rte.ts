import { Theme } from '@mui/material'

export const rte = (theme: Theme) => ({
  MUIRichTextEditor: {
    root: {
      backgroundColor: theme.palette.background.default,
      height: '100%',
      minHeight: '40px',
      borderRadius: 4,
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column'
    },
    editor: {
      backgroundColor: theme.palette.background.default,
      padding: '20px',
      height: '100%',
      overflow: 'auto'
    },
    toolbar: {
      borderBottom: '1px solid gray'
    },
    placeHolder: {
      paddingLeft: 20,
      width: '100%',
      height: '100%',
      bottom: '0',
      position: 'static'
    }
  }
})
