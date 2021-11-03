import React from 'react'
import { Grid, Typography, Box, Hidden } from '@material-ui/core'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOInvestorOverview } from 'app/components/DSO/components/DSOInvestorOverview'
import { DSOInvestButton } from 'app/components/DSO/components/DSOInvestButton'

export interface DSOInvestorViewHeaderProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorViewHeader = (props: DSOInvestorViewHeaderProps) => {
  const { dso } = props
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <Box
      bgcolor='#020071'
      p={{
        xs: 3,
        md: 5
      }}
      borderRadius={{ xs: 6, md: 24 }}
      color='#FFF'
    >
      <Grid
        container
        alignItems={isMiniLaptop ? 'flex-start' : 'center'}
        justify='space-between'
        spacing={isMiniLaptop ? 3 : 6}
      >
        <Grid
          item
          xs={12}
          container
          justify={isMiniLaptop ? 'center' : 'space-between'}
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
                <Typography
                  variant='h2'
                  style={{ fontSize: isMiniLaptop ? 14 : 40 }}
                >
                  {dso.tokenName} ({dso.tokenSymbol})
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant='h6'
                  style={{
                    fontWeight: 400,
                    opacity: 0.7,
                    fontSize: isMiniLaptop ? 14 : undefined
                  }}
                >
                  {dso.corporate.companyLegalName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Hidden mdDown>
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
  )
}
