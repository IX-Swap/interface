import { Container, ContainerProps, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface RootContainerProps extends ContainerProps {
  theme?: Theme
  background?: keyof Theme['palette']['backgrounds']
}

export const RootContainer = styled(Container)<RootContainerProps>(
  ({ theme, background }: RootContainerProps) => ({
    padding: theme?.spacing(0),
    backgroundColor: theme?.palette?.backgrounds[background ?? 'default'],
    [theme?.breakpoints.down('sm')]: {
      padding: theme?.spacing(0, 2)
    }
  })
)
