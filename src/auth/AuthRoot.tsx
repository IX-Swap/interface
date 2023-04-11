import React from 'react'
import { ReactComponent as AppLogo } from 'assets/icons/new_app_logo.svg'
import { useStyles } from 'auth/pages/AuthRootStyles.styles'
import { AuthRouter } from 'auth/router/AuthRouter'
import { Box, Grid } from '@mui/material'
import { DataroomImage } from 'ui/DataroomImage'
import DotsImage from 'assets/images/background_dots.png'
import { useRawDataroomFile } from 'hooks/useRawFile'
import { useServices } from 'hooks/useServices'

export const AuthRoot: React.FC = () => {
  const {
    container,
    wrapper,
    formContainer,
    background,
    backgroundImage,
    formWrapper,
    logo
  } = useStyles()

  const { sessionService } = useServices()

  const tenantBgImage: string = sessionService.get('backgroundImage') ?? ''
  const tenantLogoDark: string = sessionService.get('logoDark') ?? ''

  const { data = '' }: { data: string } = useRawDataroomFile(
    `dataroom/raw/${tenantBgImage}`
  )

  const bg = data !== '' ? data : DotsImage

  const Logo =
    tenantLogoDark !== '' ? (
      <DataroomImage
        photoId={tenantLogoDark}
        alt='Logo'
        width={112}
        height={18}
        variant={'square'}
      >
        <AppLogo />
      </DataroomImage>
    ) : (
      <AppLogo />
    )

  return (
    <Grid className={container} container>
      <Grid item className={wrapper}>
        <Grid
          className={formWrapper}
          container
          direction={'column'}
          alignItems={'stretch'}
        >
          <Box className={logo}>{Logo}</Box>
          <Grid item className={formContainer} style={{ width: '100%' }}>
            <AuthRouter />
          </Grid>
        </Grid>
      </Grid>
      <Box className={background} style={{ backgroundImage: `url(${bg})` }}>
        <Box className={backgroundImage} />
      </Box>
    </Grid>
  )
}
