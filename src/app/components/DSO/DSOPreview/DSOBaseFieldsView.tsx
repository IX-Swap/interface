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
  const { isMiniLaptop } = useAppBreakpoints()
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
        <Grid item xs={12}>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Token Name'
                  value={dso?.tokenName}
                  isNewThemeOn
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Symbol'
                  value={dso?.tokenSymbol}
                  isNewThemeOn
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Corporate'
                  value={dso?.corporate?.companyLegalName}
                  isNewThemeOn
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Network'
                  value={dso?.network?.name}
                  isNewThemeOn
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Capital Structure'
                  value={dso?.capitalStructure}
                  isNewThemeOn
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Decimal'
                  value={dso?.decimalPlaces}
                  isNewThemeOn
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Currency'
                  value={dso?.currency?.symbol}
                  isNewThemeOn
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Launch Date'
                  value={dso?.launchDate}
                  isNewThemeOn
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Completion Date'
                  value={dso?.completionDate}
                  isNewThemeOn
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LabelledValue
                  label='Unique Identifier Code'
                  value={dso?.uniqueIdentifierCode}
                  isNewThemeOn
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
