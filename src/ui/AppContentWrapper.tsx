import { Grid, GridProps, Theme } from '@mui/material'
import { styled } from '@mui/styles'

export interface AppContentWrapperProps extends GridProps {
  theme: Theme
  background?: keyof Theme['palette']['backgrounds']
}

export const AppContentWrapper = styled(Grid)(
  ({ theme, background }: AppContentWrapperProps) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.backgrounds[background ?? 'default'],
    paddingTop: background === undefined ? 64 : 0
  })
)
