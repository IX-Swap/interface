import { Container, ContainerProps, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface RootContainerProps extends ContainerProps {
  theme?: Theme
  background?: keyof Theme['palette']['backgrounds']
  padding?: number | string
}

export const RootContainer = styled(Container)<RootContainerProps>(
  ({
    theme,
    background,
    padding = theme?.spacing(2, 0)
  }: RootContainerProps) => ({
    padding,
    backgroundColor: theme?.palette?.backgrounds[background ?? 'default'],
    [theme?.breakpoints.down('md')]: {
      padding: theme?.spacing(2, 2)
    }
  })
)
