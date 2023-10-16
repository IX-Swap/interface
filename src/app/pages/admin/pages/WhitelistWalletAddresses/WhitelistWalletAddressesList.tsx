import React from 'react'
import { Grid, Box, Button, Typography } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WhitelistedWalletAddressesTable } from '../../components/WhitelistWalletAddresses/WhitelistedWalletAddressesTable'
import { WhitelistWalletAddressesRoute } from '../../router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useTheme } from '@mui/styles'
import { Add } from '@mui/icons-material'

export const AddToWhitelistButton = ({ large = false }) => (
  <Button
    component={AppRouterLinkComponent}
    to={WhitelistWalletAddressesRoute.create}
    size='medium'
    color='primary'
    variant='contained'
    disableElevation
    sx={{ paddingX: large ? 8 : 4 }}
  >
    <Add sx={{ marginRight: 1 }} />
    <span>Add to Whitelist</span>
  </Button>
)

export const WhitelistWalletAddressesList: React.FC = () => {
  const theme = useTheme()
  return (
    <>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader
            title='Whitelist Wallet Addresses'
            endComponent={<AddToWhitelistButton />}
          />
        </Grid>
        <Grid item>
          <RootContainer>
            <Box
              p={3}
              bgcolor={theme.palette.backgrounds.light}
              sx={{
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant='h5'>
                  Whitelisted Wallet Addresses
                </Typography>
              </Box>
            </Box>
            <WhitelistedWalletAddressesTable />
          </RootContainer>
        </Grid>
      </Grid>
    </>
  )
}
