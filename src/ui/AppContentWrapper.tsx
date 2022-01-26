import React from 'react'
import { Grid, GridProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles';

import withTheme from '@mui/styles/withTheme';

export interface AppContentWrapperProps extends GridProps {
  theme: Theme
  background?: keyof Theme['palette']['backgrounds']
}

const _AppContentWrapper = styled(
  ({ background, ...props }: AppContentWrapperProps) => <Grid {...props} />
)({
  minHeight: '100vh',
  backgroundColor: ({ theme, background }: AppContentWrapperProps) =>
    theme.palette.backgrounds[background ?? 'default'],
  // render top padding only when it is a nested AppContentWrapper
  paddingTop: (props: AppContentWrapperProps) =>
    props.background === undefined ? 64 : 0
})

export const AppContentWrapper = withTheme(_AppContentWrapper)
