import React from 'react'
import { Grid, Typography, Box, Hidden } from '@mui/material'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOInvestorOverview } from 'app/components/DSO/components/DSOInvestorOverview'
import { DSOInvestButton } from 'app/components/DSO/components/DSOInvestButton'
import { useStyles } from 'app/components/DSO/components/DSOInvestorViewHeader.styles'

export interface DSOInvestorViewHeaderProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorViewHeader = (props: DSOInvestorViewHeaderProps) => {
  const { dso } = props
  const { isMiniLaptop } = useAppBreakpoints()
  const { container, logoContainer, tokenName, corporateName } = useStyles()

  return (
    <Box
      bgcolor='#020071'
      p={{
        xs: 3,
        md: 5
      }}
      borderRadius="undefinedpx"
      color='#FFF'
    >
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
            xs={isMiniLaptop ? 12 : 9}
            spacing={isMiniLaptop ? 1 : 3}
          >
            <Grid item>
              <DSOLogo
                dsoId={dso._id}
                size={isMiniLaptop ? 48 : 124}
                variant='circle'
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
          <Hidden lgDown>
            <Grid item>
              <DSOInvestButton dso={dso} />
            </Grid>
          </Hidden>
        </Grid>
        <Grid item xs={12}>
          <DSOInvestorOverview dso={dso} />
        </Grid>
      </Grid>
    </Box>
  );
}
