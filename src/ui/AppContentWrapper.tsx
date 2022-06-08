import { Grid, GridProps, Theme } from '@mui/material'
import { styled } from '@mui/styles'

export interface AppContentWrapperProps extends GridProps {
  theme: Theme
  background?: keyof Theme['palette']['backgrounds']
}

export const AppContentWrapper = styled(Grid)(
  ({ theme, background }: AppContentWrapperProps) => ({
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: theme.palette.backgrounds[background ?? 'default'],
    paddingTop: background === undefined ? 80 : 0
  })
)
