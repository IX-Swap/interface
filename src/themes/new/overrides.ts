import { Theme } from '@material-ui/core'
import { Overrides } from '@material-ui/core/styles/overrides'
import { rte } from 'themes/new/rte'
import { CSSProperties } from 'react'
import {
  monumentExtendedBold,
  monumentGroteskRegular
} from 'themes/new/typography'

interface LabOverrides {
  MuiSkeleton: {
    root: CSSProperties
  }
  MUIRichTextEditor: {
    root: any
    container: any
    editor: any
    toolbar: any
    placeHolder: any
  }
}

export const getThemeOverrides = (
  theme: Theme
): Partial<Overrides> & Partial<LabOverrides> => ({
  ...rte(theme),
  MuiCssBaseline: {
    '@global': {
      '@font-face': [monumentExtendedBold, monumentGroteskRegular]
    }
  }
})
