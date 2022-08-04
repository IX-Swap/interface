import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { LabelledValue } from 'components/LabelledValue'
import { useStyles } from 'app/components/DSO/components/DSOInvestorViewHeader.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface DSOBaseFieldsViewProps {
  dso: DigitalSecurityOffering
}

export const DSOBaseFieldsView = ({ dso }: DSOBaseFieldsViewProps) => {
  const { isMiniLaptop, theme } = useAppBreakpoints()
  const isLightThemeActive = theme.palette.mode === 'light'
  const { container, logoContainer, tokenName, corporateName, boxContainer } =
    useStyles()
  return (
    <Box className={boxContainer}>
      <Grid
        container
        className={container}
        justifyContent='space-between'
        spacing={isMiniLaptop ? 3 : 6}
      >
        <Grid
          item
          xs={12}
          container
          className={logoContainer}
          alignItems='center'
        >
          <Grid
            item
            container
            alignItems='center'
            wrap='nowrap'
            xs={12}
            spacing={isMiniLaptop ? 1 : 3}
          >
            <Grid item>
              <DSOLogo
                dsoId={dso._id}
                size={isMiniLaptop ? 48 : 124}
                variant='circular'
              />
            </Grid>

            <Grid item container>
              <Grid item xs={12}>
                <Typography variant='h2' className={tokenName}>
                  {dso.tokenName} ({dso.tokenSymbol})
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6' className={corporateName}>
                  {dso.corporate.companyLegalName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          flexDirection={'column'}
          xs={12}
          spacing={{ xs: 2, sm: 0 }}
        >
          <Grid item container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Token Name'
                value={dso?.tokenName}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Symbol'
                value={dso?.tokenSymbol}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Corporate'
                value={dso?.corporate?.companyLegalName}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Network'
                value={dso?.network?.name}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Capital Structure'
                value={dso?.capitalStructure}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Decimal'
                value={dso?.decimals}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Currency'
                value={dso?.currency?.symbol}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Launch Date'
                value={dso?.launchDate}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Completion Date'
                value={dso?.completionDate}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={12}>
              <LabelledValue
                label='Unique Identifier Code'
                value={dso?.uniqueIdentifierCode}
                labelColor={!isLightThemeActive ? 'dark' : 'default'}
                isNewThemeOn={isLightThemeActive}
                valueColor='rgb(255,255,255)'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
